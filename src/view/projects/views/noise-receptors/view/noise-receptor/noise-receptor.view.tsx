import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NoiseTechButton } from '../../../../../../component/button/button.component';
import { FileTypeSelector } from '../../../../../../component/file/file-type-selector.component';
import { LineInput } from '../../../../../../component/line-input/line-input.component';
import { ModalError } from '../../../../../../component/modal-error/modal-error.component';
import { ModalSelector } from '../../../../../../component/modal-selector/modal-selector.component';
import { MultiSelectQuestion } from '../../../../../../component/multi-select-input.tsx/multi-select.question.component';
import { SelectQuestion } from '../../../../../../component/select-input/select.question.component';
import DataKeeper from '../../../../../../keepers/data.keeper';
import ProjectsKeeper from '../../../../../../keepers/projects.keeper';
import { DrawerNavigationParams } from '../../../../../../navigation/navigation';
import LocalDataService from '../../../../../../services/local-data.service';
import { appStyles } from '../../../../../../style/app.style';
import { styles } from './noise-receptor.style';


type NoiseReceptorScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'NoiseReceptor'
>;

export interface Props {
    navigation: NoiseReceptorScreenNavigationProp,
    route: any
}

interface State {
    validationRules?: any,
    editMode?: boolean,
    receiver?: any,
    regions: any,
    communes: any,
    zoneTypes: any,
    landUses: any
    showPicker: boolean,
    project: any,
    selectedLandUses: any
}

export class NoiseReceptorView extends React.Component<Props, State> {

    modal: any;

