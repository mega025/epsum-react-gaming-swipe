import {StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


const styleGameDetails = StyleSheet.create({
    image: {
        width: wp("40%"),
        height: hp("25%"),
        marginTop: hp("10%"),
        marginStart: wp("5%"),
    }
})

export default styleGameDetails;