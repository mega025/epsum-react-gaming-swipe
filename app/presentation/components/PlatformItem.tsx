import {Dimensions, Text, View} from "react-native";
import {Platform} from "../../domain/entities/Game";
import {StyleSheet} from "react-native";

export const PlatformItem = ({item}: {item: Platform}) => {
    return (
        <View style={styles.container}>
                <Text style={styles.abbreviation}>{item.abbreviation}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#19114b",
        borderRadius: 4,
        padding: 7,
        alignSelf:'baseline',
        alignItems: "center",
        marginEnd: 5,
    },

    abbreviation: {
        fontSize: 15,
        color: "#fff",
    }
})