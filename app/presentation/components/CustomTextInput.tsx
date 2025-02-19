import React from "react";
import {KeyboardType, StyleSheet, TextInput} from "react-native";

interface Props {
keyboardType:KeyboardType;
secureTextEntry:boolean;
onPressButtonFromInterface:(text:string)=>void;
}
export const CustomTextInput = ({keyboardType,secureTextEntry,onPressButtonFromInterface}:Props) => {
    return (
        <TextInput style={styles.formInput}
                   keyboardType={keyboardType}
                   secureTextEntry={secureTextEntry}
                   onChangeText={(text) => onPressButtonFromInterface(text)}
        ></TextInput>)

            }
const styles = StyleSheet.create({
    formInput: {
        fontSize: 15,
        marginBottom: 10,
        borderColor: 'black',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius:10,
        backgroundColor: 'white',
        height:40,

    }
})

