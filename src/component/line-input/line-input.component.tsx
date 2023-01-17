import React from "react";
import { StyleSheetProperties, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "./line-input.style";


export interface Props {
    placeHolder: string,
    onTextChange: Function,
    value?: string,
    style?: any,
    isPassword?: boolean,
    id?: string,
    disabled?: boolean
}

interface State {
}

export class LineInput extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={{...styles.buttonContainer, ...this.props.style}}>
                <TextInput 
                    style={styles.input} 
                    defaultValue={this.props.value} 
                    onChangeText={(value) => this.props.onTextChange({id: this.props.id, val: value})}
                    placeholder={this.props.placeHolder}
                    secureTextEntry={this.props.isPassword ? true : false}
                    editable={this.props.disabled ? false : true}
                />           
            </View>
        );
    }
}