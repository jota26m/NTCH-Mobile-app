import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NoiseTechButton } from '../../../../component/button/button.component';
import { LineInput } from '../../../../component/line-input/line-input.component';
import { ModalError } from '../../../../component/modal-error/modal-error.component';
import { ModalSelector } from '../../../../component/modal-selector/modal-selector.component';
import { NoiseTechRoundButton } from '../../../../component/round-button/round-button.component';
import DataKeeper from '../../../../keepers/data.keeper';
import ProjectsKeeper from '../../../../keepers/projects.keeper';
import { DrawerNavigationParams } from '../../../../navigation/navigation';
import { appStyles } from '../../../../style/app.style';
import { styles } from './project-edition.style';


type ProjectsScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'Projects'
>;

export interface Props {
    navigation: ProjectsScreenNavigationProp,
    route: any,
}

interface State {
    projects: any,
    regions: any,
    communes: any,
    communesHash: any,
    types: any,
    subtypesHash: any,
    subtypes: any,
    project: any,
    validationRules: any,
    editMode?: boolean,
}

export class ProjectEditionView extends React.Component<Props, State> {

    modal: any;

    constructor(props: Props) {
        super(props);
        let regions = Array();
        let types = Array();
        let communesHash: any = {};
        let subtypesHash: any = {};
        if (DataKeeper.getDataByType('working') != undefined) {
            DataKeeper.getDataByType('working').regions.map((region: any) => {
                regions.push({ id: region.id, text: region.name })
            });
            DataKeeper.getDataByType('working').communes.map((commune: any) => {
                if (communesHash[commune.region.id] == undefined) {
                    communesHash[commune.region.id] = Array();
                }
                communesHash[commune.region.id].push({ id: commune.id, text: commune.name });
            });
            DataKeeper.getDataByType('working')['activity-types'].map((type: any) => {
                types.push({ id: type.id, text: type.name })
            });
            DataKeeper.getDataByType('working')['activity-subtypes'].map((subtype: any) => {
                if (subtypesHash[subtype.activityType.id] == undefined) {
                    subtypesHash[subtype.activityType.id] = Array();
                }
                subtypesHash[subtype.activityType.id].push({ id: subtype.id, text: subtype.name });
            });
        }
        let communes = [];
        if (this.props.route.params.editMode) {
            communes = communesHash[this.props.route.params.project.general.commune.region.id];
        }
        let subtypes = [];
        if (this.props.route.params.editMode) {
            subtypes = subtypesHash[this.props.route.params.project.general.activitySubtype.activityType.id];
        }

        this.state = {
            ...{
                projects: [],
                regions,
                communes: communes,
                communesHash,
                types,
                subtypesHash,
                subtypes,
                project: {
                    general: {}
                },
                validationRules: {
                    name: {
                        required: true,
                        requiredText: 'El nombre no ha sido ingresado'
                    },
                    alias: {
                        required: true,
                        requiredText: 'El alias no ha sido ingresado'
                    },
                    titular: {
                        required: true,
                        requiredText: 'El titular no ha sido ingresado'
                    },
                    address: {
                        required: true,
                        requiredText: 'La dirección no ha sido ingresada'
                    },
                    commune: {
                        required: true,
                        requiredText: 'La comuna no ha sido seleccionada'
                    }
                }
            },
            ...this.props.route.params
        };
    }

    componentDidMount() {
    }


