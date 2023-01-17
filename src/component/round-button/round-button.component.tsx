import React from "react";
import { StyleSheetProperties, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./round-button.style";


export interface Props {
    text: string,
    onPress: Function,
    style?: any
}

interface State {
}

export class NoiseTechRoundButton extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={{...styles.buttonContainer, ...this.props.style}}>
                <TouchableOpacity delayPressIn={0} style={styles.button} onPress={() => { this.props.onPress() }}>
                    <Text style={styles.buttonText}>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}