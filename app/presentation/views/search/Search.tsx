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
import {styleSearch, styleSearchCompanyItem, styleSearchGameItem} from "./StyleSearch";
import {Game} from "../../../domain/entities/Game";
import viewModel from "./ViewModel";
import {AppColors} from "../../theme/AppTheme";
import styleFav from "../fav/StyleFav";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {FavGamesScreen} from "../fav/FavGamesScreen";
import FiltroComponent from "../../components/FilterButton";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import viewModelHome from "../home/ViewModel";
import viewModelFav from "../fav/ViewModel";
import {PlatformItem} from "../../components/PlatformItem";
import Toast from "react-native-toast-message";
import {CompanyDetailsInterface} from "../../../domain/entities/Company";

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
        setSelectedPlatform,
        searchTopCompany,
        companyDisplayed
    } = viewModel.searchViewModel()
    const [selectedTab, setSelectedTab] = useState<"games" | "company">("games");

    useEffect(() => {
        searchMostAnticipatedGames()
    }, []);
    useEffect(() => {
        searchTopCompany()
    }, []);

    const {user} = UseUserLocalStorage()

    const {
        addGameToFav,
        transformGameIntoFavGameInterface,
        transformCoverUrl
    } = viewModelHome.homeViewModel()

    const {
        deleteGameFromFav,
        loadFavGames,
        favListGames,
    } = viewModelFav.favScreenViewModel()

    const [gameLiked, setGameLiked] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if(user?.slug != undefined) {
                loadFavGames(user?.slug, user?.access_token)
            }
        }, [user?.slug])
    );

    const checkIfGameFromApiIsLiked = (gameName: string) => {
        return favListGames.some(game => game.name === gameName);
    }

    const searchGameItem = useCallback(({item} : {item:Game}) => (
        <View style={styleSearchGameItem.gameCard}>
            <TouchableOpacity onPress={() => navigation.navigate("GameDetails", {gameId : item.id, likeButton: true})}>
                <Image
                    source={{
                        uri: item.cover
                            ? transformCoverUrl(item.cover.url)
                            : "https://www.igdb.com/assets/no_cover_show-ef1e36c00e101c2fb23d15bb80edd9667bbf604a12fc0267a66033afea320c65.png"
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
                    if (!checkIfGameFromApiIsLiked(item.name)) {
                        try {
                            await addGameToFav(transformGameIntoFavGameInterface(item), user?.slug ? user?.slug : "");
                            await loadFavGames(user?.slug ? user?.slug : "", user?.access_token ? user?.access_token : "");

                        } catch (error) {
                            Toast.show({
                                "type": "error",
                                "text1": "Error while trying to save the game",
                            })
                        }
                    } else {
                        try {
                            await deleteGameFromFav(
                                item.id,
                                user?.slug ? user?.slug : "",
                                user?.access_token ? user?.access_token : "",
                            );
                            await loadFavGames(user?.slug ? user?.slug : "", user?.access_token ? user?.access_token : "")

                        } catch (error) {
                            Toast.show({
                                "type": "error",
                                "text1": "Error while trying to delete game",
                            })
                        }
                    }
                }}>
                    <Image style={styleSearchGameItem.fav} source={
                        checkIfGameFromApiIsLiked(item.name)
                            ? require("../../../../assets/filled-heart.png")
                            : require("../../../../assets/heart.png")}/>
                </TouchableOpacity>
                <Text style={styleSearchGameItem.gameReleaseYear}>{item.release_dates?.[0]?.y ?? "N/A"}</Text>
            </View>
        </View>
    ), [addGameToFav, checkIfGameFromApiIsLiked, loadFavGames, deleteGameFromFav, transformCoverUrl, navigation])

    const searchCompanyItem = useCallback(({item} : {item:CompanyDetailsInterface}) =>(
        <View style={styleSearchCompanyItem.companyCard}>
            <TouchableOpacity
                style={{backgroundColor: AppColors.softWhite, borderRadius: 10, marginStart: wp("3%")}}
                onPress={() => navigation.push("CompanyDetails", {companyId:item.id})}>
                <Image
                    source={{
                        uri: item.logo?.url
                            ? item.logo.url
                            : "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg",
                    }}
                    style={styleSearchCompanyItem.companyCover}  resizeMode="contain"
                />
            </TouchableOpacity>
            <Text style={styleSearchCompanyItem.companyName}>{item.name}</Text>
        </View>
    ), [])

    return (
        <View style={styleSearch.container}>
            <ImageBackground
                source={require("../../../../assets/definitiveBackground.jpeg")}
                style={{ width: "100%", height: "100%" }}
            >
                <View style={styleSearch.containerHeader}>
                    <View style={styleSearch.logoContainer}>
                        <Image source={require("../../../../assets/logo.png")} style={styleSearch.logo} />
                    </View>

                    <View>
                        <Text style={styleSearch.headerTitle}>Search</Text>
                    </View>
                    <View style={styleSearch.tabsContainer}>
                        <TouchableOpacity
                            style={[styleSearch.tabButton, selectedTab === "games" && styleSearch.tabButtonSelected]}
                            onPress={() => setSelectedTab("games")}
                        >
                            <Text style={[styleSearch.tabText, selectedTab === "games" && styleSearch.tabTextSelected]}>Games</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styleSearch.tabButton, selectedTab === "company" && styleSearch.tabButtonSelected]}
                            onPress={() => setSelectedTab("company")}
                        >
                            <Text style={[styleSearch.tabText, selectedTab === "company" && styleSearch.tabTextSelected]}>Companies</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {selectedTab === "games" && (
                    <>
                        <View style={styleSearch.containerHeader}>
                            <View style={styleSearch.containerSearchInput}>
                                <CustomTextInputSearch
                                    keyboardType="default"
                                    secureTextEntry={false}
                                    value={searchText}
                                    onPressButtonFromInterface={(text: string) => onSearchTextChange(text)}
                                />
                                <FiltroComponent onApply={onApplyFilters} />
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
                                    loading ? (
                                        <ActivityIndicator
                                            size="large"
                                            color={AppColors.white}
                                            style={{ paddingVertical: 15 }}
                                        />
                                    ) : null
                                }
                                onEndReached={loadMoreGames}
                                onEndReachedThreshold={1.5}
                                ListEmptyComponent={
                                    <View style={{ alignItems: "center", width: "100%", marginTop: 20 }}>
                                        <Text style={{ ...styleSearch.emptyFlatListText, display: loading ? "none" : "flex" }}>
                                            No results
                                        </Text>
                                    </View>
                                }
                            />
                        </View>
                    </>
                )}

                {selectedTab === "company" && (
                <>
                    <View style={styleSearch.resultTextContainer}>
                        <Text style={styleSearch.resultText}>- TOP 20 - GAME DEVELOPERS</Text>
                    </View>
                        <FlatList
                            data={companyDisplayed}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={searchCompanyItem}
                            ListFooterComponent={
                                loading ? (
                                    <ActivityIndicator
                                        size="large"
                                        color={AppColors.white}
                                        style={{ marginTop: 20 }}
                                    />
                                ) : null
                            }
                            ListEmptyComponent={() => {
                                if (loading) return null;
                                return (
                                    <View style={styleSearch.emptyContainer}>
                                        <Text style={styleSearch.emptyText}>No companies found.</Text>
                                    </View>
                                );
                            }}
                        />
                </>
                )}
            </ImageBackground>
        </View>
    );
}