    render() {


        return (
            <View style={{ ...appStyles.container, ...styles.contentContainer }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Nuevo proyecto para evaluar fuente emisora</Text>
                </View>
                <ScrollView style={styles.projectsContainer}>
                    <LineInput value={this.state.editMode ? this.state.project.general.name : ''} placeHolder='Nombre o razón social' id='name' onTextChange={this.onChange}></LineInput>
                    <LineInput value={this.state.editMode ? this.state.project.general.alias : ''} placeHolder='Nombre corto o alias' id='alias' onTextChange={this.onChange}></LineInput>
                    <LineInput value={this.state.editMode ? this.state.project.general.rut : ''} placeHolder='Rut' id='rut' onTextChange={this.onChange}></LineInput>
                    <LineInput value={this.state.editMode ? this.state.project.general.titular : ''} placeHolder='Titular' id='titular' onTextChange={this.onChange}></LineInput>
                    <LineInput value={this.state.editMode ? this.state.project.general.address : ''} placeHolder='Dirección' id='address' onTextChange={this.onChange}></LineInput>
                    <ModalSelector selectedValue={this.state.editMode ? this.state.project.general.commune.region.id : null} text={'Región'} acceptText={'Aceptar'} onAccept={(region: any) => { this.setCommunes(region); }} title={'Seleccione la región'} options={this.state.regions}></ModalSelector>
                    <ModalSelector selectedValue={this.state.editMode ? this.state.project.general.commune.id : null} text={'Comuna'} acceptText={'Aceptar'} onAccept={this.onCommuneSelected} title={'Seleccione la comuna'} options={this.state.communes}></ModalSelector>
                    <ModalSelector selectedValue={this.state.editMode ? this.state.project.general.activitySubtype.activityType.id : null} text={'Actividad'} acceptText={'Aceptar'} onAccept={(type: any) => { this.setSubtypes(type); }} title={'Seleccione la actividad económica'} options={this.state.types}></ModalSelector>
                    <ModalSelector selectedValue={this.state.editMode ? this.state.project.general.activitySubtype.id : null} text={'Sub actividad'} acceptText={'Aceptar'} onAccept={this.onSubtypeSelected} title={'Seleccione la comuna'} options={this.state.subtypes}></ModalSelector>
                    <LineInput value={this.state.editMode ? this.state.project.general.previousCertificates : ''} placeHolder='N° certificado de informes previos' id='previousCertificates' onTextChange={this.onChange}></LineInput>
                    <LineInput value={this.state.editMode ? this.state.project.general.rca : ''} placeHolder='N° RCA' id='rca' onTextChange={this.onChange}></LineInput>
                    <LineInput value={this.state.editMode ? this.state.project.general.additionalDetails : ''} placeHolder='Información adicional' id='additionalDetails' onTextChange={this.onChange}></LineInput>
                    <LineInput value={this.state.editMode ? this.state.project.general.zoneName : ''} placeHolder='Nombre de zona de emplazamiento' id='zoneName' onTextChange={this.onChange}></LineInput>
                    <NoiseTechButton text='Georeferenciar' style={appStyles.secondaryButton} onPress={() => { this.props.navigation.navigate('SetLocation', { callback: this.setLocation, latitude: this.state.project.general.latitude, longitude: this.state.project.general.longitude }) }}></NoiseTechButton>
                    <NoiseTechButton text='Guardar' onPress={this.state.editMode == true ? this.edit : this.save}></NoiseTechButton>
                </ScrollView>
                <ModalError ref={(modal) => this.modal = modal} rules={this.state.validationRules}></ModalError>
            </View>
        );
    }

    setLocation = (data: any) => {
        let project = this.state.project;
        project.general = { ...project.general, ...data };
        this.setState({ project });
    }

    setCommunes(region: any) {
        this.setState({ communes: this.state.communesHash[region.id] });
    }

    onCommuneSelected = (commune: any) => {
        let project = this.state.project;
        project.general['commune'] = DataKeeper.getDataByType('working').communes.find((com: any) => com.id == commune.id);
        this.setState({ project });
    }

    setSubtypes(type: any) {
        this.setState({ subtypes: this.state.subtypesHash[type.id] });
    }

    onSubtypeSelected = (subtype: any) => {
        let project = this.state.project;
        project.general['activitySubtype'] = DataKeeper.getDataByType('working')['activity-subtypes'].find((com: any) => com.id == subtype.id);
        this.setState({ project });
    }

    onChange = (value: any) => {
        let project = this.state.project;
        project.general[value.id] = value.val;
        this.setState({ project });
    }

    save = () => {
        if (this.modal.validate(this.state.project.general) != true) {
            return;
        };
        ProjectsKeeper.addProject(this.state.project);
        this.props.route.params.callback();
        this.props.navigation.goBack();
    }

    edit = () => {
        if (this.modal.validate(this.state.project.general) != true) {
            return;
        };
        ProjectsKeeper.saveProject(this.state.project);
        this.props.route.params.callback(this.state.project);
        this.props.navigation.goBack();
    }


}