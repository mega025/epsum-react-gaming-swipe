import {Image, TouchableOpacity,StyleSheet} from "react-native";
import {AppColors} from "../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {Shadow} from "react-native-shadow-2";


interface Props {
    onPress: () => void;
}

export const XButton=({onPress}:Props)=>{
    return (
        <Shadow startColor={"rgba(255,4,4,0.08)"}>
            <TouchableOpacity style={styles.cont} onPress={onPress}>
                <Image source={require("../../../assets/x.png")} style={styles.addButton}></Image>
            </TouchableOpacity>
        </Shadow>
    )
}

const styles = StyleSheet.create({
    addButton:{
        height:hp("2%"),
        width:hp("2%"),
        tintColor:"red",
    },
    cont:{
        backgroundColor:AppColors.buttonBackground,
        borderRadius:40,
        height:hp("7%"),
        width:hp("7%"),
        alignItems:"center",
        justifyContent:"center",
        elevation: 20,
        shadowColor: AppColors.blue
    }
});
