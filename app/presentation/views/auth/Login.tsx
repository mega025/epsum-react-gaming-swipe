import React, {useEffect} from "react";
import {Button, ImageBackground, Text, TextInput, View} from "react-native";
import styles from "./StylesAuthViews";
import {CustomTextInput} from "../../components/CustomTextInput";
import {RoundedButton} from "../../components/RoundedButton";
import viewModel from "./ViewModel";
import {Alert, AlertContainer} from 'rn-custom-alert-prompt';
import {PropsStackNavigation} from "../../interfaces/StackNav";
import CustomisableAlert, {closeAlert, showAlert} from "react-native-customisable-alert";
import {useNavigation} from "@react-navigation/native";

export function LoginScreen({navigation = useNavigation(), route}: PropsStackNavigation){

    const{onChangeLogin,login, user, errorMessage} = viewModel.loginViewModel();

    useEffect(() => {
        if(errorMessage !== "")
            Alert.alert('Error!', errorMessage);
    })

    useEffect(() => {
        if (user && user?.token) {
            navigation.replace("UserNavigation")
        }
    })

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../../../../assets/background.png")}
                             style={{width: '100%', height: '100%'}}>
                <AlertContainer />
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