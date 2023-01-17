import { faCamera, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, StyleSheet, Modal, Text, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DataKeeper from "../../keepers/data.keeper";
import ProjectsKeeper from "../../keepers/projects.keeper";
import SessionKeeper from "../../keepers/session.keeper";
import SyncService from "../../services/sync.service";
import { colors } from "../../style/app.style";
import { NoiseTechButton } from "../button/button.component";
import { SelectQuestion } from "../select-input/select.question.component";


export interface Props {
}

interface State {
    show: boolean,
    synchronizing: boolean,
    success: boolean
}

export class SyncComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            show: false,
            synchronizing: false,
            success: false
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <View style={modalStyles.background}>


                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.show}
                        style={{ height: '100%' }}
                        onRequestClose={() => { }}
                    >
                        <View style={modalStyles.container}>
                            <View style={modalStyles.realContainer}>
                                <View>
                                    <Text style={modalStyles.titleText}>{this.state.synchronizing ? 'Sincronizando' : 'Sincronización finalizada'}</Text>
                                </View>
                                <View style={modalStyles.contentContainer}>
                                    {
                                        this.state.synchronizing ?
                                            <ActivityIndicator size={80} />
                                            : (this.state.success ?
                                                <View style={modalStyles.infoContainer}>
                                                    <FontAwesomeIcon style={modalStyles.infoIcon} icon={faCheckCircle} size={70} />
                                                    <Text style={modalStyles.infoText}>Se ha sincronizado la información con éxito</Text>
                                                </View> :
                                                <View style={modalStyles.infoContainer}>
                                                    <FontAwesomeIcon style={modalStyles.infoIcon} icon={faTimesCircle} size={70} />
                                                    <Text style={modalStyles.infoText}>No hay conexión</Text>
                                                </View>)

                                    }

                                </View>
                                <View style={modalStyles.buttonContainer}>
                                    <NoiseTechButton text="Cerrar" onPress={this.close} disabled={this.state.synchronizing} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>

        );
    }

    close = () => {
        this.setState({ show: false });
    }

    sync = (callback: Function) => {
        if (!SessionKeeper.isLoggined()) {
            return;
        }
        /*
        NetInfo.fetch("wifi").then(state => {
            console.log("SSID", state.details.ssid);
            console.log("BSSID", state.details.bssid);
            console.log("Is connected?", state.isConnected);
          });
          */
        this.setState({ show: true, synchronizing: true });

        let rawProjects = ProjectsKeeper.getAllProjects();
        let headers: any = [];
        Object.keys(rawProjects).map((key) => {
            let project = rawProjects[key];
            headers.push({
                id: project.general.id != undefined ? project.general.id : project.id,
                version: project.general.version != undefined ? project.general.version : null,
                currentVersion: project.general.currentVersion != undefined ? project.general.currentVersion : -1,
                edited: project.general.edited == true
            });
        });
        SyncService.getHeaders(1, headers).then(response => {
            let syncHeaders = response.data.data;
            let data: any = {};
            console.log(syncHeaders);
            syncHeaders.forEach((project: any) => {
                if (project.id != project.tId && project.tId != 0) {
                    let rawProject = Object.assign({}, rawProjects[project.tId]);
                    rawProject.general.id = project.id;
                    rawProject.general['version'] = -1;
                    rawProject.general['currentVersion'] = -1;
                    rawProjects[project.id] = rawProject;
                    delete rawProjects[project.tId];
                    data[project.id] = rawProject;
                } else {
                    data[project.id] = rawProjects[project.id];
                }
            });
            let images = DataKeeper.getDataByType('images');
            let audios = DataKeeper.getDataByType('audios');
            SyncService.syncWithServer(1, syncHeaders, data, images, audios).then(syncResponse => {
                let syncedData = syncResponse.data.data;
                
                Object.keys(syncedData.projects).forEach((key: string) => {
                    console.log(key);
                    console.log(syncedData.projects[key].parent);
                    
                    let localProject = ProjectsKeeper.getProject(key);
                    localProject.general.version = syncedData.projects[key].parent.version;
                    localProject.general.currentVersion = syncedData.projects[key].parent.currentVersion;
                    ProjectsKeeper.saveProject(localProject, false);
                    
                });

                Object.keys(images).forEach((key: string) => {
                    DataKeeper.data.images[key] = syncedData.images[key];
                });
                Object.keys(audios).forEach((key: string) => {
                    DataKeeper.data.audios[key] = syncedData.audios[key];
                });
                DataKeeper.persist();

                this.setState({ synchronizing: false, success: true });
            }, error => {
                this.setState({
                    synchronizing: false,
                    success: false
                })
            });
        }, error => {
            this.setState({
                synchronizing: false,
                success: false
            })
        });
    }

}


export const modalStyles = StyleSheet.create({
    background: {
        height: 0,
        width: 0
    },
    container: {
        flex: 1,
        padding: 15,
        paddingTop: 40,
        backgroundColor: '#00000044'
    },
    realContainer: {
        height: '100%',
        backgroundColor: '#ffffff',
        flex: 1,
        borderRadius: 15,
        padding: 10
    },
    titleContainer: {
        height: 60,
        marginBottom: 10,
        alignContent: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontWeight: '200',
        fontSize: 18,
        textAlign: 'center'
    },
    termsTextContainer: {
        height: '100%',
        marginBottom: 10
    },
    termsText: {
        paddingHorizontal: 10,
        fontSize: 16
    },
    contentContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 80,
    },
    close: {
        color: '#707070',
    },
    cameraIcon: {
        position: 'absolute',
        right: 10,
        marginVertical: 5
    },
    infoContainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoIcon: {
        marginBottom: 30
    },
    infoText: {
        fontSize: 18,
        fontWeight: '300',
        textAlign: 'center'
    }
}
);