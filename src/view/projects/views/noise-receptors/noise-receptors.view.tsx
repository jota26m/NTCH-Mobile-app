import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NoiseTechButton } from '../../../../component/button/button.component';
import { ItemComponent } from '../../../../component/item/item.component';
import { LineInput } from '../../../../component/line-input/line-input.component';
import { NoiseTechRoundButton } from '../../../../component/round-button/round-button.component';
import { DrawerNavigationParams } from '../../../../navigation/navigation';
import { appStyles } from '../../../../style/app.style';
import { styles } from './noise-receptors.style';


type NoiseReceptorsScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'NoiseReceptors'
>;

export interface Props {
    navigation: NoiseReceptorsScreenNavigationProp,
    route: any,
}

interface State {
    project?: any,
    receivers: any
}

export class NoiseReceptorsView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ...{receivers: []},
            ...this.props.route.params
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ ...appStyles.container, ...styles.contentContainer }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Receptores</Text>
                </View>
                <ScrollView style={styles.container}>
                    {
                        this.state.project.receivers.map((receiver: any, index: number) => {
                            return (
                                <ItemComponent text={receiver.name} key={index} onPress={() => { this.props.navigation.navigate('NoiseReceptor', {project: this.state.project, receiver, callback: this.onEditProject, editMode: true}) }}></ItemComponent>
                            );
                        })
                    }
                </ScrollView>
                <NoiseTechRoundButton style={styles.addButton} text='+' onPress={() => { this.props.navigation.navigate('NoiseReceptor', {project: this.state.project, callback: this.onEditProject}) }}></NoiseTechRoundButton>
            </View>
        );
    }


    onEditProject = (project: any) => {
        this.setState({project});
    }

    processReceivers() {
    }


}