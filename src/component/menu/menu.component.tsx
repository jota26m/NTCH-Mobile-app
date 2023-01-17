import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform, PermissionsAndroid, BackHandler } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage, faCamera, faRecordVinyl, faMicrophone, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { colors } from '../../style/app.style';
import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AudioRecorder } from '../audio/audio-recorder.component';

export interface Props {
    navigation: any,
    show: boolean,
    close: Function
}

interface State {
}


export class Menu extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        BackHandler.addEventListener("hardwareBackPress", () => {
            return this.props.show ? false : true;
        });

    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.show}
                onRequestClose={() => {

                }}
            >
                <View style={styles.modal}>
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Menu</Text>
                        </View>
                        <View style={styles.option}>
                            <TouchableOpacity onPress={this.props.navigation.navigate('Home')} delayPressIn={0}>
                                <View style={styles.answer}>
                                    <Text style={styles.answerText}>Salir</Text>
                                    <View style={styles.answerIconContainer}>
                                        <FontAwesomeIcon style={styles.answerIcon} icon={faSignOut} size={30} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.close} onPress={() => { this.props.close() }} delayPressIn={0}>
                                <View style={styles.closeButton}>
                                    <Text style={styles.closeText}>Cerrar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
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