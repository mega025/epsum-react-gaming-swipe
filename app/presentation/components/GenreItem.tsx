import {Dimensions, Text, View} from "react-native";
import {Genre, Platform} from "../../domain/entities/Game";
import {StyleSheet} from "react-native";
import {AppColors} from "../theme/AppTheme";

export const GenreItem = ({item}: {item: Genre}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{item.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.neonPurple,
        borderRadius: 15,
        padding: 7,
        alignSelf:'baseline',
        alignItems: "center",
        marginEnd: 5,
    },

    name: {
        fontSize: 13,
        height: 19,
        verticalAlign: "middle",
        fontFamily: "zen_kaku_regular",
        color: "#fff",
    }
})