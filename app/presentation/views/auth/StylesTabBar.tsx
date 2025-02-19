import {StyleSheet} from 'react-native';

const stylesTabBar = StyleSheet.create({
    container:{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width:"100%",
        paddingTop:10,
        paddingBottom:10,
    },

    logoImage: {
        width: 40,
        height: 40,
    },

    logoText: {
        color: "white",
        fontSize: 16,
        marginTop: 7,
        marginEnd: 20,
        marginStart: 6,
        fontFamily: 'zen_kaku_regular',
    },

    tabLabels: {
        backgroundColor: "rgba(215,20,20,0)",
        width: 200,
        alignSelf: "flex-end",
        fontFamily: 'zen_kaku_regular',
        elevation: 0
    }
})

export default stylesTabBar;