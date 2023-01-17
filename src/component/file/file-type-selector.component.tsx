import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform, PermissionsAndroid, BackHandler } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage, faCamera, faRecordVinyl, faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { colors } from '../../style/app.style';
import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AudioRecorder } from '../audio/audio-recorder.component';

export interface Props {
    show: boolean,
    onFile: Function,
    close: Function,
    enableAudioRecorder?: boolean
}

interface State {
    showAudioRecorder: boolean,
    enableAudioRecorder: boolean
}


export class FileTypeSelector extends React.Component<Props, State> {

    private pickerOptions: any = {
        maxWidth: 1280,
        maxHeight: 720,
        quality: 0.5,
        includeBase64: true,
        mediaType: 'photo'
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            showAudioRecorder: false,
            enableAudioRecorder: this.props.enableAudioRecorder != undefined ? this.props.enableAudioRecorder : false,
        };

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
                            <Text style={styles.title}>Seleccione la opción</Text>
                        </View>
                        <View style={styles.option}>
                            <TouchableOpacity onPress={this.launchGallery} delayPressIn={0}>
                                <View style={styles.answer}>
                                    <Text style={styles.answerText}>Buscar en galería</Text>
                                    <View style={styles.answerIconContainer}>
                                        <FontAwesomeIcon style={styles.answerIcon} icon={faImage} size={30} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.openCamera} delayPressIn={0}>
                                <View style={styles.answer}>
                                    <Text style={styles.answerText}>Tomar fotografía</Text>
                                    <View style={styles.answerIconContainer}>
                                        <FontAwesomeIcon style={styles.answerIcon} icon={faCamera} size={30} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {
                                this.state.enableAudioRecorder ?
                                    <TouchableOpacity onPress={() => this.setState({ showAudioRecorder: true })} delayPressIn={0}>
                                        <View style={styles.answer}>
                                            <Text style={styles.answerText}>Grabar audio</Text>
                                            <View style={styles.answerIconContainer}>
                                                <FontAwesomeIcon style={styles.answerIcon} icon={faMicrophone} size={30} />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    : <></>

                            }
                            <TouchableOpacity style={styles.close} onPress={() => { this.props.close() }} delayPressIn={0}>
                                <View style={styles.closeButton}>
                                    <Text style={styles.closeText}>Cerrar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <AudioRecorder show={this.state.showAudioRecorder} onFile={this.onAudioFile} close={() => this.setState({ showAudioRecorder: false })} />
            </Modal>
        );
    }

    launchGallery = () => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then(
                response => {
                    if (response == PermissionsAndroid.RESULTS.GRANTED) {
                        launchImageLibrary(this.pickerOptions, (response: any) => {
                            if (response.didCancel != true) {
                                this.props.onFile(response);
                            }
                        });
                    }
                }
            );
        } else {
            launchImageLibrary(this.pickerOptions, (response: any) => {
                if (response.didCancel != true) {
                    this.props.onFile(response);
                }
            });
        }
    }

    openCamera = () => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then(
                response => {
                    console.log(response);
                    if (response == PermissionsAndroid.RESULTS.GRANTED) {
                        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then(
                            response2 => {
                                console.log(response2);
                                if (response2 == PermissionsAndroid.RESULTS.GRANTED) {
                                    launchCamera(this.pickerOptions, (response: any) => {
                                        if (response.didCancel != true) {
                                            this.props.onFile(response);
                                        }
                                    });
                                }
                            }
                        );
                    }
                }
            );
        } else {
            launchCamera(this.pickerOptions, (response: any) => {
                if (response.didCancel != true) {
                    this.props.onFile(response);
                }
            });
        }
    }

    onAudioFile = (response: any) => {
        this.setState({
            showAudioRecorder: false
        });
        this.props.onFile(response);
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