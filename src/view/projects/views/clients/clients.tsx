import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NoiseTechButton } from '../../../../component/button/button.component';
import { ItemComponent } from '../../../../component/item/item.component';
import { LineInput } from '../../../../component/line-input/line-input.component';
import { NoiseTechRoundButton } from '../../../../component/round-button/round-button.component';
import ProjectsKeeper from '../../../../keepers/projects.keeper';
import { DrawerNavigationParams } from '../../../../navigation/navigation';
import ClientService from '../../../../services/client.service';
import LocalDataService from '../../../../services/local-data.service';
import ProfileService from '../../../../services/profile.service';
import { appStyles } from '../../../../style/app.style';
import { styles } from './clients.style';


type ClientsScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'Clients'
>;

export interface Props {
    navigation: ClientsScreenNavigationProp,
    route: any
}

interface State {
    clients?: any
}

export class ClientsView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        let clients = LocalDataService.getClients();
        this.state = {
            clients: clients != undefined ? clients : []
        };
    }


    componentDidMount() {

        if (this.state.clients.length == 0) {
            let scope = this;
            let interval = setInterval(() => {
                scope.setState(
                    {clients: LocalDataService.getClients() != undefined ? LocalDataService.getClients() : []
                    }, () => {
                        if (this.state.clients.length > 0) {
                            clearInterval(interval);
                        }
                    }
                );

            }, 500);
        }
    }

    render() {
        return (
            <View style={{ ...appStyles.container, ...styles.contentContainer }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Seleccione la cuenta con la que trabajará</Text>
                </View>
                
                <ScrollView style={styles.container}>
                    {
                        this.state.clients.map((client: any, index: number) => {
                            return (
                                <ItemComponent text={client.fantasyName} key={index} onPress={() => this.selectClient(client)}></ItemComponent>
                            );
                        })
                    }
                </ScrollView>
            </View>
        );
    }

    selectClient = (client: any) => {
        ProjectsKeeper.setWorkingClient(client);
        this.props.navigation.navigate('Projects');
    }


}