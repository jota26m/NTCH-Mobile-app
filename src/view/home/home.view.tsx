import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { View, Text, ImageBackground, Image, Alert } from 'react-native';
import { NoiseTechButton } from '../../component/button/button.component';
import SessionKeeper from '../../keepers/session.keeper';
import { DrawerNavigationParams } from '../../navigation/navigation';
import { appStyles } from '../../style/app.style';
import { styles } from './home.style';


type HomeScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'Home'
>;

export interface Props {
    navigation: HomeScreenNavigationProp
}

interface State {
    isLogged: boolean,
    user: any,
    placesWithT?: any
}

const image = require('./../../assets/images/background.png');
const logo = require('./../../assets/images/logo.png');

export class HomeView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={appStyles.container}>
                <Text style={styles.greeting}>Te damos la bienvenida!</Text>
                <NoiseTechButton text='Ingresar' onPress={this.enter}></NoiseTechButton>
                <View style={styles.subscribe}>
                    <Text style={styles.subscribeText}>Al suscribirte podrás:</Text>
                    <Text style={styles.subscribeText}>Recibir automáticamente las fichas de información, georeferenciación, medición y evaluaciones de nivel de ruido</Text>
                    <Text style={styles.subscribeText}>Sincronizar tu instrumental</Text>
                    <Text style={styles.subscribeText}>Descarga tabulada de los registros de tu evaluación en base al D.S N°38/11 del MMA</Text>
                    <View style={styles.subscribeButtonContainer}>
                        <NoiseTechButton style={styles.subscribeButton} text='Suscríbete' onPress={() => {  }}></NoiseTechButton>
                    </View>
                </View>
            </View>
        );
    }

    enter = () => {
        if (SessionKeeper.isLoggined()) {
            this.props.navigation.navigate('Clients');
        } else {
            this.props.navigation.navigate('Login');
        }
    }


}