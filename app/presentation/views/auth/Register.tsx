import React, {useEffect} from "react";
import styles from "./StylesAuthViews";
import {View, Text, ImageBackground, SafeAreaView} from "react-native";
import {CustomTextInputInline} from "../../components/CustomTextInputInline";
import {CustomTextInput} from "../../components/CustomTextInput";
import {RoundedButton} from "../../components/RoundedButton";
import viewModel from "./ViewModel";
import {Alert, AlertContainer} from "rn-custom-alert-prompt";
import Toast from "react-native-toast-message";
import {CustomTextInputPassword} from "../../components/CustomTextInputPassword";

export function RegisterScreen() {

    const {onChangeRegister, register, errorMessage, setErrorMessage} =viewModel.registerViewModel()

    useEffect(() => {
        if(errorMessage !== "") {
            Toast.show({
                type: 'error',
                text1: errorMessage,
            });
        }
        setErrorMessage("");
    }, [errorMessage])

    return(
            <SafeAreaView style={styles.container}>
                <ImageBackground source={require("../../../../assets/background.png")}
                                 style={{width: '100%', height: '100%'}}>
                    <View style={styles.formContainer}>
                        <Text style={styles.titleRegister}>Create an account</Text>

                        <View style={styles.formInlineInputsContainer}>
                            <CustomTextInputInline label={"Name"}
                                             keyboardType={"default"}
                                             secureTextEntry={false}
                                             onChangeText={(text) => onChangeRegister("name", text)}/>

                            <CustomTextInputInline label={"Last name"}
                                             keyboardType={"default"}
                                             secureTextEntry={false}
                                             onChangeText={(text) => onChangeRegister("lastName", text)}/>
                        </View>
                        <View style={styles.formInputContainer}>
                            <CustomTextInput label={"Email"}
                                             keyboardType={"default"}
                                             secureTextEntry={false}
                                             onChangeText={(text) => onChangeRegister("email", text)}/>
                        </View>
                        <View style={styles.formInputContainer}>
                            <CustomTextInputPassword label={"Password"}
                                             keyboardType={"default"}
                                             onChangeText={(text) => onChangeRegister("password", text)}/>
                            <Text style={styles.passwordHint}>Password must have at least 8 characters</Text>
                        </View>
                        <View style={styles.formInputContainer}>
                            <CustomTextInputPassword label={"Confirm password"}
                                             keyboardType={"default"}
                                             onChangeText={(text) => onChangeRegister("confirmPassword", text)}/>
                        </View>
                        <View style={styles.formButtonContainer}>
                            <RoundedButton text={"Sign Up"} onPressFromInterface={() => register()}/>
                        </View>
                    </View>
                    <Toast/>
                </ImageBackground>
            </SafeAreaView>
    )
}