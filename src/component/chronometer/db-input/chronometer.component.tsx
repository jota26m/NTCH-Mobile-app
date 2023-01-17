import React from "react";
import { StyleSheetProperties, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../../../style/app.style";
import { styles } from "./chronometer.style";


export interface Props {
    onUpdate: Function,
    onFinish: Function,
    style: any,
    disabled?: boolean
}

interface State {
    seconds: number,
    running: boolean,
    time: any
}

export class ChronometerInput extends React.Component<Props, State> {

    interval: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            seconds: 0,
            running: false,
            time: {
                minutes: 0,
                seconds: 0
            }
        };
    }

    render() {
        return (
            <View style={{ ...styles.container, ...this.props.style }}>
                <View style={styles.inputGroup}>
                        <TouchableOpacity style={styles.right} onPress={this.manage} disabled={this.props.disabled == true}>
                            <Text style={styles.text}>{this.state.running ? 'Detener' : 'Iniciar'}</Text>
                        </TouchableOpacity>
                </View>


            </View>
        );
    }

    /*

                        <View style={styles.left}>
                            <Text style={styles.text}>Cronómetro</Text>
                        </View>
                        <View style={styles.center}>
                            <Text style={{...styles.input, ...{backgroundColor: this.props.disabled ? colors.secondary : styles.input.backgroundColor}}}>{(this.state.time.minutes.toString().length == 1 ? '0' : '') + this.state.time.minutes.toString()}:{(this.state.time.seconds.toString().length == 1 ? '0' : '') + this.state.time.seconds.toString()}</Text>
                        </View>
    */

    manage = () => {
        this.setState({running: !this.state.running});
        if (!this.state.running) {
            let scope = this;
            this.interval = setInterval(() => {
                scope.setState({
                    seconds: scope.state.seconds + 1,
                    time: {
                        minutes: Math.trunc((this.state.seconds + 1) / 60),
                        seconds: (this.state.seconds + 1) % 60
                    }
                });
                scope.props.onUpdate(scope.state);
            }, 1000);

        } else {
            this.stop();
        }
    }

    stop() {
        clearInterval(this.interval);
        this.setState({
            seconds: 0,
            time: {
                minutes: 0,
                seconds: 0
            },
            running: false
        });
    }
}