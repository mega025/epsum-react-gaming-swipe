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
        color: AppColors.white,
        fontFamily:"zen_kaku_light"

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
    },
    containerEmail:{
        alignSelf:"center",
        top:80,

    },
    textEmail:{
        fontSize:18,
        color:AppColors.white,
        fontFamily:"zen_kaku_regular"

    },
    containerPhoto:{
        alignItems:"center",
        top:100,
    },

    containerEditName:{
        flexDirection: "row",
    },
    containerName:{
        marginTop:290
    },
    labelName:{
        marginLeft:40,
        fontSize:20,
        color:AppColors.white,
        fontFamily:"zen_kaku_regular"

    },
    Name:{
        fontSize:24,
        marginLeft:40,
        color:AppColors.white,
        fontFamily:"zen_kaku_regular"

    },
    Edit:{
        width:40,
        height:40,
        alignSelf:"flex-end",
        left:300,
        bottom:10,
        tintColor:AppColors.white,
    },
    containerLastName:{
        marginTop:40,
    },
    labelLastName:{
        marginLeft:40,
        fontSize:20,
        color:AppColors.white,
        fontFamily:"zen_kaku_regular"

    },
    LastName:{
        fontSize:24,
        marginLeft:40,
        color:AppColors.white,
        fontFamily:"zen_kaku_regular"

    },
    containerResetPassword:{
        alignItems:"center",
        justifyContent:"center",
        marginTop:100,
    },
    TextResetPassword:{
        fontSize:18,
        color:AppColors.white,
        textDecorationLine:"underline",
    },
    containerLogOut:{
        alignItems:"center",
        marginTop:100,
    },
    LogOut:{
        fontSize:28,
        color:AppColors.red,
        fontFamily:"zen_kaku_regular",
        fontWeight:"bold",
    }




})
    export default styleAccount;