import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Button, Modal, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LineInput } from '../../component/line-input/line-input.component';
import { ItemComponent } from '../../component/item/item.component';
import { NoiseTechRoundButton } from '../../component/round-button/round-button.component';
import ProjectsKeeper from '../../keepers/projects.keeper';
import { DrawerNavigationParams } from '../../navigation/navigation';
import { appStyles } from '../../style/app.style';
import { styles } from './projects.style';
import SyncService from '../../services/sync.service';
import { modalStyles } from '../../component/modal-error/modal-error.component';
import { SyncComponent } from '../../component/sync/sync.component';
import { StackNavigationOptions } from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

type ProjectsScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'Projects'
>;

export interface Props {
    navigation: ProjectsScreenNavigationProp
}

interface State {
    projects: any,
    synchronizing: boolean,
    syncronized?: number,
    pendings?: number
}

export class ProjectsView extends React.Component<Props, State> {

    syncModal: any;

    static navigationOptions = {
        headerRight: 'Details',
      };

    constructor(props: Props) {
        super(props);
        props.navigation.setOptions({
            headerRight: 
            (

                <TouchableOpacity delayPressIn={0} style={styles.menuButton} onPress={this.sync}>
                <FontAwesomeIcon icon={faSync} size={30} style={styles.menuIcon} />
            </TouchableOpacity>
            )
        });
        this.state = {
            projects: this.processProjects(),
            synchronizing: true
        };
        //SyncService.sync(1, data.projects);
    }

    componentDidMount() {
        //this.sync();
    }

    render() {

        return (
            <View style={{ ...appStyles.container, ...styles.contentContainer }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Mis proyectos en curso</Text>
                </View>
                { /*
                <View style={styles.searchContainer}>
                    <LineInput placeHolder='Buscar proyecto' onTextChange={() => { }}></LineInput>
                </View>
                 */}
                <ScrollView style={styles.projectsContainer}>
                    {
                        this.state.projects.map((project: any, index: number) => {
                            return (
                                <ItemComponent text={project.general.alias} key={index} onPress={() => { this.props.navigation.navigate('ProjectDetail', { project }) }}></ItemComponent>
                            );
                        })
                    }
                </ScrollView>
                <NoiseTechRoundButton style={styles.addButton} text='+' onPress={() => { this.props.navigation.navigate('ProjectEdition', { callback: this.refresh }) }}></NoiseTechRoundButton>
                <SyncComponent ref={(ref) => {this.syncModal = ref}}></SyncComponent>
            </View>
        );
    }

    refresh = () => {
        this.setState({ projects: this.processProjects() });
    }

    processProjects() {
        let projects: any = [];
        let rawProjects = ProjectsKeeper.getAllProjects();
        Object.keys(rawProjects).map((key) => {
            projects.push(rawProjects[key]);
        });
        return projects;
    }

    sync = () => {
        this.syncModal.sync(() => {
            this.refresh();
        });
    }


}