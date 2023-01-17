import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { colors } from '../../style/app.style';
import { IconProp } from '@fortawesome/fontawesome-svg-core';


export interface Props {
    id: string,
    question?: string
    options: Array<{ [key: string]: any }>,
    onChange: Function,
    selectedValue?: any,
    icon?: IconProp,
    showBackground?: boolean
}

interface State {
    selectedValue: number
}

const selectedIcon = '';
const unselectedIcon = '';
const iconColor: string = '';

export class SelectQuestion extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            selectedValue: this.props.selectedValue ? this.props.selectedValue : false
        };
    }

    render() {
        return (
            <View style={{...styles.container, ...{backgroundColor: this.props.showBackground ? '#00000010' : '#00000000'}}}>
                <View style={styles.horizontalQuestion}>
                    {
                        this.props.question != null ?
                            <View style={styles.horizontalQuestionTextContainer}>
                                {
                                    this.props.icon != undefined ?
                                        <View style={styles.answerIconContainer}>
                                            <FontAwesomeIcon style={styles.icon} icon={this.props.icon} size={32} />
                                        </View>
                                        : <></>
                                }
                                <Text style={styles.horizontalQuestionText}>{this.props.question}</Text>
                            </View> : <></>
                    }
                    <View style={styles.horizontalAnswerAreaContainer}>
                        {
                            this.props.options.map((value, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => this.setValue(value.id)} delayPressIn={0}>
                                        <View style={styles.answer}>
                                            <Text style={styles.answerText}>{value.text}</Text>
                                            <View style={styles.answerIconContainer}>
                                                {
                                                    this.state.selectedValue === value.id ?
                                                        <FontAwesomeIcon style={{ ...{ color: '#00963e' }, ...styles.answerIcon }} icon={faCheckCircle} size={30} />
                                                        :
                                                        <FontAwesomeIcon style={{ ...{ color: '#E5E5E5' }, ...styles.answerIcon }} icon={faCheckCircle} size={30} />
                                                }
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>

                </View>
            </View>
        );
    }

    setValue = (value: number) => {
        this.setState({
            selectedValue: value
        });
        let data = {
            unique: value
        };
        this.props.onChange(this.props.id, data);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 10,
        flexDirection: 'column',
        padding: 10,
        width: '100%',
        height: '100%',
        marginVertical: 6,
        borderRadius: 5
    },
    horizontalQuestion: {
        flex: 11,
        flexDirection: 'column',
        width: '100%'
    },
    horizontalQuestionTextContainer: {
        flex: 4,
        flexDirection: 'row',
        marginBottom: 10
    },
    horizontalQuestionText: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 5,
        paddingTop: 5,
        color: colors.secondary,
        fontSize: 16,
        fontWeight: '500'
    },
    horizontalAnswerAreaContainer: {
        flex: 7,
        flexDirection: 'column',
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
    answerIconContainer: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        color: '#838383'
    },
    answerIcon: {
      alignSelf: 'flex-end'
    }
});