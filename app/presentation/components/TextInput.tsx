import React from "react";
import {KeyboardType, StyleSheet, TextInput} from "react-native";

interface Props {
keyboardType:KeyboardType;
secureTextEntry:boolean;
onPressButtonFromInterface:(text:string)=>void;
}
export const TextImput = ({keyboardType,secureTextEntry,onPressButtonFromInterface}:Props) => {
    return (
        <TextInput style={styles.formInput}
                   keyboardType={keyboardType}
                   secureTextEntry={secureTextEntry}
                   onChangeText={(text) => onPressButtonFromInterface(text)}
        ></TextInput>)

            }
const styles = StyleSheet.create({
    formInput: {
        fontSize: 17,
        marginBottom: 10,
        borderColor: 'black',
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius:10,
        backgroundColor: 'white',
        height:'8%',

    }
})

