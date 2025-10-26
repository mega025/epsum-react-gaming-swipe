import React from "react";
import { TextInput, KeyboardType, StyleSheet } from "react-native";
import { AppColors } from "../theme/AppTheme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

interface Props {
    keyboardType: KeyboardType;
    secureTextEntry: boolean;
    onPressButtonFromInterface: (text: string) => void;
    value?: string;
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
        fontSize: wp("3.4%"),
        paddingVertical: hp("1%"),
        paddingHorizontal: wp("3%"),
        borderRadius: 15,
        backgroundColor: AppColors.secondaryColor,
        height: hp("4.5%"),
        width: "75%",
        fontFamily: "zen_kaku_regular",
        color: AppColors.white,
    },
});
