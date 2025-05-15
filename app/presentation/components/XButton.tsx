import {Image, TouchableOpacity,StyleSheet} from "react-native";
import {AppColors} from "../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


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
        height:hp("3%"),
        width:hp("3%"),
        tintColor:"red",
    },
    cont:{
        backgroundColor:AppColors.darkPurple,
        borderRadius:40,
        height:hp("8%"),
        width:hp("8%"),
        alignItems:"center",
        justifyContent:"center"
    }
});
