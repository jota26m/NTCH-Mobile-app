import { faEarListen, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackActions } from '@react-navigation/native';
import React from 'react';
import { Modal, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { AudioRecorderButton } from '../../../../../../component/audio-recorder-button/audio-recorder-button.component';
import { NoiseTechButton } from '../../../../../../component/button/button.component';
import { ChronometerInput } from '../../../../../../component/chronometer/db-input/chronometer.component';
import { DbInput } from '../../../../../../component/db-input/db-input.component';
import { ModalSelector, modalStyles } from '../../../../../../component/modal-selector/modal-selector.component';
import { NoiseTechSquareButton } from '../../../../../../component/square-button/square-button.component';
import DataKeeper from '../../../../../../keepers/data.keeper';
import { DrawerNavigationParams } from '../../../../../../navigation/navigation';
import { appStyles } from '../../../../../../style/app.style';
import { styles } from './background-noise-measurement.style';


type BackgroundNoiseMeasurementScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'Projects'
>;

export interface Props {
    navigation: BackgroundNoiseMeasurementScreenNavigationProp,
    route: any
}

interface State {
    project: any,
    showNoiseIdentificacion: boolean,
    showFinish: boolean,
    receivers: any,
    receiver?: any,
    seconds: number,
    canContinue: boolean,
    measurement: any,
    disabled: boolean
    npseq?: string
}

export class BackgroundNoiseMeasurementView extends React.Component<Props, State> {

    chronometer: any;
    recorder: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            project: this.props.route.params.project,
            showNoiseIdentificacion: false,
            showFinish: false,
            receivers: this.props.route.params.project.receivers.map((receiver: any) => { return {id: receiver.id, text: receiver.name}}),
            seconds: 0,
            canContinue: true,
            measurement: {
                type: 'background'
            },
            disabled: false
        };
    }

    componentDidMount() {
    }

    //

    render() {
        return (
            <View style={{ ...appStyles.container, ...styles.contentContainer }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Medición de ruido de fondo</Text>
                </View>
                <ScrollView style={styles.container}>
                    <ModalSelector text={'Seleccione el receptor'} acceptText={'Aceptar'} onAccept={this.onReceiverSelected} title={'Seleccione el receptor'} options={this.state.receivers} disabled={this.state.seconds > 0}></ModalSelector>
                    <View style={styles.measurementButtonsContainer}>
                        <AudioRecorderButton onFile={this.onFile} ref={ref => this.recorder = ref}></AudioRecorderButton>
                        <ChronometerInput ref={ref => this.chronometer = ref} style={{ ...styles.measurementButton, ...{ paddingRight: 5 } }} onFinish={() => { }} onUpdate={this.onChronometerUpdate} disabled={this.state.disabled || this.state.measurement.receiver == undefined}></ChronometerInput>
                        <NoiseTechSquareButton style={styles.measurementButton} text={"description"} icon={faEarListen} onPress={() => { this.setState({ showNoiseIdentificacion: true }) }}></NoiseTechSquareButton>
                    </View>
                    <DbInput value={this.state.measurement.npseq5} disabled={this.state.seconds < 5} leftText="NPSeq 5'" rightText='dB(A)' id='npseq5' onChange={this.onChange}></DbInput>
                    <DbInput value={this.state.measurement.npseq10} disabled={this.state.seconds < 10} leftText="NPSeq 10'" rightText='dB(A)' id='npseq10' onChange={(value: any) => this.onNPChange(value, 'npseq5')} onEndEditing={() => this.onEndEditing('npseq10', 'npseq5')}></DbInput>
                    <DbInput value={this.state.measurement.npseq15} disabled={this.state.seconds < 15} leftText="NPSeq 15'" rightText='dB(A)' id='npseq15' onChange={(value: any) => this.onNPChange(value, 'npseq10')} onEndEditing={() => this.onEndEditing('npseq15', 'npseq10')}></DbInput>
                    <DbInput value={this.state.measurement.npseq20} disabled={this.state.seconds < 1200} leftText="NPSeq 20'" rightText='dB(A)' id='npseq20' onChange={(value: any) => this.onNPChange(value, 'npseq15')} onEndEditing={() => this.onEndEditing('npseq20', 'npseq15')}></DbInput>
                    <DbInput value={this.state.measurement.npseq25} disabled={this.state.seconds < 1500} leftText="NPSeq 25'" rightText='dB(A)' id='npseq25' onChange={(value: any) => this.onNPChange(value, 'npseq20')} onEndEditing={() => this.onEndEditing('npseq25', 'npseq20')}></DbInput>
                    <DbInput value={this.state.measurement.npseq30} disabled={this.state.seconds < 1800} leftText="NPSeq 30'" rightText='dB(A)' id='npseq30' onChange={(value: any) => this.onNPChange(value, 'npseq25')} onEndEditing={() => this.onEndEditing('npseq30', 'npseq25')}></DbInput>
                </ScrollView>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showNoiseIdentificacion}
                    onRequestClose={() => {

                    }}
                >
                    <View style={modalStyles.container}>
                        <View style={modalStyles.realContainer}>
                            <View style={modalStyles.titleContainer}>
                                <Text style={modalStyles.titleText}>{'Identificación de ruido de fondo'}</Text>
                            </View>
                            <ScrollView style={modalStyles.termsTextContainer}>
                                <TextInput defaultValue={this.state.measurement.description ? this.state.measurement.description : ''} style={styles.noiseSourceTextInput} multiline={true} placeholder={'Mencione las principales fuentes de ruido presentes durante la medición'} onChangeText={this.onDescriptionDefined}></TextInput>
                            </ScrollView>
                            <View style={modalStyles.buttonContainer}>
                                <NoiseTechButton text={'Aceptar'} onPress={() => { this.setState({ showNoiseIdentificacion: false }) }} />
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showFinish}
                    onRequestClose={() => {

                    }}
                >
                    <View style={modalStyles.container}>
                        <View style={modalStyles.realContainer}>
                            <View style={modalStyles.titleContainer}>
                                <Text style={modalStyles.titleText}>{'Tu medición de ruido de fondo ya está estabilizada'}</Text>
                            </View>
                            <ScrollView style={modalStyles.termsTextContainer}>
                                <View style={styles.resultGroup}>
                                    <View style={styles.resultGroupTop}>
                                        <Text style={styles.resultGroupReceptor}>{ (this.state.measurement != undefined && this.state.measurement.receiver != undefined) ? this.state.measurement.receiver.name : 'Receptor'}</Text>
                                    </View>
                                    <View style={styles.resultGroupBottom}>
                                        <Text style={styles.resultGroupValue}>Ruido de fondo: {this.state.npseq} dB(A)</Text>
                                    </View>
                                </View>
                                <DbInput leftText='NPSMin' rightText='dB(A)' id='npsmin' onChange={this.onChange}></DbInput>
                                <DbInput leftText='NPSMax' rightText='dB(A)' id='npsmax' onChange={this.onChange}></DbInput>
                                
                                {
                                    this.state.canContinue ? 
                                    <NoiseTechButton text={'Seguir midiendo'} onPress={this.continue} />
                                    : 
                                    <></>
                                }
                            </ScrollView>
                            <View style={modalStyles.buttonContainer}>
                            <NoiseTechButton text={'Guardar'} onPress={this.finish} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    finish = () => {
        this.recorder.stopRecording();
        this.chronometer.stop();
        let measurement = this.state.measurement;
        measurement.finished = new Date();
        this.setState({ showFinish: false, measurement })
        this.props.navigation.dispatch(StackActions.replace('MeasurementEnvironment', {measurement: this.state.measurement, project: this.state.project, callback: this.props.route.params.callback}));
    }

    continue = () => {
        this.setState({ showFinish: false })
    }

    
    onChronometerUpdate = (data: any) => {
        let measurement = this.state.measurement;
        if (data.seconds <= 1 || measurement.started == undefined) {
            measurement.started = new Date();
        }
        this.setState({seconds: data.seconds, measurement});
    }

    onNPChange = (value: any, prev: string) => {
        this.onChange(value);
    }

    onEndEditing = (current: string, prev: string) => {

        let measurement: any = this.state.measurement;
        if (Math.abs(measurement[current] - measurement[prev]) < 2) {
            this.setState({
                showFinish: true,
                canContinue: prev != 'npseq30',
                npseq: measurement[current]
            });
        }
    }

    onChange = (value: any) => {
        let measurement: any = this.state.measurement;
        measurement[value.id] = value.val;
        this.setState({measurement});
    }

    onFile = (file: any) => {
        file = file.assets[0];
        let measurement = this.state.measurement;
        let key = 'l_' + (new Date().getTime());
        DataKeeper.addData('images', key, 'data:' + file.type + ";base64," + file.base64);
        measurement['audio'] = key;
        this.setState({
            measurement
        });
    }

    onReceiverSelected = (value: any) => {
        let measurement = this.state.project.measurements.find((m: any) => m.type == 'background' && m.receiver.id == value.id);
        let disabled = true;
        if (measurement == undefined) {
            measurement = {
                type: 'background',
                receiver: this.state.project.receivers.find((receiver: any) => receiver.id == value.id)
            };
            disabled = false;
        }
        this.setState({measurement, disabled});
    }

    onDescriptionDefined = (value: any) => {
        let measurement: any = this.state.measurement;
        measurement['description'] = value;
        this.setState({measurement});
    }


}