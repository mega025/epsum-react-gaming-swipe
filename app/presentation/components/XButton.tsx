import {Image, TouchableOpacity,StyleSheet} from "react-native";
import {AppColors} from "../theme/AppTheme";

interface Props {
    onPress: () => void;
}

export const XButton=({onPress}:Props)=>{
    return (
        <TouchableOpacity style={styles.cont} onPress={onPress}>
            <Image source={require("../../../assets/x.png")} style={styles.addButton}></Image>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addButton:{
        height:25,
        width:25,
        tintColor:"red",
    },
    cont:{
      backgroundColor:AppColors.colorButton,
        position:"absolute",
        left:35,
        bottom:60,
        borderRadius:40,
        height:60,
        width:60,
        alignItems:"center",
        justifyContent:"center"
    }
});
