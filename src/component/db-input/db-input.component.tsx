import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheetProperties, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "./db-input.style";


export interface Props {
    placeHolder?: string,
    onChange: Function,
    onEndEditing?: Function,
    value?: string,
    leftText?: string,
    rightText?: string,
    title?: string,
    id?: string,
    disabled?: boolean,
    showImagePicker?: boolean,
    onImagePickerPressed?: Function
}

interface State {
}

export class DbInput extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={this.props.title != undefined ? styles.doubleContainer : styles.container}>
                <View style={styles.inputGroup}>
                    {
                        this.props.title != undefined || this.props.showImagePicker != undefined ?
                        <View style={styles.top}>
                            {
                                this.props.title != undefined ?
                                <Text style={styles.text}>{this.props.title}</Text>
                                : <></>
                            }
                            {
                                this.props.showImagePicker != undefined ?
                                <TouchableOpacity onPress={this.onPress} style={styles.cameraIcon}>
                                    <FontAwesomeIcon icon={faCamera} size={35} color="#ffffff"></FontAwesomeIcon>
                                </TouchableOpacity>
                                : <></>
                            }
                        </View>
                        : <></>
                    }
                    <View style={styles.bottom}>
                        <View style={styles.left}>
                            <Text style={styles.text}>{this.props.leftText}</Text>
                        </View>
                        <View style={styles.center}>
                            <TextInput
                                style={{...styles.input, ...{backgroundColor: this.props.disabled ? '#c3c3c3' : '#ffffff', textAlign: 'center'}}}
                                defaultValue={this.props.value}
                                onChangeText={(value) => this.props.onChange({id: this.props.id, val: value.replace(/,/g, '.')})}
                                placeholder={this.props.placeHolder}
                                keyboardType={'decimal-pad'}
                                editable={this.props.disabled ? !this.props.disabled : true}
                                onEndEditing={(value) => {
                                    if (this.props.onEndEditing != undefined) {
                                        this.props.onEndEditing();
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.text}>{this.props.rightText}</Text>
                        </View>

                    </View>
                </View>


            </View>
        );
    }

    onPress = () => {
        if (this.props.onImagePickerPressed != undefined && this.props.showImagePicker == true) {
            this.props.onImagePickerPressed(this.props.id);
        }
    }
}