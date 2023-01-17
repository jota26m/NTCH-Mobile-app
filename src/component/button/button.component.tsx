import React from "react";
import { StyleSheetProperties, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./button.style";


export interface Props {
    text: string,
    onPress: Function,
    style?: any,
    disabled?: boolean
}

interface State {
}

export class NoiseTechButton extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity delayPressIn={0} style={{...styles.button, ...this.props.style}} onPress={() => { this.props.onPress() }} disabled={this.props.disabled == true}>
                    <Text style={styles.buttonText}>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}