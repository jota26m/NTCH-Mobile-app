import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NoiseTechButton } from '../../../../component/button/button.component';
import { LineInput } from '../../../../component/line-input/line-input.component';
import { NoiseTechRoundButton } from '../../../../component/round-button/round-button.component';
import { DrawerNavigationParams } from '../../../../navigation/navigation';
import { appStyles } from '../../../../style/app.style';
import { styles } from './project-detail.style';


type ProjectsScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'Projects'
>;

export interface Props {
    navigation: ProjectsScreenNavigationProp,
    route: any
}

interface State {
    project?: any
}

export class ProjectDetailView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = this.props.route.params;
    }


    componentDidMount() {
        console.log(this.state.project.measurements);
    }

    render() {
        return (
            <View style={{ ...appStyles.container, ...styles.contentContainer }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{ this.state.project.general.alias }</Text>
                </View>
                <ScrollView style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textCaption}>Nombre del proyecto</Text>
                        <Text style={styles.text}>{ this.state.project.general.name }</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textCaption}>Titular</Text>
                        <Text style={styles.text}>{ this.state.project.general.titular }</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textCaption}>Región</Text>
                        <Text style={styles.text}>{ this.state.project.general.commune.region.name }</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textCaption}>Comuna</Text>
                        <Text style={styles.text}>{ this.state.project.general.commune.name }</Text>
                    </View>

                    <NoiseTechButton text='Editar proyecto' style={appStyles.secondaryButton} onPress={() => { this.props.navigation.navigate('ProjectEdition', {project: this.state.project, editMode: true, callback: this.onProjectEdit}) }}></NoiseTechButton>
                    <NoiseTechButton text='Identificar Receptores' onPress={() => { this.props.navigation.navigate('NoiseReceptors', {project: this.state.project, callback: this.onProjectEdit }) }}></NoiseTechButton>
                    <NoiseTechButton text='Identificar fuentes de ruido' onPress={() => { this.props.navigation.navigate('NoiseSources', {project: this.state.project, callback: this.onProjectEdit }) }}></NoiseTechButton>
                    <NoiseTechButton text='Realizar medición de ruido' onPress={() => { this.props.navigation.navigate('NoiseMeasurement', {project: this.state.project, callback: this.onProjectEdit }) }}></NoiseTechButton>
                    <NoiseTechButton text='Finalizar' onPress={() => { this.props.navigation.navigate('Finalize', {project: this.state.project, callback: this.onProjectEdit }) }}></NoiseTechButton>
                </ScrollView>
            </View>
        );
    }

    onProjectEdit = (project: any) => {
        this.setState({project: project});
    } 


}