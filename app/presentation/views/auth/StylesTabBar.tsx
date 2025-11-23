import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {AppColors} from "../../theme/AppTheme"; // Para usar % de la pantalla

const stylesTabBar = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 200,
        width: "100%",
    },

    logoImage: {
        width: wp("9%"),
        height: wp("9%"),
        marginTop: 5,
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
        marginTop: 4,
        fontFamily: 'zen_kaku_regular',
        elevation: 0,
    },

    textLabels: {
        color: AppColors.green,
        fontSize: wp("3%"),
        fontWeight: "bold",
    },

    favScreenTabLabels: {
        backgroundColor: "rgba(215, 20, 20, 0)",
        width: wp("70%"),
        alignSelf: "center",
        marginTop: 4,
        fontFamily: 'zen_kaku_regular',
        elevation: 0,
    }
});

export default stylesTabBar;