    constructor(props: Props) {
        super(props);
        let zoneTypes = LocalDataService.getZoneTypes().map((type: any) => { return {id: type.id, text: type.name}});

        let regions: any = [];
        LocalDataService.getRegions().map((region: any) => {
            regions.push({ id: region.id, text: region.name })
        });
        let communes = [];
        if (this.props.route.params.editMode) {
            communes = LocalDataService.getCommunesByRegion(this.props.route.params.receiver.commune.region.id).map((commune: any) => { return {id: commune.id, text: commune.name}});
        }
        let landUses: any = [];
        if (this.props.route.params.editMode) {
            landUses = LocalDataService.getLandUses(this.props.route.params.receiver.zoneType.id).map((landUse: any) => { return {id: landUse.id, text: landUse.name}});
        }

        this.state = {
            validationRules: {
                name: {
                    required: true,
                    requiredText: 'El nombre no ha sido ingresado'
                },
                street: {
                    required: true,
                    requiredText: 'La calle no ha sido ingresado'
                },
                number: {
                    required: true,
                    requiredText: 'El número de la dirección no ha sido ingresado',
                },
                commune: {
                    required: true,
                    requiredText: 'La comuna no ha sido seleccionada'
                },
                latitude: {
                    required: true,
                    requiredText: 'No se ha definido la posición del receptor',
                },
                landUses: {
                    required: true,
                    requiredText: 'No se ha definido el uso de suelo',
                }
            },
            regions,
            communes,
            zoneTypes,
            project: this.props.route.params.project,
            receiver: this.props.route.params.receiver ? this.props.route.params.project.receivers.find((receiver: any) => receiver.id == this.props.route.params.receiver.id) : {},
            landUses,
            showPicker: false,
            editMode: this.props.route.params.editMode,
            selectedLandUses: this.props.route.params.editMode ? this.props.route.params.receiver.landUses.map((landUse: any) => {return landUse.id}) : []
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ ...appStyles.container, ...styles.contentContainer }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Receptor</Text>
                </View>
                <ScrollView style={styles.container}>
                    <LineInput value={this.state.receiver.name} placeHolder='Nombre' id='name' onTextChange={this.onChange}></LineInput>
                    <LineInput value={this.state.receiver.street} placeHolder='Calle' id='street' onTextChange={this.onChange}></LineInput>
                    <LineInput value={this.state.receiver.number} placeHolder='Número' id='number' onTextChange={this.onChange}></LineInput>
                    <LineInput value={this.state.receiver.description} placeHolder='Descripción' id='description' onTextChange={this.onChange}></LineInput>
                    <ModalSelector selectedValue={this.state.editMode ? this.state.receiver.commune.region.id : null} text={'Región'} acceptText={'Aceptar'} onAccept={(region: any) => { this.setCommunes(region); }} title={'Seleccione la región'} options={this.state.regions}></ModalSelector>
                    <ModalSelector selectedValue={this.state.editMode ? this.state.receiver.commune.id : null} text={'Comuna'} acceptText={'Aceptar'} onAccept={this.onCommuneSelected} title={'Seleccione la comuna'} options={this.state.communes}></ModalSelector>
                    <SelectQuestion question={'Tipo de zona de emplazamiento'} id="zoneType" options={this.state.zoneTypes} onChange={this.onTypeZoneSelected} selectedValue={this.state.editMode ? this.state.receiver.zoneType.id : null} showBackground={true}></SelectQuestion>
                    <LineInput value={this.state.receiver.zoneName} placeHolder='Nombre zona de emplazamiento' id='zoneName' onTextChange={this.onChange}></LineInput>
                    <MultiSelectQuestion question={'Uso de suelo permitido'} id="landUses" options={this.state.landUses} onChange={this.onLandUsesSelected} selectedValues={this.state.selectedLandUses} showBackground={true}></MultiSelectQuestion>
                    
                    <NoiseTechButton text='Georeferenciar' style={appStyles.secondaryButton}  onPress={() => { this.props.navigation.navigate('SetLocation', {callback: this.setLocation, latitude: this.state.receiver.latitude, longitude: this.state.receiver.longitude}) }}></NoiseTechButton>
                    <NoiseTechButton text='Fotografía' style={appStyles.secondaryButton}  onPress={() => { this.setState({showPicker: true}) }}></NoiseTechButton>
                    <NoiseTechButton text='Guardar' onPress={this.save}></NoiseTechButton>

                </ScrollView>
                <ModalError ref={(modal) => this.modal = modal} rules={this.state.validationRules}></ModalError>
                <FileTypeSelector show={this.state.showPicker} onFile={this.onFile} close={() => this.setState({showPicker: false})}/>
            </View>
        );
    }


    setCommunes(region: any) {
        this.setState({ communes: LocalDataService.getCommunesByRegion(region.id).map((commune: any) => { return {id: commune.id, text: commune.name}}) });
    }

    onCommuneSelected = (commune: any) => {
        let receiver = this.state.receiver;
        receiver['commune'] = LocalDataService.getCommunes().find((com: any) => com.id == commune.id);
        this.setState({ receiver });
    }

    onTypeZoneSelected = (id: any, value: any) => {
        let receiver = this.state.receiver;
        receiver['zoneType'] = LocalDataService.getZoneTypes().find((type: any) => type.id == value.unique);
        this.setState({
            landUses: LocalDataService.getLandUses(receiver.zoneType.id).map((landUse: any) => { return {id: landUse.id, text: landUse.name}})
        });
        this.setState({ receiver });
    }

    onLandUsesSelected = (id: any, values: any) => {
        let receiver = this.state.receiver;
        receiver['landUses'] = [];
        values.unique.forEach((lUse: number) => {
            receiver.landUses.push(LocalDataService.getLandUses(receiver.zoneType.id).find((landUse : any) => landUse.id == lUse));
        });
        this.setState({ receiver });

    }

    onChange = (value: any) => {
        let receiver = this.state.receiver;
        receiver[value.id] = value.val;
        this.setState({ receiver });
    }

    setLocation = (data: any) => {
        let receiver = this.state.receiver;
        receiver = {...receiver, ...data};
        this.setState({ receiver });
    }

    onFile = (file: any) => {
        file = file.assets[0];
        let receiver = this.state.receiver;
        let key = 'l_' + (new Date().getTime());
        DataKeeper.addData('images', key, 'data:' + file.type + ";base64," + file.base64);
        receiver['image'] = key;
        this.setState({
            receiver,
            showPicker: false
        });
    }

    save = () => {
        if (this.modal.validate(this.state.receiver) != true) {
            return;
        };
        let receiver = this.state.receiver;
        if (receiver.id == undefined) {
            receiver.id = new Date().getTime();
        }
        let project = this.state.project;
        project.receivers = project.receivers.filter((rcvr: any) => rcvr.id != receiver.id);
        project.receivers.push(receiver);
        project = ProjectsKeeper.saveProject(this.state.project);
        this.props.route.params.callback(project);
        this.props.navigation.goBack();
    }


}