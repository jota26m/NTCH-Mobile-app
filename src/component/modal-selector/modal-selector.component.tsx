import { faCamera, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, StyleSheet, Modal, Text, Alert, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../style/app.style";
import { NoiseTechButton } from "../button/button.component";
import { SelectQuestion } from "../select-input/select.question.component";


export interface Props {
    text: string,
    acceptText: string,
    onAccept: Function,
    title: string,
    options: any,
    selectedValue?: number,
    disabled?: boolean,
    showImagePicker?: boolean,
    onImagePickerPressed?: Function,
    id?: string
}

interface State {
    show: boolean,
    value: any
}

export class ModalSelector extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            show: false,
            value: this.props.selectedValue ? this.props.options.find((opt: any) => opt.id == this.props.selectedValue) : null
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.manageOpen} delayPressIn={0}>
                    <View style={modalStyles.answer}>
                        <Text style={modalStyles.answerText}>{this.state.value ? this.state.value.text : this.props.text}</Text>
                        {
                                this.props.showImagePicker != undefined ?
                                <TouchableOpacity onPress={this.onPress} style={modalStyles.cameraIcon}>
                                    <FontAwesomeIcon icon={faCamera} size={35} color={colors.secondary}></FontAwesomeIcon>
                                </TouchableOpacity>
                                : <></>
                            }
                    </View>
                </TouchableOpacity>
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
                                <TouchableOpacity style={modalStyles.closeContainer} onPress={()=> {this.setState({show: false})}}>
                                    <FontAwesomeIcon style={modalStyles.close} icon={faTimesCircle}></FontAwesomeIcon>
                                </TouchableOpacity>
                                <View style={modalStyles.titleContainer}>
                                    <Text style={modalStyles.titleText}>{this.props.title}</Text>
                                </View>
                                <ScrollView style={modalStyles.termsTextContainer}>
                                    <SelectQuestion id="options" options={this.props.options} onChange={this.setValue} selectedValue={this.state.value}></SelectQuestion>
                                </ScrollView>
                                <View style={modalStyles.buttonContainer}>
                                    <NoiseTechButton text={this.props.acceptText} onPress={this.accept} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>

        );
    }

    setValue = (id: any, value: any) => {
        this.setState({value: this.props.options.find((opt : any) => opt.id == value.unique)});
    }

    accept = () => {
        this.setState({show: false});
        this.props.onAccept(this.state.value);
    }

    manageOpen = () => {
        if (this.props.disabled != true) {
            this.setState({ show: true });
        }
    }

    onPress = () => {
        if (this.props.onImagePickerPressed != undefined && this.props.showImagePicker == true) {
            this.props.onImagePickerPressed(this.props.id);
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
    buttonContainer: {
        height: 80,
    },
    answer: {
        flexDirection: 'row',
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 5
    },
    answerText: {
        flex: 6,
        textAlign: 'justify',
        alignSelf: 'center'
    },
    closeContainer: {
        alignSelf: 'flex-end'

    },
    close: {
        color: '#707070',
    },
    cameraIcon: {
        position: 'absolute',
        right: 10,
        marginVertical: 5
    }
}
);