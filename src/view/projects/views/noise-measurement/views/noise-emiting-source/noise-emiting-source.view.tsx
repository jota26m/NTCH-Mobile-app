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
import { LineInput } from '../../../../../../component/line-input/line-input.component';
import { ModalSelector, modalStyles } from '../../../../../../component/modal-selector/modal-selector.component';
import { NoiseTechSquareButton } from '../../../../../../component/square-button/square-button.component';
import DataKeeper from '../../../../../../keepers/data.keeper';
import { DrawerNavigationParams } from '../../../../../../navigation/navigation';
import { appStyles } from '../../../../../../style/app.style';
import { styles } from './noise-emiting-source.style';


type NoiseEmittingSourceScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'Projects'
>;

export interface Props {
    navigation: NoiseEmittingSourceScreenNavigationProp,
    route: any
}

interface State {
    project: any,
    showNoiseIdentificacion: boolean,
    measurement: any,
    receivers: any,
    receiver?: any,
    seconds: number,
    pointNumber: number,
    measurementNumber: number,
    measurementPoint: any,
    started?: Date,
    disableReceiverSelector: boolean,
    point: any,
    disabled: boolean
    npseq?: string
}

export class NoiseEmittingSourceView extends React.Component<Props, State> {

    chronometer: any;
    recorder: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            project: this.props.route.params.project,
            showNoiseIdentificacion: false,
            receiver: this.props.route.params.measurement ? this.props.route.params.project.receivers.find((receiver: any) => receiver.id == this.props.route.params.measurement.receiver.id) : {},
            receivers: this.props.route.params.project.receivers.map((receiver: any) => { return {id: receiver.id, text: receiver.name}}),
            measurement: this.props.route.params.measurement ? this.props.route.params.measurement : {
                started: new Date(),
                type: this.props.route.params.type,
                points: []
            },
            measurementPoint: {},
            seconds: 0,
            pointNumber: this.props.route.params.pointNumber ? this.props.route.params.pointNumber : 1,
            measurementNumber: 1,
            disableReceiverSelector: false,
            point: {},
            disabled: false
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ ...appStyles.container, ...styles.contentContainer }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Medición de ruido con fuente emisora</Text>
                </View>
                <ScrollView style={styles.container}>
                    <ModalSelector text={'Seleccione el receptor'} acceptText={'Aceptar'} onAccept={this.onReceiverSelected} title={'Seleccione el receptor'} options={this.state.receivers} selectedValue={this.state.receiver ? this.state.receiver.id : null} disabled={this.state.disableReceiverSelector}></ModalSelector>
                    <View style={styles.pointInfoContainer}>
                        <View style={{...styles.point, ...{marginRight: 10}}}>
                            <Text  style={styles.pointText}>Punto</Text>
                            <Text  style={styles.pointValue}>{ this.state.pointNumber }</Text>
                        </View>
                        <View  style={styles.point}>
                            <Text  style={styles.pointText}>Medición</Text>
                            <Text  style={styles.pointValue}>{ this.state.measurementNumber }</Text>
                        </View>
                    </View>
                    <View style={styles.measurementButtonsContainer}>
                        <AudioRecorderButton onFile={this.onFile} ref={ref => this.recorder = ref} ></AudioRecorderButton>
                        <ChronometerInput ref={ref => this.chronometer = ref} style={{ ...styles.measurementButton, ...{ paddingRight: 5 } }} onFinish={() => { }} onUpdate={this.onChronometerUpdate} disabled={this.state.disabled || this.state.measurement.receiver == undefined}></ChronometerInput>
                        <NoiseTechSquareButton style={styles.measurementButton} text={"grabar"} icon={faEarListen} onPress={() => { this.setState({ showNoiseIdentificacion: true }) }}></NoiseTechSquareButton>
                    </View>
                    <DbInput value={this.state.measurementPoint.npseq1} disabled={this.state.seconds < 1} leftText="NPSeq 1'" rightText='dB(A)'  id='npseq1' onChange={this.onChange}></DbInput>
                    <DbInput value={this.state.measurementPoint.npseqmin} disabled={this.state.seconds < 1} leftText="NPSeqmin 1'" rightText='dB(A)'  id='npseqmin' onChange={this.onChange}></DbInput>
                    <DbInput value={this.state.measurementPoint.npseqmax} disabled={this.state.seconds < 1} leftText="NPSeqmax 1'" rightText='dB(A)'  id='npseqmax' onChange={this.onChange}></DbInput>
                    <LineInput value={this.state.measurementPoint.memory} placeHolder='Memoria' id='memory' onTextChange={this.onChange}></LineInput>
                    <NoiseTechButton text='Guardar y continuar' onPress={this.continue}></NoiseTechButton>
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

            </View>
        );
    }


    finish = () => {
        this.props.navigation.dispatch(StackActions.replace('MeasurementEnvironment'));
    }

    onChronometerUpdate = (data: any) => {
        if (this.state.seconds == 0) {
            this.setState({
                started: new Date(),
                disableReceiverSelector: true
            });
        }
        this.setState({seconds: data.seconds});
    }

    onChange = (value: any) => {
        let measurementPoint: any = this.state.measurementPoint;
        measurementPoint[value.id] = value.val;
        this.setState({measurementPoint});
    }

    onReceiverSelected = (value: any) => {
        let measurement = this.state.project.measurements.find((m: any) => m.type == this.props.route.params.type && m.receiver.id == value.id);
        let disabled = true;
        let point = undefined;
        let measurementPoint = undefined;
        if (measurement == undefined) {
            measurement = {
                type: this.props.route.params.type,
                receiver: this.state.project.receivers.find((receiver: any) => receiver.id == value.id),
                started: new Date(),
                points: []
            };
            disabled = false;
        } else {
            point = measurement.points.find((p: any) => p.number == this.state.pointNumber);
            measurementPoint = point.measurements.find((p: any) => p.measurementNumber == this.state.measurementNumber);
        }
        this.setState({
            measurement,
            disabled,
            point: point != undefined ? point : {},
            measurementPoint: measurementPoint != undefined ? measurementPoint : {}
        });
    }

    onDescriptionDefined = (value: any) => {
        let measurement: any = this.state.measurement;
        measurement['description'] = value;
        this.setState({measurement});
    }

    continue = () => {
        let point = this.state.point;
        if (!this.state.disabled) {
            if (point.started == undefined) {
                point.started = this.state.started;
                point.measurements = [];
                point.number = this.state.pointNumber;
            }
            point.measurements.push({
                ...this.state.measurementPoint,
                ...{
                    measurementNumber: this.state.measurementNumber,
                    seconds: this.state.seconds
                }
            });
        }
        
        let currentMeasurement = this.state.measurementNumber;
        if (currentMeasurement == 3) {
            point.finished = new Date();
        }
        this.setState({
            point,
            measurementNumber: this.state.measurementNumber + (this.state.measurementNumber == 3 ? 0 : 1),
            seconds: 0
        }, () => {
            if (currentMeasurement == 3) {
                this.chronometer.stop();
                if (this.state.measurement.type == 'outside' || (this.state.measurement.type == 'inside' && this.state.pointNumber == 3)) {
                    this.props.navigation.dispatch(StackActions.replace('MeasurementEnvironment', {project: this.state.project, measurement: this.state.measurement, point: this.state.point, callback: this.props.route.params.callback}));
                } else {
                    this.props.navigation.navigate('MeasurementEnvironment', {project: this.state.project, measurement: this.state.measurement, point: this.state.point, callback: this.nextPoint, continue: true});
                }
            }
        });
    }

    nextPoint = (measurement: any) => {
        this.chronometer.stop();
        this.recorder.stopRecording();
        let measurementPoint = this.state.point.measurements.find((p: any) => p.measurementNumber == this.state.measurementNumber);
        measurementPoint =  {};
        measurementPoint.measurementNumber = 1;
        this.setState({
            measurement,
            measurementNumber: 1,
            pointNumber: this.state.pointNumber + 1,
            measurementPoint,
            point: {}
        });
    }

    onFile = (file: any) => {
        file = file.assets[0];
        let point = this.state.point;
        let key = 'l_' + (new Date().getTime());
        DataKeeper.addData('images', key, 'data:' + file.type + ";base64," + file.base64);
        point['audio'] = key;
        this.setState({
            point
        });
    }


}