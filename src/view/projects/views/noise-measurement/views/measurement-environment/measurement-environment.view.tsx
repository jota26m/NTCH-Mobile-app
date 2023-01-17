import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NoiseTechButton } from '../../../../../../component/button/button.component';
import { DbInput } from '../../../../../../component/db-input/db-input.component';
import { FileTypeSelector } from '../../../../../../component/file/file-type-selector.component';
import { ModalError } from '../../../../../../component/modal-error/modal-error.component';
import { ModalSelector } from '../../../../../../component/modal-selector/modal-selector.component';
import { SelectQuestion } from '../../../../../../component/select-input/select.question.component';
import DataKeeper from '../../../../../../keepers/data.keeper';
import ProjectsKeeper from '../../../../../../keepers/projects.keeper';
import { DrawerNavigationParams } from '../../../../../../navigation/navigation';
import { appStyles } from '../../../../../../style/app.style';
import { styles } from './measurement-environment.style';


type MeasurementEnvironmentScreenNavigationProp = DrawerNavigationProp<
    DrawerNavigationParams,
    'MeasurementEnvironment'
>;

export interface Props {
    navigation: MeasurementEnvironmentScreenNavigationProp,
    route: any
}

interface State {
    project: any,
    measurement: any,
    validationRules: any,
    showPicker: boolean,
    point: any,
    npseq?: string,
    disabled: boolean
}

export class MeasurementEnvironmentView extends React.Component<Props, State> {

    modal: any;
    windowOptions = [
        { id: true, text: 'Abierta' },
        { id: false, text: 'Cerrada' }
    ]

