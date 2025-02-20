import {StyleSheet} from "react-native";
import {AppColors} from "../../theme/AppTheme";

const styleFab = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: "center",
    },
    logo:{
        width:50,
        height:50,
        top:10,
    },
    appName: {
        fontSize:16,
        top:23,
        fontFamily:"zen_kaku_light",
        color:AppColors.white,
    },
    header: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop:50,
    },
    title:{
        fontSize:30,
        alignSelf:"center",
        top:50,
        color:AppColors.white,
        fontFamily:"zen_kaku_light"
    }
})

export default styleFab;