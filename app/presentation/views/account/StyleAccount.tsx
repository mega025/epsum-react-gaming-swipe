import {StyleSheet} from "react-native";
import {AppColors} from "../../theme/AppTheme";


const styleAccount = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    logo: {
        width: 50,
        height: 50,
        top: 10,


    },

    appName: {
        fontSize: 16,
        top: 23,
        fontFamily: "",
        color: AppColors.white,
    },
    header: {
        flexDirection: "row",
        alignSelf: "center",
        top:10,
    },
    title:{
        fontSize:30,
        alignSelf:"center",
        top:50,
        color:AppColors.white,
    },
    containerEmail:{
        alignSelf:"center",
        top:100,

    },
    textEmail:{
        fontSize:18,
        color:AppColors.white,
    },
    containerPhoto:{
        alignItems:"center",
        top:130,
    },
    photo:{
        width:60,
        height:60,
    }
})
    export default styleAccount;