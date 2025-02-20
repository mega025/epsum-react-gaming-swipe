import React from "react";
import styles from "./StylesAuthViews";
import {View, Text, ImageBackground} from "react-native";
import {CustomTextInputInline} from "../../components/CustomTextInputInline";
import {CustomTextInput} from "../../components/CustomTextInput";
import {RoundedButton} from "../../components/RoundedButton";
import viewModel from "./ViewModel";

export function RegisterScreen() {

    const {onChangeRegister, register, errorMessage} =viewModel.registerViewModel()

    return(
        <View style={styles.container}>
            <ImageBackground source={require("../../../../assets/background.png")}
                             style={{width: '100%', height: '100%'}}>
                <View style={styles.formContainer}>
                    <Text style={styles.titleRegister}>Create an account</Text>

                    <View style={styles.formInlineInputsContainer}>
                        <CustomTextInputInline label={"Name"}
                                         keyboardType={"default"}
                                         secureTextEntry={false}
                                         onChangeText={(text) => onChangeRegister("firstName", text)}></CustomTextInputInline>

                        <CustomTextInputInline label={"Last name"}
                                         keyboardType={"default"}
                                         secureTextEntry={false}
                                         onChangeText={(text) => onChangeRegister("lastName", text)}></CustomTextInputInline>
                    </View>
                    <View style={styles.formInputContainer}>
                        <CustomTextInput label={"Email"}
                                         keyboardType={"default"}
                                         secureTextEntry={false}
                                         onChangeText={(text) => onChangeRegister("email", text)}></CustomTextInput>
                    </View>
                    <View style={styles.formInputContainer}>
                        <CustomTextInput label={"Password"}
                                         keyboardType={"default"}
                                         secureTextEntry={true}
                                         onChangeText={(text) => onChangeRegister("password", text)}></CustomTextInput>
                    </View>
                    <View style={styles.formInputContainer}>
                        <CustomTextInput label={"Confirm password"}
                                         keyboardType={"default"}
                                         secureTextEntry={true}
                                         onChangeText={(text) => onChangeRegister("confirmPassword", text)}></CustomTextInput>
                    </View>
                    <View style={styles.formButtonContainer}>
                        <RoundedButton text={"Sign Up"} onPressFromInterface={() => register()}/>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )

}