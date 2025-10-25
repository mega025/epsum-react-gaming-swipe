import {Image, TouchableOpacity,StyleSheet} from "react-native";
import {AppColors} from "../theme/AppTheme";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {Shadow} from "react-native-shadow-2";

interface Props {
    onPress: () => void;
}

export const LikeButton=({onPress}: Props)=>{
    return (
        <Shadow startColor={"rgba(4,255,25,0.05)"}>
            <TouchableOpacity style={styles.cont} onPress={onPress}>
                <Image source={require("../../../assets/heart.png")} style={styles.HeartButton}></Image>
            </TouchableOpacity>
        </Shadow>
    )
}

const styles = StyleSheet.create({
    HeartButton:{
        height:hp("3%"),
        width:hp("3%"),
        tintColor:"green",
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
