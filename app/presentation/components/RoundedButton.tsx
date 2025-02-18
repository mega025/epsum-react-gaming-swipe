import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {AppColors} from "../theme/AppTheme";

interface Props {
    text: string,
    onPressFromInterface: () => void,
}

export const RoundedButton = ({text,onPressFromInterface}: Props) => {
    return(

        <TouchableOpacity
            style={styles.formBoton}
            onPress={() => onPressFromInterface()}
        >
            <Text style={styles.formBotonText}>{text}</Text>
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    formBoton:{
        marginTop: "25%",
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        alignSelf: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: AppColors.colorButton,
        width: '45%',
    },
    formBotonText:{
        fontSize: 20,
        alignSelf: 'center',
        color: AppColors.white,
    }
})