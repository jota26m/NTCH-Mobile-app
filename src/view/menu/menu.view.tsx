import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, ImageBackground, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { NoiseTechButton } from '../../component/button/button.component';
import SessionKeeper from '../../keepers/session.keeper';
import { DrawerNavigationParams } from '../../navigation/navigation';
import { appStyles, colors } from '../../style/app.style';


type MenuScreenNavigationProp = StackNavigationProp<
    DrawerNavigationParams,
    'Menu'
>;

export interface Props {
    navigation: MenuScreenNavigationProp
}

interface State {
    isLogged: boolean,
    user: any,
    placesWithT?: any
}

const image = require('./../../assets/images/background.png');
const logo = require('./../../assets/images/logo.png');

export class MenuView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.modal}>
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Menu</Text>
                        </View>
                        <View style={styles.option}>
                            <TouchableOpacity onPress={this.logout} delayPressIn={0}>
                                <View style={styles.answer}>
                                    <Text style={styles.answerText}>Salir</Text>
                                    <View style={styles.answerIconContainer}>
                                        <FontAwesomeIcon style={styles.answerIcon} icon={faSignOut} size={30} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.close} onPress={() => { this.props.navigation.goBack() }} delayPressIn={0}>
                                <View style={styles.closeButton}>
                                    <Text style={styles.closeText}>Cerrar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        );
    }

    logout = () => {
        if (SessionKeeper.isLoggined()) {
            SessionKeeper.clearAll();
        }
        this.props.navigation.navigate('Home');
    }


}



const styles = StyleSheet.create({
    modal: {
        flex: 10,
        flexDirection: 'column',
        backgroundColor: '#00000055',
        justifyContent: 'flex-end'
    },
    container: {
        height: 300,
        padding: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: '#ffffff',
    },
    titleContainer: {
        marginBottom: 10
    },
    title: {
        textAlign: 'center',
        fontSize: 17
    },
    option: {
    },
    answer: {
        flexDirection: 'row',
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        justifyContent: 'center'
    },
    answerText: {
        flex: 6,
        textAlign: 'justify'
    },
    answerIconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    answerIcon: {
        alignSelf: 'flex-end'
    },
    close: {
        marginTop: 15
    },
    closeButton: {
        flexDirection: 'row',
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.secondary,
        borderRadius: 5,
        justifyContent: 'center'
    },
    closeText: {
        flex: 6,
        textAlign: 'center',
        color: 'white'
    },
});