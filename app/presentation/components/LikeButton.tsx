import {Image, TouchableOpacity,StyleSheet} from "react-native";
import {AppColors} from "../theme/AppTheme";

export const LikeButton=()=>{
    return (
        <TouchableOpacity style={styles.cont}>
            <Image source={require("../../../assets/heart.png")} style={styles.HeartButton}></Image>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    HeartButton:{
        height:32,
        width:32,
        tintColor:"green",
    },
    cont:{
        backgroundColor:AppColors.colorButton,
        position:"absolute",
        right:35,
        bottom:30,
        borderRadius:40,
        height:70,
        width:70,
        alignItems:"center",
        justifyContent:"center"
    }
});
