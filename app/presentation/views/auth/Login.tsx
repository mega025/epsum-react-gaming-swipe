import React from "react";
import { ImageBackground, Text, TextInput, View} from "react-native";
import styles from "./StylesAuthViews";
import {CustomTextInput} from "../../components/CustomTextInput";
import {RoundedButton} from "../../components/RoundedButton";
import viewModel from "./ViewModel";
import {useFonts} from "expo-font";


export function LoginScreen(){

    const{onChangeLogin,login} = viewModel.loginViewModel();

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../../../../assets/background.png")}
                             style={{width: '100%', height: '100%'}}>
                <View style={styles.formContainer}>
                    <Text style={styles.titleLogin}>Welcome Back</Text>

                    <View style={styles.formInputContainer}>
                        <CustomTextInput label={"Email"}
                                         keyboardType={"default"}
                                         secureTextEntry={false}
                                         onChangeText={(text) => onChangeLogin('email', text)}></CustomTextInput>
                    </View>

                    <View style={styles.formInputContainer}>
                        <CustomTextInput label={"Password"}
                                         keyboardType={"default"}
                                         secureTextEntry={true}
                                         onChangeText={(text) => onChangeLogin('password', text)}></CustomTextInput>
                    </View>

                </View>
                <View style={styles.formButtonContainer}>
                    <RoundedButton text="Sign in" onPressFromInterface={() => login()} />
                </View>
            </ImageBackground>
        </View>
    );
}