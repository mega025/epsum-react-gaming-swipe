import React, {useEffect, useState} from "react";
import {
    Image,
    ImageBackground,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard, FlatList, ActivityIndicator,

} from "react-native";
import { CustomTextInputSearch } from "../../components/CustomTextInputSearch";
import styleSearch from "./StyleSearch";
import GameItems from "../../components/GameItems";
import {IgdbApiDelivery} from "../../../data/sources/remote/igdbAPI/IgdbApiDelivery";
import {Game} from "../../../domain/entities/Game";


export function Search() {
    const [searchText, setSearchText] = useState("");
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);


    const searchGames = async (text: string) => {
        setSearchText(text);
        const condicion = `fields name,cover.url,rating,platforms.abbreviation; limit 15; search "${text}";`;

        setLoading(true);

        try {
            const res = await IgdbApiDelivery.post("/games", condicion);
            console.log(res.data);
            setGames(res.data);
        } catch (error) {
            console.error("Error al buscar los juegos", error);
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
                        onPressButtonFromInterface={(text: string) =>searchGames(text)}
                    />
                </View>
                <View style={styleSearch.containerGames}>
                    <FlatList
                        data={games}
                        renderItem={GameItems}
                        keyExtractor={item => item.id.toString()}
                        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
                    />
                </View>

            </ImageBackground>
        </View>
    );
}
