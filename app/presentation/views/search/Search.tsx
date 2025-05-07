import React, {useCallback, useEffect, useState} from "react";
import {
    Image,
    ImageBackground,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard, FlatList, ActivityIndicator, TouchableOpacity,
}
    from "react-native";
import { CustomTextInputSearch } from "../../components/CustomTextInputSearch";
import {styleSearch, styleSearchGameItem} from "./StyleSearch";
import {Game} from "../../../domain/entities/Game";
import viewModel from "./ViewModel";
import {AppColors} from "../../theme/AppTheme";
import styleFav from "../fav/StyleFav";
import {FavGamesScreen} from "../fav/FavGamesScreen";
import FiltroComponent from "../../components/FilterButton";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import viewModelHome from "../home/ViewModel";
import viewModelFav from "../fav/ViewModel";
import {PlatformItem} from "../../components/PlatformItem";
import Toast from "react-native-toast-message";

export function Search({navigation = useNavigation()}: PropsStackNavigation) {
    const {
        gamesDisplayed,
        setGamesDisplayed,
        loading,
        loadMoreGames,
        onSearchTextChange,
        searchText,
        searchMostAnticipatedGames,
        setSearchText,
        onApplyFilters,
        filtersApplied,
        appliedFilters,
        setAppliedFilters,
        setFiltersApplied,
        setSelectedCategory,
        setSelectedPlatform
    } = viewModel.searchViewModel()

    useEffect(() => {
        searchMostAnticipatedGames()
    }, []);

    const {user} = UseUserLocalStorage()

    const {
        addGameToFav,
        transformGameIntoFavGameInterface,
        transformCoverUrl
    } = viewModelHome.homeViewModel()

    const {
        deleteGameFromFav,
        getPositionGameList,
        loadFavGames,
        favListGames,
    } = viewModelFav.favScreenViewModel()

    const [gameLiked, setGameLiked] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if(user?.slug != undefined) {
                loadFavGames(user?.slug)
            }
        }, [user?.slug])
    );

    const checkIfGameFromApiIsLiked = (item: Game) => {
        return favListGames.some(game => game.name === item.name);
    }

    const searchGameItem = useCallback(({item} : {item:Game}) => (
        <View style={styleSearchGameItem.gameCard}>
            <TouchableOpacity onPress={() => navigation.navigate("GameDetails", {gameId : item.id})}>
                <Image
                    source={{
                        uri: item.cover
                            ? transformCoverUrl(item.cover.url)
                            : "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg"
                    }}
                    style={styleSearchGameItem.gameCover}
                />
            </TouchableOpacity>
            <View style={styleSearchGameItem.infoContainer}>
                <View style={styleSearchGameItem.name_rating}>
                    <Text style={styleSearchGameItem.gameName}>{item.name}</Text>
                </View>
                <View style={styleSearchGameItem.plaformsFlatlistContainer}>
                    <FlatList data={item.platforms}
                              renderItem={PlatformItem}
                              horizontal={true}
                              fadingEdgeLength={80}
                              showsHorizontalScrollIndicator={false}
                              scrollEnabled={true}
                              nestedScrollEnabled={true}
                    />
                </View>
            </View>
            <View style={styleSearchGameItem.thirdColumnContainer}>
                {item.rating ? (
                    <Text style={styleSearchGameItem.rating}>⭐ {item.rating.toFixed(1)}</Text>
                ) : (
                    <Text style={styleSearchGameItem.rating}>⭐ N/A</Text>
                )}
                <TouchableOpacity onPress={async () => {
                    if (!checkIfGameFromApiIsLiked(item)) {
                        try {
                            await addGameToFav(transformGameIntoFavGameInterface(item), user?.slug ? user?.slug : "");
                            await loadFavGames(user?.slug ? user?.slug : "")

                        } catch (error) {
                            Toast.show({
                                "type": "error",
                                "text1": "Error while trying to save the game",
                            })
                        }
                    } else {
                        try {
                            await deleteGameFromFav(
                                getPositionGameList(item.name),
                                user?.slug ? user?.slug : ""
                            );
                            await loadFavGames(user?.slug ? user?.slug : "")

                        } catch (error) {
                            Toast.show({
                                "type": "error",
                                "text1": "Error while trying to delete game",
                            })
                        }
                    }
                }}>
                    <Image style={styleSearchGameItem.fav} source={
                        checkIfGameFromApiIsLiked(item)
                            ? require("../../../../assets/filled-heart.png")
                            : require("../../../../assets/heart.png")}/>
                </TouchableOpacity>
                <Text style={styleSearchGameItem.gameReleaseYear}>{item.release_dates?.[0]?.y ?? "N/A"}</Text>
            </View>
        </View>
    ), [addGameToFav, checkIfGameFromApiIsLiked, getPositionGameList, loadFavGames, deleteGameFromFav, transformCoverUrl, navigation])

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
                        <FiltroComponent onApply={onApplyFilters}/>
                    </View>


                </View>

                <View style={styleSearch.resultTextContainer}>
                    {searchText !== "" ? (
                        <Text style={styleSearch.resultText}>Results for "{searchText}"</Text>
                    ) : filtersApplied ? (
                        <View style={styleSearch.filterTextContainer}>
                            <Text style={styleSearch.resultTextFilter}>
                                Filter:{" "}
                                {appliedFilters.category ? `${appliedFilters.category}` : ""}
                                {appliedFilters.category && appliedFilters.platform ? " and " : ""}
                                {appliedFilters.platform ? `${appliedFilters.platform}` : ""}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setAppliedFilters({ category: null, platform: null });
                                    setFiltersApplied(false);
                                    setSelectedCategory(null);
                                    setSelectedPlatform(null);
                                    setSearchText("");
                                    searchMostAnticipatedGames();
                                }}
                                style={styleSearch.clearFilterButton}
                            >
                                <Text style={styleSearch.clearFilterText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={styleSearch.resultText}>-  TOP 10  -  MOST ANTICIPATED GAMES</Text>
                    )}
                </View>
                <View style={styleSearch.gameCardsContainer}>
                    <FlatList
                        data={gamesDisplayed}
                        keyExtractor={(item, index) => String(index)}
                        fadingEdgeLength={80}
                        renderItem={searchGameItem}
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
