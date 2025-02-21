import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Game } from "../../domain/entities/Game"; // Asegúrate de tener la definición correcta de Game

interface Props {
    games: Game[];
}

const GameItems = ({ games }: Props) => {
    const renderItem = ({ item }: { item: Game }) => (
        <View style={styles.item}>
            {item.cover && (
                <Image source={{ uri: item.cover.url.replace("thumb", "cover_big") }} style={styles.cover} />
            )}
            <View style={styles.info}>
                <Text style={styles.title}>{item.name}</Text>
                {item.genres && <Text style={styles.genre}>{item.genres.map(g => g.name).join(", ")}</Text>}
                {item.rating && <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>}
            </View>
        </View>
    );
    return (
        <FlatList
            data={games}
            renderItem={renderItem}
            keyExtractor={(item) => item.name} 
        />
    );
};

const styles = StyleSheet.create({
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
    title: {
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
});

    export default GameItems;
