import { faAngleLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationOptions, StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { Menu } from "../menu/menu.component";
import { styles } from "./header.style";


export interface Props {
    navigation: StackNavigationProp<ParamListBase, string, undefined>,
    options: StackNavigationOptions
}

interface State {
    showMenu: boolean
}

export class NoiseTechHeaderComponent extends React.Component<Props, State> {

    logo = require('./../../assets/images/noisetech_white.png');

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.headerContainer}>
                <ImageBackground source={this.logo} style={styles.imageContainer} imageStyle={styles.imageBackground}>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity delayPressIn={0} style={styles.backButton} onPress={this.props.navigation.goBack}>
                            <FontAwesomeIcon icon={faAngleLeft} size={30} style={styles.menuIcon} />
                        </TouchableOpacity>
                        <View style={styles.rightButtonsContainer}>
                        {
                            
                            this.props.options.headerRight ? this.props.options.headerRight : <></>
                        }
                        <TouchableOpacity delayPressIn={0} style={styles.menuButton} onPress={() => {this.props.navigation.navigate('Menu')}}>
                            <FontAwesomeIcon icon={faBars} size={30} style={styles.menuIcon} />
                        </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                
            </View>
        );
    }

}