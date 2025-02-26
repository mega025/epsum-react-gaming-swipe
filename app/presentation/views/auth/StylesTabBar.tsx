import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"; // Para usar % de la pantalla

const stylesTabBar = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingTop: hp("1%"),
        paddingBottom: hp("1%"),
    },

    logoImage: {
        width: wp("10%"),
        height: wp("10%"),
    },

    logoText: {
        color: "white",
        fontSize: wp("4%"),
        marginTop: hp("1%"),
        marginRight: wp("5%"),
        marginLeft: wp("2%"),
        fontFamily: 'zen_kaku_regular',
    },

    tabLabels: {
        backgroundColor: "rgba(215, 20, 20, 0)",
        width: wp("40%"),
        alignSelf: "flex-end",
        fontFamily: 'zen_kaku_regular',
        elevation: 0,
    }
});

export default stylesTabBar;
