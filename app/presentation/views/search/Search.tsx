import React, {useEffect, useState} from "react";
import {
    Image,
    ImageBackground,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard, FlatList, ActivityIndicator,}
from "react-native";
import { CustomTextInputSearch } from "../../components/CustomTextInputSearch";
import styleSearch from "./StyleSearch";
import SearchGameItem from "../../components/SearchGameItem";
import {Game} from "../../../domain/entities/Game";
import viewModel from "./ViewModel";
import {AppColors} from "../../theme/AppTheme";
import styleFav from "../fav/StyleFav";
import {FavScreen} from "../fav/FavScreen";
import FiltroComponent from "../../components/FilterButton";

export function Search() {

    const {
        gamesDisplayed,
        setGamesDisplayed,
        loading,
        loadMoreGames,
        onSearchTextChange,
        searchText,
        searchMostAnticipatedGames,
        setSearchText
    } = viewModel.searchViewModel()

    useEffect(() => {
        searchMostAnticipatedGames()
    }, []);

    return (
        <View style={styleSearch.container}>
            <ImageBackground
                source={require("../../../../assets/definitiveBackground.jpeg")}
                style={{ width: "100%", height: "100%" }}
            >
                <View style={styleSearch.containerHeader}>
                    <View style={styleSearch.logoContainer}>
                        <Image source={require("../../../../assets/logo.png")} style={styleSearch.logo} />
                        <Text style={styleSearch.appName}>GamingSwipe</Text>
                    </View>

                    <View>
                        <Text style={styleSearch.headerTitle}>Search</Text>
                    </View>

                    <View style={styleSearch.containerSearchInput}>
                        <CustomTextInputSearch
                            keyboardType="default"
                            secureTextEntry={false}
                            value={searchText}
                            onPressButtonFromInterface={(text: string) => onSearchTextChange(text)}
                        />
                    </View>
                    <FiltroComponent/>
                </View>

                <View style={styleSearch.resultTextContainer}>
                    {searchText !== "" ? (
                        <Text style={styleSearch.resultText}>Results for "{searchText}"</Text>
                    ) : (
                        <Text style={styleSearch.resultText}>-  TOP 10  -  MOST ANTICIPATED GAMES</Text>
                    )}
                </View>
                <View style={styleSearch.gameCardsContainer}>
                    <FlatList
                        data={gamesDisplayed}
                        keyExtractor={(item, index) => String(index)}
                        fadingEdgeLength={80}
                        renderItem={({ item }) => <SearchGameItem item={item} />}
                        ListFooterComponent={
                            loading ? <ActivityIndicator size="large"
                                                         color={AppColors.white}
                                                         style={{paddingTop: 20,}} /> : null
                        }
                        onEndReached={loadMoreGames}
                        onEndReachedThreshold={1.5}
                        ListEmptyComponent={
                            <View style={{alignItems: "center", width: "100%", marginTop: 20,}}>
                                <Text style={{...styleSearch.emptyFlatListText, display: loading ? "none" : "flex"}}>
                                    No results
                                </Text>
                            </View>
                        }
                    />
                </View>
            </ImageBackground>
        </View>
    );
}
