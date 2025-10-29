import {Image, TouchableOpacity,StyleSheet} from "react-native";
import {AppColors} from "../theme/AppTheme";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {Shadow} from "react-native-shadow-2";

interface Props {
    onPress: () => void;
}

export const LikeButton=({onPress}: Props)=>{
    return (
        <Shadow startColor={"rgba(4,121,255,0.10)"}>
            <TouchableOpacity style={stylesLikeButton.cont} onPress={onPress}>
                <Image source={require("../../../assets/x.png")} style={stylesLikeButton.likeButton}></Image>
            </TouchableOpacity>
        </Shadow>
    )
}

export const stylesLikeButton = StyleSheet.create({
    likeButton:{
        height:hp("2.5%"),
        width:hp("2.5%"),
        tintColor:AppColors.like,
    },
    cont:{
        backgroundColor:AppColors.buttonBackground,
        borderRadius:40,
        height:hp("7%"),
        width:hp("7%"),
        alignItems:"center",
        justifyContent:"center"
    }
});
