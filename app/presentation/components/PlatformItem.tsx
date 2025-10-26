import {Dimensions, Text, View} from "react-native";
import {Platform} from "../../domain/entities/Game";
import {StyleSheet} from "react-native";
import {AppColors} from "../theme/AppTheme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";


export const PlatformItem = ({item}: {item: Platform}) => {
    return (
        <View style={styles.container}>
                <Text style={styles.abbreviation}>{item.abbreviation ? item.abbreviation : item.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.thirdColor,
        borderRadius: 15,
        padding: 7,
        alignSelf:'baseline',
        alignItems: "center",
        marginEnd: wp("1%"),
    },

    abbreviation: {
        fontSize: wp("3%"),
        fontFamily: "zen_kaku_regular",
        verticalAlign: "middle",
        color: AppColors.white,
    }
})