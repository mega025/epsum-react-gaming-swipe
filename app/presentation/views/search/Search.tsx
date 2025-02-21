import React, { useState } from "react";
import { ActivityIndicator, Image, ImageBackground, Text, View, TouchableWithoutFeedback, Keyboard, StyleSheet } from "react-native";
import { CustomTextInputSearch } from "../../components/CustomTextInputSearch";
import styleSearch from "./StyleSearch";
import { IgdbApiDelivery } from "../../../data/sources/remote/igdbAPI/IgdbApiDelivery";
import GameItems from "../../components/GameItems";

export function Search() {
    const [searchText, setSearchText] = useState("");
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchGames = async (text: string) => {
        setSearchText(text);
        if (text.length < 2) {
            setGames([]);
            return;
        }

        setLoading(true);
        try {
            const response = await IgdbApiDelivery.post("games", `
        search "${text}";
        fields name,cover.url,genres.name,rating;
        limit 10;
      `);
            setGames(response.data);
        } catch (error) {
            console.error("Error al obtener juegos:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styleSearch.container}>
            <ImageBackground
                source={require("../../../../assets/background.png")}
                style={{ width: "100%", height: "100%" }}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styleSearch.header}>
                        <Image source={require("../../../../assets/logo.png")} style={styleSearch.logo} />
                        <Text style={styleSearch.appName}>GamingSwipe</Text>
                    </View>
                </TouchableWithoutFeedback>

                <View style={styleSearch.title}>
                    <Text style={styleSearch.title}>Search</Text>
                </View>

                <View style={styleSearch.containerSearchInput}>
                    <CustomTextInputSearch
                        keyboardType="default"
                        secureTextEntry={false}
                        value={searchText}
                        onPressButtonFromInterface={(text: string) => searchGames(text)}
                    />
                    <Image
                        source={require("../../../../assets/search.png")}
                        style={styleSearch.icon}
                    />
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <GameItems games={games} />
                )}
            </ImageBackground>
        </View>
    );
}
