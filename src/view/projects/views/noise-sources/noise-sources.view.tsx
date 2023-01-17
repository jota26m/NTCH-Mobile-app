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
import { styles } from './noise-sources.style';


type ProjectsScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'NoiseSource'
>;

export interface Props {
    navigation: ProjectsScreenNavigationProp,
    route: any,
}

interface State {
    project?: any,
    sources: any
}

export class NoiseSourcesView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ...{sources: []},
            ...this.props.route.params
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ ...appStyles.container, ...styles.contentContainer }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Fuentes de ruido</Text>
                </View>
                <ScrollView style={styles.container}>
                    {
                        this.state.project.sources.map((source: any, index: number) => {
                            return (
                                <ItemComponent text={source.name} key={index} onPress={() => { this.props.navigation.navigate('NoiseSource', {project: this.state.project, source, callback: this.onEditProject, editMode: true}) }}></ItemComponent>
                            );
                        })
                    }
                </ScrollView>
                <NoiseTechRoundButton style={styles.addButton} text='+' onPress={() => { this.props.navigation.navigate('NoiseSource', {project: this.state.project, callback: this.onEditProject}) }}></NoiseTechRoundButton>
            </View>
        );
    }



    onEditProject = (project: any) => {
        this.setState({project});
    }


}