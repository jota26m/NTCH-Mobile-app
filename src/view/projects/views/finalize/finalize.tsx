import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NoiseTechButton } from '../../../../component/button/button.component';
import { LineInput } from '../../../../component/line-input/line-input.component';
import { NoiseTechRoundButton } from '../../../../component/round-button/round-button.component';
import { DrawerNavigationParams } from '../../../../navigation/navigation';
import { appStyles } from '../../../../style/app.style';
import { styles } from './finalize.style';


type FinalizeScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'Finalize'
>;

export interface Props {
    navigation: FinalizeScreenNavigationProp,
    route: any
}

interface State {
    project?: any
}

export class FinalizeView extends React.Component<Props, State> {
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
                    <NoiseTechButton text='Confirmar y finalizar' onPress={() => { this.props.navigation.goBack() }}></NoiseTechButton>
                </ScrollView>
            </View>
        );
    }

    onProjectEdit = (project: any) => {
        this.setState({project: project});
    } 


}