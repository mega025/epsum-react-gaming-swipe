import React from "react";
import {Image, ImageBackground, Text, TextInput, View} from "react-native";
import styles from "./StylesLogin";
import {TextImput} from "../../components/TextInput";
import {RoundedButton} from "../../components/RoundedButton";
import viewModel from "./ViewModel";


export function LoginScreen(){




    const{OnChange,Login} = viewModel.loginViewModel();
    return (
        <View style={styles.Container}>
            <ImageBackground source={require("../../../../assets/background.png")}
                             style={{width: '100%', height: '100%'}}>
                <Image></Image>
                <Text>GamingSwipe</Text>

                <View style={styles.View}>
                    <Text style={styles.TextWelcome}>Welcome Back</Text>

                    <Text style={styles.TextEmail}>Email</Text>
                    <TextImput keyboardType={"default"}
                               secureTextEntry={false}
                               onPressButtonFromInterface={(text) =>
                                   OnChange('password', text)}></TextImput>


                    <Text style={styles.TextPassword}>Password</Text>
                    <TextImput keyboardType={"default"}
                               secureTextEntry={true}
                               onPressButtonFromInterface={(text) =>
                                   OnChange('password', text)}></TextImput>
                </View>

                <RoundedButton text="Sign in" onPressFromInterface={() => Login()} />
            </ImageBackground>
        </View>

    );

}