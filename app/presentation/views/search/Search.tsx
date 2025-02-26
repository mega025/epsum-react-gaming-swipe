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
    const [games, setGames] =useState<Game[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);


    const searchGames = async (text: string, page: number = 1) => {

        setLoading(true);


        try {
            const res = await IgdbApiDelivery.post<Game[]>("/games",
                `fields name, rating, platforms.abbreviation, genres.name, cover.url, release_dates.y; limit 15; search "${text}"; offset ${page  * 15};`
            );
            if (page === 1) {
                setGames(res.data);
            } else {
                setGames((prevGames) => [...prevGames, ...res.data]);
            }
        } catch (error) {
            console.error("Error al buscar juegos:", error);
        } finally {
            setLoading(false);
        }
    };

    const SearchTextChange = (text: string) => {
        setSearchText(text);
        setPage(1);
        searchGames(text, 1);
        setLoading(true);

    };

    const LoadMoreGame = () => {
        if (!loading) {
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                searchGames(searchText, nextPage);
                return nextPage;
            });
        }
    };

    return (
        <View style={styleSearch.container}>
            <ImageBackground
                source={require("../../../../assets/background.png")}
                style={{ width: "100%", height: "100%" }}
            >
                <View style={styleSearch.containerHeader}>
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
                            onPressButtonFromInterface={(text: string) =>SearchTextChange(text)}
                        />
                    </View>
                </View>
                <View style={styleSearch.containerGames}>
                    <FlatList<Game>
                        data={games}
                        renderItem={({ item }) => <GameItems item={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        ListFooterComponent={
                            loading ? <ActivityIndicator size="large" /> : null
                        }
                        onEndReached={LoadMoreGame}
                        onEndReachedThreshold={1.5}
                    />
                </View>

            </ImageBackground>
        </View>
    );
}
