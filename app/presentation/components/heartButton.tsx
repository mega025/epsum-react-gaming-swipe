import {Image, TouchableOpacity,StyleSheet} from "react-native";
import {AppColors} from "../theme/AppTheme";

export const HeartButton=()=>{
    return (
        <TouchableOpacity style={styles.cont}>
            <Image source={require("../../../assets/heart.png")} style={styles.HeartButton}></Image>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    HeartButton:{
        height:25,
        width:25,
        tintColor:"green",
    },
    cont:{
        backgroundColor:AppColors.colorButton,
        position:"absolute",
        right:35,
        bottom:120,
        borderRadius:40,
        height:60,
        width:60,
        alignItems:"center",
        justifyContent:"center"
    }
});
