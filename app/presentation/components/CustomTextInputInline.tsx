import React from "react";
import {KeyboardType, StyleSheet, TextInput, View, Text} from "react-native";

interface Props {
    label: string,
    keyboardType:KeyboardType;
    secureTextEntry: boolean
    maxLenght: number
    onChangeText: (text: string) => void;
}

export const CustomTextInputInline = ({label, maxLenght, keyboardType,secureTextEntry, onChangeText}: Props) => {
    return (
        <View>
            <Text style={styles.formInputLabel}>{label}</Text>
            <TextInput style={styles.formInputInline}
                    keyboardType={keyboardType}
                    maxLength={maxLenght}
                    secureTextEntry={secureTextEntry}
                    onChangeText={(text) => onChangeText(text)}
            ></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    formInputLabel: {
        fontSize:15,
        color:'white',
        marginStart: 5,
        alignSelf:"flex-start",
        marginBottom:10,
        fontFamily: "zen_kaku_regular"
    },

    formInputInline: {
        width: 147,
        height: 38,
        fontSize:15,
        borderColor: '#000000',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontFamily: "zen_kaku_regular"
    },

})