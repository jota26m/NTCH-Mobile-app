import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { PermissionsAndroid, Platform, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NoiseTechButton } from '../../component/button/button.component';
import { LineInput } from '../../component/line-input/line-input.component';
import { ModalError } from '../../component/modal-error/modal-error.component';
import { DrawerNavigationParams } from '../../navigation/navigation';
import { appStyles } from '../../style/app.style';
import { styles } from './set-location.style';
import Geolocation from 'react-native-geolocation-service';
import { fromLatLon } from '../../utils/coordinates.converter';

type ProjectsScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'NoiseReceptor'
>;

export interface Props {
    navigation: ProjectsScreenNavigationProp,
    route: any
}

interface State {
    validationRules?: any,
    northCoordinate?: number,
    huso?: string,
    eastCoordinate?: number,
    latitude: number,
    longitude: number,
    hasLocationPermision?: boolean,
    editMode: boolean
    
}

export class SetLocationView extends React.Component<Props, State> {

    modal: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            validationRules: {},
            latitude: this.props.route.params.latitude ? this.props.route.params.latitude : -39.832361,
            longitude: this.props.route.params.longitude ? this.props.route.params.longitude : -73.244473,
            editMode: this.props.route.params.latitude ? true : false
        };


        if (Platform.OS == 'ios') {
            Geolocation.requestAuthorization('whenInUse').then(
                granted => {
                    if (!this.state.editMode) {
                        this.getCurrentPosition();
                    }
                    this.setState({hasLocationPermision: true})
                },
                rejected => {
                    this.setState({hasLocationPermision: false})
                }
            );
        } else {
            let hasLocationPermission = async () => {
                const hasPermission = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );

                if (hasPermission === PermissionsAndroid.RESULTS.GRANTED) {
                    if (!this.state.editMode) {
                        this.getCurrentPosition();
                    }
                    return true;
                }
                return false;
            }
            hasLocationPermission().then(
                result => {
                    this.setState({hasLocationPermision: result})
                }
            )
        }
    }

    componentDidMount() {
        if (this.state.editMode) {
            this.setForm(this.state.latitude, this.state.longitude);
        }
    }

    render() {
        return (
            <View style={{ ...appStyles.container, ...styles.contentContainer }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Ubicación del receptor</Text>
                </View>
                <ScrollView style={styles.container}>
                    <LineInput disabled={true} value={'WGS 84'} placeHolder='Datum' id='datum' onTextChange={this.onChange}></LineInput>
                    <LineInput value={String(this.state.northCoordinate)} placeHolder='Coordenada norte' id='northCoordinate' onTextChange={this.onChange}></LineInput>
                    <LineInput value={this.state.huso} placeHolder='Huso' id='huso' onTextChange={this.onChange}></LineInput>
                    <LineInput value={String(this.state.eastCoordinate)} placeHolder='Coordenada este' id='eastCoordinate' onTextChange={this.onChange}></LineInput>
                    <NoiseTechButton text='Ubicar en mapa' style={appStyles.secondaryButton}  onPress={this.goToLocationSet}></NoiseTechButton>

                    <NoiseTechButton text='Aceptar' onPress={this.save}></NoiseTechButton>

                </ScrollView>
                <ModalError ref={(modal) => this.modal = modal} rules={this.state.validationRules}></ModalError>
            </View>
        );
    }

    onChange = (value: any) => {
        console.log(value);
        //this.setState({ receiver });
    }

    save = () => {
        this.props.route.params.callback({
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            northCoordinate: this.state.northCoordinate,
            huso: this.state.huso,
            eastCoordinate: this.state.eastCoordinate
        });
        this.props.navigation.goBack();
    }

    getCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            (position: any) => {
                this.setForm(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.log(error.code, error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
                showLocationDialog: true,
                forceRequestLocation: true
            }
        );
    }

    goToLocationSet = () => {
        this.props.navigation.navigate('Map', {
            latitude: this.state.hasLocationPermision ? this.state.latitude : -39.832361,
            longitude: this.state.hasLocationPermision ? this.state.longitude : -73.244473,
            callback: this.locationSettedCallback
        });
    }

    locationSettedCallback = (latitude: number, longitude: number) => {
        this.setForm(latitude, longitude);
    }

    setForm(latitude: number, longitude: number) {
        let wsg84 = fromLatLon(latitude, longitude);
        this.setState({
            latitude: latitude,
            longitude: longitude,
            huso: wsg84.zoneNum + ' ' + wsg84.zoneLetter,
            eastCoordinate: Math.round(wsg84.easting * 10) / 10,
            northCoordinate: Math.round(wsg84.northing * 10) / 10
        });
    }


}