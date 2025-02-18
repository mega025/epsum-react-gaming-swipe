import React from "react";
import {Image, ImageBackground, Text, TextInput, View} from "react-native";
import styles from "./StylesLogin";
import {TextImput} from "../components/TextInput";
import {RoundedButton} from "../components/RoundedButton";
import viewModel from "./ViewModel";

export function LoginScreen(){

    const{OnChange,Login} = viewModel.loginViewModel();
    return (
        <View style={styles.Container}>
            <ImageBackground
                source={require("../assets/background.png")}
                style={{width: '100%', height: '100%'}}
            >
            <View>
                <Image></Image>
                <Text > GamingSwipe</Text>
            </View>
            <View>
                <Text style={styles.TextWelcome}> Welcome Back</Text>
                <Text style={styles.TextInput}>Email</Text>
                <TextImput placeholder={"Email"} keyboardType={"email-address"} secureTextEntry={false}
                           onPressButtonFromInterface={(text) =>
                               OnChange('email', text)}></TextImput>

                <Text style={styles.TextInput}>Password</Text>
                <TextImput placeholder={"Email"} keyboardType={"default"} secureTextEntry={true}
                           onPressButtonFromInterface={(text) =>
                               OnChange('email', text)}></TextImput>
            </View>

            <RoundedButton text={"Sing in"}onPressFromInterface={() => {Login()}}></RoundedButton>
            </ImageBackground>
        </View>





    );

}