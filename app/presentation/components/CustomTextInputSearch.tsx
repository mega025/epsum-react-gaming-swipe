import React from "react";
import { TextInput, KeyboardType, StyleSheet } from "react-native";
import { AppColors } from "../theme/AppTheme";

interface Props {
    keyboardType: KeyboardType;
    secureTextEntry: boolean;
    onPressButtonFromInterface: (text: string) => void;
    value: string;
}

export const CustomTextInputSearch = ({keyboardType, secureTextEntry, onPressButtonFromInterface, value}: Props) => {
    return (
        <TextInput
            style={styles.formInput}
            keyboardType={keyboardType}
            placeholder={"Type here..."}
            placeholderTextColor={AppColors.white}
            secureTextEntry={secureTextEntry}
            onChangeText={(text) => onPressButtonFromInterface(text)}
            value={value}
        />
    );
};

const styles = StyleSheet.create({
    formInput: {
        fontSize: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: AppColors.white,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: AppColors.colorNavigationButton,
        height: 45,
        width: "75%",
        fontFamily: "zen_kaku_regular",
        color: AppColors.white,
    },
});
