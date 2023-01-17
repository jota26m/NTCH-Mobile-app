import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NoiseTechButton } from '../../../../../../component/button/button.component';
import { FileTypeSelector } from '../../../../../../component/file/file-type-selector.component';
import { LineInput } from '../../../../../../component/line-input/line-input.component';
import { ModalError } from '../../../../../../component/modal-error/modal-error.component';
import DataKeeper from '../../../../../../keepers/data.keeper';
import ProjectsKeeper from '../../../../../../keepers/projects.keeper';
import { DrawerNavigationParams } from '../../../../../../navigation/navigation';
import { appStyles } from '../../../../../../style/app.style';
import { styles } from './noise-source.style';


type ProjectsScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'NoiseReceptor'
>;

export interface Props {
    navigation: ProjectsScreenNavigationProp,
    route: any,
}

interface State {
    validationRules?: any,
    editMode?: boolean,
    source?: any,
    showPicker: boolean,
    project: any,
}

export class NoiseSourceView extends React.Component<Props, State> {

    modal: any;

    constructor(props: Props) {
        super(props);
        
        this.state = {
            validationRules: {
                name: {
                    required: true,
                    requiredText: 'El nombre no ha sido ingresado'
                },
                details: {
                    required: true,
                    requiredText: 'Las características de la fuente de ruido no han sido definidas'
                },
            },
            project: this.props.route.params.project,
            source: this.props.route.params.source ? this.props.route.params.project.sources.find((source: any) => source.id == this.props.route.params.source.id) : {},
            showPicker: false,
            editMode: this.props.route.params.editMode        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ ...appStyles.container, ...styles.contentContainer }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Identificar fuente de ruido</Text>
                </View>
                <ScrollView style={styles.container}>
                    <LineInput value={this.state.source.name} placeHolder='Nombre'  id='name' onTextChange={this.onChange}></LineInput>
                    <LineInput value={this.state.source.details} placeHolder='Características de la fuente de ruido'  id='details' onTextChange={this.onChange}></LineInput>
                    <LineInput value={this.state.source.comments} placeHolder='Observaciones'  id='comments' onTextChange={this.onChange}></LineInput>
                    
                    <NoiseTechButton text='Georeferenciar' style={appStyles.secondaryButton}  onPress={() => { this.props.navigation.navigate('SetLocation', {callback: this.setLocation, latitude: this.state.source.latitude, longitude: this.state.source.longitude}) }}></NoiseTechButton>
                    <NoiseTechButton text='Fotografía' style={appStyles.secondaryButton}  onPress={() => { this.setState({showPicker: true}) }}></NoiseTechButton>
                    <NoiseTechButton text='Guardar' onPress={this.save}></NoiseTechButton>

                </ScrollView>
                <ModalError ref={(modal) => this.modal = modal} rules={this.state.validationRules}></ModalError>
                <FileTypeSelector show={this.state.showPicker} onFile={this.onFile} close={() => this.setState({showPicker: false})}/>

            </View>
        );
    }


    onChange = (value: any) => {
        let source = this.state.source;
        source[value.id] = value.val;
        this.setState({ source });
    }

    setLocation = (data: any) => {
        let source = this.state.source;
        source = {...source, ...data};
        this.setState({ source });
    }

    onFile = (file: any) => {
        file = file.assets[0];
        let source = this.state.source;
        let key = 'l_' + (new Date().getTime());
        DataKeeper.addData('images', key, 'data:' + file.type + ";base64," + file.base64);
        source['image'] = key;
        this.setState({
            source,
            showPicker: false
        });
    }

    save = () => {
        if (this.modal.validate(this.state.source) != true) {
            return;
        };
        let source = this.state.source;
        if (source.id == undefined) {
            source.id = new Date().getTime();
        }
        let project = this.state.project;
        project.sources = project.sources.filter((rcvr: any) => rcvr.id != source.id);
        project.sources.push(source);
        project = ProjectsKeeper.saveProject(this.state.project);
        this.props.route.params.callback(project);
        this.props.navigation.goBack();
    }


}