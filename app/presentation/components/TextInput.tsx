import React from "react";
import {KeyboardType, StyleSheet, TextInput} from "react-native";

interface Props {
placeholder:string;
keyboardType:KeyboardType;
secureTextEntry:boolean;
onPressButtonFromInterface:(text:string)=>void;
}
export const TextImput = ({placeholder,keyboardType,secureTextEntry,onPressButtonFromInterface}:Props) => {
    return (
        <TextInput style={styles.formInput}
                   placeholder={placeholder}
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
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius:10,
        backgroundColor: 'white',
        width:'70%',
        marginLeft:"auto",
        marginRight:"auto",
    }
})

