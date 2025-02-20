import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {AppColors} from "../theme/AppTheme";

interface Props {
    text: string,
    onPressFromInterface: () => void,
}

export const RoundedButtonAccount = ({text,onPressFromInterface}: Props) => {
    return(

        <TouchableOpacity
            style={styles.formButton}
            onPress={() => onPressFromInterface()}
        >
            <Text style={styles.formButtonText}>{text}</Text>
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    formButton:{
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        alignSelf: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: AppColors.colorButton,
        width: '45%',
    },
    formButtonText:{
        fontSize: 20,
        alignSelf: 'center',
        color: AppColors.white,
    }
})