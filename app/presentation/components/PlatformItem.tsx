import {Dimensions, Text, View} from "react-native";
import {Platform} from "../../domain/entities/Game";
import {StyleSheet} from "react-native";
import {AppColors} from "../theme/AppTheme";

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
        elevation:30,
        paddingHorizontal: 10,
        alignSelf:'baseline',
        alignItems: "center",
        marginEnd: 5,
    },

    abbreviation: {
        fontSize: 12,
        fontFamily: "zen_kaku_regular",
        height: 19,
        verticalAlign: "middle",
        color: "#fff",
    }
})