import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NoiseTechButton } from '../../../../component/button/button.component';
import { DrawerNavigationParams } from '../../../../navigation/navigation';
import { appStyles } from '../../../../style/app.style';
import { styles } from './new-evaluation.style';


type ProjectsScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'Projects'
>;

export interface Props {
    navigation: ProjectsScreenNavigationProp,
    editMode?: boolean
}

interface State {
    projects: any
}

export class NewEvaluationView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            projects: [
                { id: 1, name: 'Proyecto 1' }
            ]
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ ...appStyles.container, ...styles.contentContainer }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Crear evaluación</Text>
                </View>
                <ScrollView style={styles.container}>
                    <NoiseTechButton text='Identificar Receptores' onPress={() => { this.props.navigation.navigate('NoiseReceptors') }}></NoiseTechButton>
                    <NoiseTechButton text='Identificar fuentes de ruido' onPress={() => { this.props.navigation.navigate('NoiseSources') }}></NoiseTechButton>
                    <NoiseTechButton text='Realizar medición de ruido' onPress={() => { this.props.navigation.navigate('NoiseMeasurement') }}></NoiseTechButton>
                </ScrollView>
            </View>
        );
    }


}