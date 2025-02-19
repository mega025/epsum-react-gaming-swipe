import React from "react";
import { ImageBackground, Text, TextInput, View} from "react-native";
import styles from "./StylesAuthViews";
import {CustomTextInput} from "../components/CustomTextInput";
import {RoundedButton} from "../components/RoundedButton";
import viewModel from "./ViewModel";


export function LoginScreen(){
    const{OnChange,Login} = viewModel.loginViewModel();
    return (
        <View style={styles.container}>
            <ImageBackground source={require("../../../assets/background.png")}
                             style={{width: '100%', height: '100%'}}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Welcome Back</Text>

                    <Text style={styles.labelEmail}>Email</Text>
                    <CustomTextInput keyboardType={"default"}
                                     secureTextEntry={false}
                                     onPressButtonFromInterface={(text) => OnChange('password', text)}></CustomTextInput>


                    <Text style={styles.labelPassword}>Password</Text>
                    <CustomTextInput keyboardType={"default"}
                                     secureTextEntry={true}
                                     onPressButtonFromInterface={(text) => OnChange('password', text)}></CustomTextInput>
                </View>

                <RoundedButton text="Sign in" onPressFromInterface={() => Login()} />
            </ImageBackground>
        </View>

    );

}