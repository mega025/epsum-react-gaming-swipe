import {Image, TouchableOpacity,StyleSheet} from "react-native";
import {AppColors} from "../theme/AppTheme";

interface Props {
    onPress: () => void;
}

export const LikeButton=({onPress}: Props)=>{
    return (
        <TouchableOpacity style={styles.cont} onPress={onPress}>
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
        left:35,
        bottom:30,
        borderRadius:40,
        marginLeft: 50,
        height:70,
        width:70,
        alignItems:"center",
        justifyContent:"center"
    }
});
