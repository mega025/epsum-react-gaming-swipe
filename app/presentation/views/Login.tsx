import React from "react";
import {Image, Text, TextInput, View} from "react-native";
import styles from "./StylesLogin";
import {TextImput} from "../components/TextInput";
import {RoundedButton} from "../components/RoundedButton";

export function LoginScreen(){
    return (
        <View style={styles.Container}>
            <View>
                <Image></Image>
                <Text > GamingSwipe</Text>
            </View>
            <View>
                <Text style={styles.TextWelcome}> Welcome Back</Text>
                <Text style={styles.TextInput}>Email</Text>
                <TextImput placeholder={"Email"} keyboardType={"email-address"} secureTextEntry={false}
                           onPressButtonFromInterface={text => text}></TextImput>

                <Text style={styles.TextInput}>Password</Text>
                <TextImput placeholder={"Email"} keyboardType={"email-address"} secureTextEntry={true}
                           onPressButtonFromInterface={text => text}></TextImput>
            </View>

            <RoundedButton text={"Sing in"} onPressFromInterface={alert}></RoundedButton>
        </View>





    );

}