import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Modal, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NoiseTechButton } from '../../../../component/button/button.component';
import { DbInput } from '../../../../component/db-input/db-input.component';
import { FileTypeSelector } from '../../../../component/file/file-type-selector.component';
import { LineInput } from '../../../../component/line-input/line-input.component';
import { ModalSelector, modalStyles } from '../../../../component/modal-selector/modal-selector.component';
import { NoiseTechRoundButton } from '../../../../component/round-button/round-button.component';
import DataKeeper from '../../../../keepers/data.keeper';
import ProjectsKeeper from '../../../../keepers/projects.keeper';
import { DrawerNavigationParams } from '../../../../navigation/navigation';
import LocalDataService from '../../../../services/local-data.service';
import { appStyles } from '../../../../style/app.style';
import { styles } from './noise-measurement.style';


type ProjectsScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'Projects'
>;

export interface Props {
    navigation: ProjectsScreenNavigationProp,
    route: any
}

interface State {
    project: any,
    showSelector: boolean,
    sonometers: any,
    calibrators: any,
    sonometer: any,
    calibrator: any,
    startCalibration: number
    finalCalibration: number,
    showPicker: boolean,
    openedPicker?: string
}

export class NoiseMeasurementView extends React.Component<Props, State> {


    constructor(props: Props) {
        super(props);

        let sonometers: any = [];
        LocalDataService.getSonometersByClient(ProjectsKeeper.clientId).map((sonometer: any) => {
            sonometers.push({ id: sonometer.id, text: sonometer.alias })
        });
        if (sonometers.length == 0) {
            sonometers.push({ id: -1, text: 'Sonómetro gratuito' })
        }

        let calibrators: any = [];
        LocalDataService.getCalibratorsByClient(ProjectsKeeper.clientId).map((calibrator: any) => {
            calibrators.push({ id: calibrator.id, text: calibrator.alias })
        });
        if (calibrators.length == 0) {
            calibrators.push({ id: -1, text: 'Calibrador gratuito' })
        }

        let sonometer = this.props.route.params.project.general && this.props.route.params.project.general.sonometer ? sonometers.find((son: any) => son.id == this.props.route.params.project.general.sonometer.id) : null;
        let calibrator = this.props.route.params.project.general && this.props.route.params.project.general.calibrator ? calibrators.find((cal: any) => cal.id == this.props.route.params.project.general.calibrator.id) : null;
        this.state = {
            showSelector: false,
            showPicker: false,
            project: this.props.route.params.project,
            sonometers,
            calibrators,
            sonometer,
            calibrator,
            startCalibration: this.props.route.params.project.general ? this.props.route.params.project.general.startCalibration : null,
            finalCalibration: this.props.route.params.project.general ? this.props.route.params.project.general.finalCalibration : null,
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ ...appStyles.container, ...styles.contentContainer }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Realizar medición de ruido</Text>
                </View>
                <ScrollView style={styles.container}>
                    <NoiseTechButton text='Ruido de fondo' onPress={() => { this.props.navigation.navigate('BackgroundNoiseMeasurement', {project: this.state.project, callback: this.props.route.params.callback}) }}></NoiseTechButton>
                    <NoiseTechButton text='Ruido de fuente emisora' onPress={() => { this.setState({ showSelector: true }) }}></NoiseTechButton>
                    <ModalSelector text={'Seleccione el sonómetro'} id='sonometer' selectedValue={this.state.sonometer ? this.state.sonometer.id : null} acceptText={'Aceptar'} onAccept={(value: any) => {this.setSonometer(value.id)}} title={'Seleccione el sonómetro'} options={this.state.sonometers} showImagePicker={true} onImagePickerPressed={this.onImagePickerPressed}></ModalSelector>
                    <ModalSelector text={'Seleccione el calibrador'} id='calibrator' selectedValue={this.state.calibrator ? this.state.calibrator.id : null} acceptText={'Aceptar'} onAccept={(value: any) => {this.setCalibrator(value.id)}} title={'Seleccione el calibrador'} options={this.state.calibrators} showImagePicker={true} onImagePickerPressed={this.onImagePickerPressed}></ModalSelector>
                    <DbInput title='Verificación de calibración inicial' id='startCalibration' value={this.state.startCalibration ? String(this.state.startCalibration) : ''} leftText='Calibración' rightText='dB(A)' placeHolder='' onChange={(value: any) => this.setState({startCalibration: value.val})} showImagePicker={true} onImagePickerPressed={this.onImagePickerPressed}></DbInput>
                    <DbInput title='Verificación de calibración final' id='finalCalibration' value={this.state.finalCalibration ? String(this.state.finalCalibration) : ''} leftText='Calibración' rightText='dB(A)' placeHolder='' onChange={(value: any) => this.setState({finalCalibration: value.val})} showImagePicker={true} onImagePickerPressed={this.onImagePickerPressed}></DbInput>
                    <NoiseTechButton text='Guardar' onPress={this.save}></NoiseTechButton>
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showSelector}
                    onRequestClose={() => {

                    }}
                >
                    <View style={modalStyles.container}>
                        <View style={modalStyles.realContainer}>
                            <View style={modalStyles.titleContainer}>
                                <Text style={modalStyles.titleText}>{'Lugar de medición de ruido con fuente sonora'}</Text>
                            </View>
                            <View style={modalStyles.termsTextContainer}>
                                <NoiseTechButton text='Medición Interna' onPress={() => { this.setState({ showSelector: false }); this.props.navigation.navigate('NoiseEmittingSource', { project: this.state.project, type: 'inside', callback: this.props.route.params.callback }) }}></NoiseTechButton>
                                <NoiseTechButton text='Medición Externa' onPress={() => { this.setState({ showSelector: false }); this.props.navigation.navigate('NoiseEmittingSource', { project: this.state.project, type: 'outside', callback: this.props.route.params.callback }) }}></NoiseTechButton>
                            </View>
                        </View>
                    </View>
                </Modal>
                <FileTypeSelector show={this.state.showPicker} onFile={this.onFile} close={() => this.setState({showPicker: false})}/>
            </View>
        );
    }

    save = () => {
        let project = this.state.project;
        project.general['sonometer'] = this.state.sonometer;
        project.general['calibrator'] = this.state.calibrator;
        project.general['startCalibration'] = this.state.startCalibration;
        project.general['finalCalibration'] = this.state.finalCalibration;
        ProjectsKeeper.saveProject(project);
    }

    setSonometer(id: number) {
        let sonometer = this.state.sonometers.find((son: any) => son.id == id);
        this.setState({sonometer});
    }

    setCalibrator(id: number) {
        let calibrator = this.state.calibrators.find((cal: any) => cal.id == id);
        this.setState({calibrator});
    }

    onImagePickerPressed = (id: string) => {
        this.setState({showPicker: true, openedPicker: id})
    }

    onFile = (file: any) => {
        file = file.assets[0];
        let project = this.state.project;
        let key = 'l_' + (new Date().getTime());
        DataKeeper.addData('images', key, 'data:' + file.type + ";base64," + file.base64);
        project[this.state.openedPicker + 'Image'] = key;
        this.setState({
            project,
            showPicker: false
        });
    }

}