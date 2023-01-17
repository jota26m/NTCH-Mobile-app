import React from 'react';
import { View, Text, ImageBackground, } from 'react-native';
import { appStyles, colors } from '../../../../style/app.style';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { NoiseTechButton } from '../../../../component/button/button.component';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerNavigationParams } from '../../../../navigation/navigation';
import { styles } from './map.style';


type MapScreenNavigationProp =  DrawerNavigationProp<
DrawerNavigationParams,
    'Map'
>;

export interface Props {
    navigation: MapScreenNavigationProp,
    route: any,
}

interface State {
    address?: any,
    region?: any,
    latitude: any,
    longitude: any
}

interface State {
}


export class MapSelectorView extends React.Component<Props, State> {



    constructor(props: Props) {
        super(props);
        this.state = {
            latitude: this.props.route.params.latitude,
            longitude: this.props.route.params.longitude,
            region: {}
        }
    }

    render() {
        return (
            <View style={appStyles.container}>
                    <ScrollView style={styles.container} bounces={false}>
                        
                        <View style={styles.mapContainer}>
                            <FontAwesomeIcon style={styles.centerPin} icon={faMapPin} size={30}></FontAwesomeIcon>
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                zoomEnabled={true}
                                style={styles.map}
                                initialRegion={{
                                    latitude: this.props.route.params.latitude,
                                    longitude: this.props.route.params.longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01
                                }}
                                onRegionChange={(region: any) => {
                                    this.setState({ 
                                        region: region
                                    });
                                }}
                            >
                            </MapView>
                        </View>
                        <NoiseTechButton text={'Aceptar'} onPress={this.onAccept}/>
                        <NoiseTechButton text={'Volver'} onPress={() => { this.props.navigation.goBack() }} />
                    </ScrollView>
            </View>
        );
    }

    onSearchChange = (id: string, data: { [key: string]: any }) => {
        this.setState({ address: data.unique });
    }


    onAccept = () => {
        this.props.route.params.callback(
            this.state.region.latitude != undefined ? this.state.region.latitude : this.state.latitude,
            this.state.region.longitude != undefined ? this.state.region.longitude : this.state.longitude
        );
        this.props.navigation.goBack();
    }


}