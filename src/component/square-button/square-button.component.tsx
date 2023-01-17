import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheetProperties, Text, TouchableOpacity, View } from "react-native";
import { color } from "react-native-reanimated";
import { styles } from "./square-button.style";


export interface Props {
    text: string,
    onPress: Function,
    style?: any,
    icon?: IconProp,
    buttonColor?: string
}

interface State {
}

export class NoiseTechSquareButton extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={{...styles.buttonContainer, ...this.props.style}}>
                <TouchableOpacity delayPressIn={0} style={{...styles.button, ...{backgroundColor: this.props.buttonColor != undefined ? this.props.buttonColor : styles.button.backgroundColor}}} onPress={() => { this.props.onPress() }}>
                    {
                        this.props.icon ? 
                            <FontAwesomeIcon style={styles.icon } icon={this.props.icon} size={40}></FontAwesomeIcon>
                        :
                        <Text style={styles.buttonText}>{this.props.text}</Text>
                    }
                </TouchableOpacity>
            </View>
        );
    }
}