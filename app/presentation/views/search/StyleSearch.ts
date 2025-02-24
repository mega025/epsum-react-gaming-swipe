import {StyleSheet} from "react-native";
import {AppColors} from "../../theme/AppTheme";

const styleSearch = StyleSheet.create({
    logo:{
        width:50,
        height:50,
        top:10,
    },
    container: {
        flex: 1,
        alignItems: "center",
    },
    appName: {
        fontSize:16,
        top:23,
        color:AppColors.white,
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
        top:25,
        color:AppColors.white,
        fontFamily:"zen_kaku_light"

    },
    containerSearchInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: "center",
        top:70,
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 10,
        bottom:5,
        tintColor:"grey",
    },
    containerGames:{
        marginTop:30
    },
    item: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        alignItems: "center",
    },
    cover: {
        width: 60,
        height: 80,
        borderRadius: 5,
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    genre: {
        fontSize: 14,
        color: "#666",
    },
    rating: {
        fontSize: 14,
        color: "#ff9900",
    },

})

export default styleSearch;