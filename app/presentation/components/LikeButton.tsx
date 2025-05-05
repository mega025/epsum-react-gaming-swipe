import {Image, TouchableOpacity,StyleSheet} from "react-native";
import {AppColors} from "../theme/AppTheme";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

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
        height:hp("4%"),
        width:hp("4%"),
        tintColor:"green",
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
