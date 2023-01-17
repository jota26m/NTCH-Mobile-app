import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform, PermissionsAndroid, BackHandler, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDotCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons'
import { colors } from '../../style/app.style';
import AudioRecorderPlayer, { AudioSet, AVEncoderAudioQualityIOSType } from 'react-native-audio-recorder-player';
import { readFile } from "react-native-fs";

export interface Props {
    show: boolean,
    onFile: Function,
    close: Function
}

interface State {
    isRecording: boolean,
    recordingTime: number,
    recordingText: string,
    recorded: boolean,
    fileUri: string,
    converting: boolean
}


export class AudioRecorder extends React.Component<Props, State> {

    audioRecorderPlayer = new AudioRecorderPlayer();

    constructor(props: Props) {
        super(props);
        this.state = {
            isRecording: false,
            recordingTime: 0,
            recordingText: '00:00',
            recorded: false,
            fileUri: '',
            converting: false
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
                            <Text style={styles.title}>Grabar audio</Text>
                        </View>
                        <View style={styles.option}>
                            { !this.state.converting ?
                            <>
                            <View style={styles.recorderContainer}>
                                <View style={styles.startRecordButtonContainer}>
                                    {!this.state.isRecording ?
                                        <TouchableOpacity style={styles.close} onPress={this.startRecording} delayPressIn={0}>
                                            <FontAwesomeIcon style={styles.startRecordButton} icon={faDotCircle} size={100} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={styles.close} onPress={this.stopRecording} delayPressIn={0}>
                                            <FontAwesomeIcon style={styles.startRecordButton} icon={faStopCircle} size={100} />
                                        </TouchableOpacity>
                                    }
                                </View>
                                <View style={styles.recordTime}>
                                    {this.state.isRecording ?
                                        <Text>{this.state.recordingText}</Text>
                                        : <></>
                                    }
                                </View>
                            </View>
                            { !this.state.recorded ? 
                                <TouchableOpacity style={styles.close} onPress={() => { this.props.close() }} delayPressIn={0} disabled={this.state.isRecording}>
                                    <View style={styles.closeButton}>
                                        <Text style={styles.closeText}>Cerrar</Text>
                                    </View>
                                </TouchableOpacity>
                            : 
                                <TouchableOpacity style={styles.close} onPress={this.processAudio} delayPressIn={0} disabled={this.state.isRecording}>
                                    <View style={styles.closeButton}>
                                        <Text style={styles.closeText}>Detener</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            </>
                            : 
                            <View style={styles.recorderContainer}>
                                <ActivityIndicator size={90} color={colors.primary} />
                            <Text style={styles.resultText}>Procesando</Text>
                            </ View>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    startRecording = () => {
        this.setState({ isRecording: true });
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO).then(
                response => {
                    if (response == PermissionsAndroid.RESULTS.GRANTED) {
                        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then(
                            response2 => {
                                if (response2 == PermissionsAndroid.RESULTS.GRANTED) {
                                    this.startRecordingReal();
                                }
                            }
                        );
                    }
                }
            );
        } else {
            this.startRecordingReal();
        }
    }

    audioSet: AudioSet = {
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AudioSamplingRateAndroid: 192000
      };

    startRecordingReal = () => {
        this.audioRecorderPlayer.startRecorder(undefined, this.audioSet).then(response => {
            this.audioRecorderPlayer.addRecordBackListener((e: any) => {
                this.setState({
                    recordingTime: e.current_position,
                    recordingText: this.audioRecorderPlayer.mmssss(
                        Math.floor(e.current_position),
                    ).substring(0, 5),
                });
            });
        });
    }

    stopRecording = () => {
        this.setState({
            isRecording: false,
            recorded: true
        });
        this.audioRecorderPlayer.stopRecorder().then(file => {
            this.audioRecorderPlayer.removeRecordBackListener();
            this.setState({fileUri: file});
        });
    }

    processAudio = () => {
        this.setState({converting: true})
        readFile(this.state.fileUri, "base64").then(encoded => {
            this.props.onFile({
                fileName: 'recorded.wav',
                type: 'audio/wav',
                uri: this.state.fileUri,
                base64: encoded,
            });
        });
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
        backgroundColor: '#ffff00',
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
    recorderContainer: {
        height: 180,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
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
    startRecordButtonContainer: {
        flex: 6,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    startRecordButton: {
        color: '#860000'
    },
    recordTime: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    resultText: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center'
    }
});