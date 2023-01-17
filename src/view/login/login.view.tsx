import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { View, Text, ImageBackground, Image, Alert, Keyboard } from 'react-native';
import { NoiseTechButton } from '../../component/button/button.component';
import { LineInput } from '../../component/line-input/line-input.component';
import SessionKeeper from '../../keepers/session.keeper';
import { DrawerNavigationParams } from '../../navigation/navigation';
import AuthService from '../../services/auth.service';
import SyncService from '../../services/sync.service';
import { appStyles } from '../../style/app.style';
import { styles } from './login.style';


type LoginScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'Login'
>;

export interface Props {
    navigation: LoginScreenNavigationProp
}

interface State {
    username: string,
    password: string,
    alert: string,
    loading: boolean
}

export class LoginView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            alert: '',
            loading: false
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={appStyles.container}>
                <NoiseTechButton text='Acceder como invitado' onPress={() => { this.props.navigation.navigate('Projects'); }}></NoiseTechButton>
                <LineInput placeHolder='Nombre de usuario' onTextChange={(value: any) => this.setState({ username: value.val })} ></LineInput>
                <LineInput placeHolder='Contraseña' isPassword={true} onTextChange={(value: any) => this.setState({ password: value.val })} ></LineInput>
                <NoiseTechButton text='Iniciar Sesión' onPress={this.login}></NoiseTechButton>
            </View>
        );
    }

    login = () => {
        Keyboard.dismiss();
        this.setState({
            loading: true,
            alert: ''
        });
        if (this.state.password == '' || this.state.username == '') {
            this.setState({
                loading: false
            });
            Alert.alert('error', 'El correo y la contraseña deben suministrarse');
        } else {
            AuthService.login(this.state.username, this.state.password).then(
                (response: any) => {
                    SessionKeeper.setToken(response.data.data.token);
                    SessionKeeper.setUser(response.data.data.user);
                    SyncService.getAccountData();
                    this.goToRegister();
                },
                error => {
                    console.log(error);
                    Alert.alert('error', 'Nombre de usuario o contraseña son incorrectos');
                }
            );
        }
    }

    goToRegister = () => {
        this.props.navigation.navigate('Clients');
    }

    goToRecovery = () => {
        //this.props.navigation.navigate('Recovery');
    }


}