    constructor(props: Props) {
        super(props);
        let npseq = this.props.route.params.measurement.npseq30 != undefined ? this.props.route.params.measurement.npseq30 : (this.props.route.params.measurement.npseq25 != undefined ? this.props.route.params.measurement.npseq25 : (this.props.route.params.measurement.npseq20 != undefined ? this.props.route.params.measurement.npseq20 : (this.props.route.params.measurement.npseq15 != undefined ? this.props.route.params.measurement.npseq15 : (this.props.route.params.measurement.npseq10))));
        this.state = {
            project: this.props.route.params.project,
            measurement: this.props.route.params.measurement,
            validationRules: {
                name: {
                    required: true,
                    requiredText: 'El nombre no ha sido ingresado'
                },
                details: {
                    required: true,
                    requiredText: 'Las características de la fuente de ruido no han sido definidas'
                },
            },
            showPicker: false,
            point: this.props.route.params.point,
            npseq: npseq,
            disabled: (this.props.route.params.point != undefined && this.props.route.params.point.averageWindSpeed != undefined) || (this.props.route.params.measurement != undefined && this.props.route.params.measurement.averageWindSpeed != undefined)
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ ...appStyles.container, ...styles.contentContainer }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Punto de medición</Text>
                </View>
                <ScrollView style={styles.container}>
                    <View style={styles.resultGroup}>
                        <View style={styles.resultGroupTop}>
                            <Text style={styles.resultGroupReceptor}>{this.state.measurement.receiver.name}</Text>
                        </View>
                        {
                            this.state.measurement.type == 'background' ?
                                <View style={styles.resultGroupBottom}>
                                    <Text style={styles.resultGroupValue}>Ruido de fondo: {this.state.npseq != undefined ? Math.round(Number(this.state.npseq)) : ''} dB(A)</Text>
                                    <Text style={styles.resultGroupValue}></Text>
                                </View>
                                :
                                <></>
                        }

                    </View>

                    <NoiseTechButton text='Fotografía' style={appStyles.secondaryButton} onPress={() => { this.setState({ showPicker: true }) }}></NoiseTechButton>
                    <NoiseTechButton text='Georeferenciar' style={appStyles.secondaryButton} onPress={() => {
                        this.props.navigation.navigate('SetLocation', {
                            callback: this.setLocation,
                            latitude: (this.state.measurement != undefined && this.state.measurement.latitude) != undefined ? this.state.measurement.latitude : ((this.state.point != undefined && this.state.point.latitude != undefined) ? this.state.point.latitude : null),
                            longitude: (this.state.measurement != undefined && this.state.measurement.longitude) != undefined ? this.state.measurement.longitude : ((this.state.point != undefined && this.state.point.longitude != undefined) ? this.state.point.longitude : null)
                        })
                    }}></NoiseTechButton>

                    {
                        this.state.measurement.type == 'background' || this.state.measurement.type == 'outside' || (this.state.measurement.type == 'inside' && this.state.point.number == 3) ?
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Condiciones Ambientales</Text>
                            </View>
                            : <></>
                    }


                    {
                        this.state.measurement.type == 'inside' && this.state.point.number == 3 ?
                            <SelectQuestion question={'Condición de ventana'} id="isWindowOpen" options={this.windowOptions} onChange={this.onWindowConditionsChange} selectedValue={this.state.measurement.isWindowOpen != undefined ? this.state.measurement.isWindowOpen : (this.state.point.isWindowOpen != undefined ? this.state.point.isWindowOpen : false)} showBackground={true}></SelectQuestion>

                            : <></>
                    }
                    {
                        this.state.measurement.type == 'background' || this.state.measurement.type == 'outside' || (this.state.measurement.type == 'inside' && this.state.point.number == 3) ?
                            <>
                                <DbInput leftText='Temperatura' rightText='°C' id='temperature' onChange={this.onChange} value={(this.state.measurement != undefined && this.state.measurement.temperature) != undefined ? this.state.measurement.temperature : ((this.state.point != undefined && this.state.point.temperature != undefined) ? this.state.point.temperature : '')}></DbInput>
                                <DbInput leftText='Humedad' rightText='%' id='humidity' onChange={this.onChange} value={(this.state.measurement != undefined && this.state.measurement.humidity != undefined) ? this.state.measurement.humidity : ((this.state.point != undefined && this.state.point.humidity != undefined) ? this.state.point.humidity : '')}></DbInput>
                                <DbInput leftText='Velocidad promedio viento' rightText='m/s' id='averageWindSpeed' onChange={this.onChange} value={(this.state.measurement != undefined && this.state.measurement.averageWindSpeed) != undefined ? this.state.measurement.averageWindSpeed : ((this.state.point != undefined && this.state.point.averageWindSpeed != undefined) ? this.state.point.averageWindSpeed : '')}></DbInput>
                                <DbInput leftText='Velocidad máxima viento' rightText='m/s' id='maxWindSpeed' onChange={this.onChange} value={(this.state.measurement != undefined && this.state.measurement.maxWindSpeed) != undefined ? this.state.measurement.maxWindSpeed : ((this.state.point != undefined && this.state.point.maxWindSpeed != undefined) ? this.state.point.maxWindSpeed : '')}></DbInput>
                            </> : <></>
                    }

                </ScrollView>
                <NoiseTechButton text='Aceptar' onPress={this.save}></NoiseTechButton>

                <ModalError ref={(modal) => this.modal = modal} rules={this.state.validationRules}></ModalError>
                <FileTypeSelector show={this.state.showPicker} onFile={this.onFile} close={() => this.setState({ showPicker: false })} />

            </View>
        );
    }

    onChange = (value: any) => {
        /*
        if (this.state.measurement.type == 'background') {
            let measurement: any = this.state.measurement;
            measurement[value.id] = value.val;
            this.setState({ measurement });
        } else {
            let point = this.state.point;
            point[value.id] = value.val;
            this.setState({ point });
        }
        */
        let measurement: any = this.state.measurement;
        measurement[value.id] = value.val;
        this.setState({ measurement });
    }

    save = () => {
        if (this.state.disabled) {
            this.props.navigation.goBack();
        }
        if (this.props.route.params.continue) {
            let measurement = this.state.measurement
            measurement.points.push(this.state.point);
            this.props.route.params.callback(measurement);

        } else {
            let project = this.state.project;
            let measurement = this.state.measurement
            if (this.state.measurement.type != 'background') {
                measurement.points.push(this.state.point);
            }
            measurement.finished = new Date();
            project.measurements.push(measurement);
            ProjectsKeeper.saveProject(project);
            this.props.route.params.callback(project);
        }
        this.props.navigation.goBack();
    }

    setLocation = (data: any) => {

        if (this.state.measurement.type == 'background') {
            let measurement: any = this.state.measurement;
            measurement = { ...measurement, ...data };
            this.setState({ measurement });
        } else {
            let point: any = this.state.point;
            point = { ...point, ...data };
            this.setState({ point });
        }
    }

    onFile = (file: any) => {
        file = file.assets[0];
        let key = 'l_' + (new Date().getTime());
        DataKeeper.addData('images', key, 'data:' + file.type + ";base64," + file.base64);

        if (this.state.measurement.type == 'background') {
            let measurement: any = this.state.measurement;
            measurement['image'] = key;

            this.setState({
                measurement,
                showPicker: false
            });
        } else {
            let point: any = this.state.point;
            point['image'] = key;

            this.setState({
                point,
                showPicker: false
            });
        }
    }

    onWindowConditionsChange = (id: any, value: any) => {
        let measurement: any = this.state.measurement;
        measurement[id] = value.unique;
        this.setState({ measurement });
    }


}