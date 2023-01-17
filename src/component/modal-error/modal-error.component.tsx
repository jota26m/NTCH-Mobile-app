import React, { useRef } from "react";
import { View, StyleSheet, Modal, Text, Alert, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../style/app.style";
import { NoiseTechButton } from "../button/button.component";
import { SelectQuestion } from "../select-input/select.question.component";


export interface Props {
    rules: any

}

interface State {
    show: boolean,
    value: any,
    errors: any
}

export class ModalError extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            show: false,
            value: null,
            errors: []
        };
    }

    render() {
        return (
            <View style={modalStyles.background}>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.show}
                    onRequestClose={() => {

                    }}
                >
                    <View style={modalStyles.container}>
                        <View style={modalStyles.realContainer}>
                            <View style={modalStyles.titleContainer}>
                                <Text style={modalStyles.titleText}>Atención</Text>
                            </View>
                            <ScrollView style={modalStyles.errorsContainer}>
                                {
                                    this.state.errors.map((error: any, index: any) => {
                                        return (<Text style={modalStyles.errorText} key={index}>{index + 1}. {error}</Text>)
                                    })
                                }
                            </ScrollView>
                            <View style={modalStyles.buttonContainer}>
                                <NoiseTechButton text='Aceptar' onPress={this.accept} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }


    accept = () => {
        this.setState({ show: false });
    }

    validate(data: any) {
        let errors: any = [];
        Object.keys(this.props.rules).map((key: string) => {
            if (this.props.rules[key] != undefined) {
                if (this.props.rules[key].required && (data[key] == undefined || data[key] == '')) {
                    errors.push(this.props.rules[key].requiredText);
                }
                if (this.props.rules[key].type == 'number' && data[key] != undefined && data[key] != '' && isNaN(Number(data[key]))) {
                    errors.push(this.props.rules[key].typeText);
                }
            }
        })
        if (errors.length == 0) {
            return true;
        } else {
            this.setState({show: true, errors});
        }
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
        backgroundColor: '#00000033'
    },
    realContainer: {
        backgroundColor: '#ffffff',
        flex: 1,
        borderRadius: 15,
        padding: 10,
        marginVertical: 100
    },
    titleContainer: {
        height: 40,
        marginVertical: 10,
        alignContent: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontWeight: '200',
        fontSize: 18,
        textAlign: 'center'
    },
    errorsContainer: {
        height: '100%',
        marginBottom: 10,
        marginHorizontal: 15
    },
    buttonContainer: {
        minHeight: 80,
    },
    errorText: {
    }
}
);