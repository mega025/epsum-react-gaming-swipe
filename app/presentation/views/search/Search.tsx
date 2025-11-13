import React, {useCallback, useEffect, useState} from "react";
import {
    Text,
    View,
    Keyboard, ActivityIndicator, TouchableOpacity,
}
    from "react-native";
import {Image} from "expo-image"
import { CustomTextInputSearch } from "../../components/CustomTextInputSearch";
import {styleSearch, styleSearchCompanyItem, styleSearchGameItem, styleSearchUserItem} from "./StyleSearch";
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
import stylesHome from "../home/StyleHome";
import styleHome from "../home/StyleHome";
import {GetSearchUserInterface, SearchUserDTO} from "../../../domain/entities/User";
import {API_BASE_URL} from "../../../data/sources/remote/api/ApiDelivery";
import {FlashList} from "@shopify/flash-list";
import {transformCoverUrl, transformSmallCoverUrl} from "../../utils/TransformCoverUrls";
import show = Toast.show;
import {stylesTabBarItems} from "../../navigation/UserNavigation";

export function Search({navigation = useNavigation()}: PropsStackNavigation) {
    const {
        gamesDisplayed,
        loading,
        loadMoreGames,
        onSearchTextChange,
        searchText,
        searchUserText,
        onSearchUserTextChange,
        searchMostAnticipatedGames,
        setSearchText,
        onApplyFilters,
        filtersApplied,
        appliedFilters,
        setAppliedFilters,
        setFiltersApplied,
        setSelectedCategory,
        setSelectedPlatform,
        searchedUsers,
        selectedPlatform,
        selectedCategory,
    } = viewModel.searchViewModel()
    const [selectedTab, setSelectedTab] = useState<"games" | "developers" | "users">("games");

    useEffect(() => {
        searchMostAnticipatedGames()
    }, []);

    const {user} = UseUserLocalStorage()

    const {
        addGameToFav,
        transformGameIntoFavGameInterface,
    } = viewModelHome.homeViewModel()

    const {
        deleteGameFromFav,
        loadFavGames,
        loadPlayedGames,
        playedListGames,
        favListGames,
    } = viewModelFav.favScreenViewModel()

    useFocusEffect(
        useCallback(() => {
            if(user?.slug != undefined) {
                loadFavGames(user?.slug)
                loadPlayedGames(user?.slug)
            }
        }, [user?.slug])
    );

    const checkIfGameFromApiIsLiked = (gameId: number) => {
        return favListGames.some(game => game.id_api === gameId);
    }

    const checkIfGameFromApiIsPlayed = (gameId: number) => {
        return playedListGames.some(game => game.id_api === gameId);
    }

    const searchUserItem = useCallback(({item} : {item:GetSearchUserInterface}) => (
        <TouchableOpacity style={styleSearchUserItem.container} onPress={() => navigation.push("UserDetails", {userSearch : item})}>
            <Image source={item.image ? {uri: `${API_BASE_URL.slice(0, -4)}${item.image}`} : require("../../../../assets/account-image.jpg")}
                    style={styleSearchUserItem.image}
                   contentFit="cover"
                   transition={250}
            />
            <Text style={styleSearchUserItem.name}>{item.name}</Text>
            <Text style={styleSearchUserItem.name}>{item.last_name}</Text>
        </TouchableOpacity>
    ), [])

    const searchGameItem = useCallback(({item} : {item:Game}) => (
        <View style={styleSearchGameItem.gameCard}>
            <TouchableOpacity onPress={() => navigation.navigate("GameDetails", {gameId : item.id, likeButton: true})}>
                <Image
                    source={{
                        uri: item.cover
                            ? transformSmallCoverUrl(item.cover.url)
                            : "https://www.igdb.com/assets/no_cover_show-ef1e36c00e101c2fb23d15bb80edd9667bbf604a12fc0267a66033afea320c65.png"
                    }}
                    contentFit="contain"
                    transition={250}
                    style={styleSearchGameItem.gameCover}
                />
            </TouchableOpacity>
            <View>
                <View style={styleSearchGameItem.name_rating}>
                    <Text style={styleSearchGameItem.gameName}>{item.name}</Text>
                </View>
                <View style={styleSearchGameItem.plaformsFlatlistContainer}>
                    <FlashList data={item.platforms}
                               style={{minWidth:wp("50%")}}
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
                    <Text style={styleSearchGameItem.rating}>{item.rating.toFixed(1)}</Text>
                ) : (
                    <>
                        <View style={styleSearchGameItem.rating}>
                            <Text style={{width:item.hypes ? "auto" : "100%", fontSize:wp("3%"), textAlign:"center", color: item.hypes ? AppColors.green : AppColors.white}}>
                                {item.hypes ? item.hypes : "No rate"}</Text>
                            {item.hypes && (
                            <Image style={{width:wp("3%"), height:hp("1%"), tintColor: AppColors.green}}
                                source={require("../../../../assets/hypes-icon.png")}/>
                            )}
                        </View>
                    </>

                )}
                <TouchableOpacity onPress={async () => {
                    if (!checkIfGameFromApiIsLiked(item.id)) {
                        try {
                            if (!checkIfGameFromApiIsPlayed(item.id)) {
                                await addGameToFav(transformGameIntoFavGameInterface(item), user?.slug ? user?.slug : "");
                                await loadFavGames(user?.slug ? user?.slug : "");
                            }
                        } catch (error) {
                            Toast.show({
                                "type": "error",
                                "text1": "Error while trying to like the game",
                            })
                        }
                    } if (checkIfGameFromApiIsLiked(item.id)) {
                        try {
                            await deleteGameFromFav(
                                item.id,
                                user?.slug ? user?.slug : "",
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
                    <Image
                        contentFit="contain"
                        transition={100}
                        style={styleSearchGameItem.fav} source={
                        checkIfGameFromApiIsLiked(item.id)
                            ? require("../../../../assets/filled-heart.png")
                            : checkIfGameFromApiIsPlayed(item.id) ? require("../../../../assets/check-icon.png") : require("../../../../assets/heart.png")}/>
                </TouchableOpacity>
                <Text style={styleSearchGameItem.gameReleaseYear}>{item.release_dates?.[0]?.y ?? "TBD"}</Text>
            </View>
        </View>
    ), [addGameToFav, checkIfGameFromApiIsLiked, loadFavGames, deleteGameFromFav, transformCoverUrl, navigation])

    return (
        <View style={styleSearch.container}>
            <View style={{width: '100%', height: '100%', backgroundColor: AppColors.backgroundColor}}>
                <View style={styleSearch.containerHeader}>
                    <View style={styleSearch.logoContainer}>
                        <Image source={require("../../../../assets/igdb-logo.webp")} style={styleSearch.logo} />
                    </View>
                    <View>
                        <Text style={styleSearch.headerTitle}>Search</Text>
                    </View>
                    <View style={styleSearch.tabsContainer}>
                        <TouchableOpacity
                            style={[styleSearch.tabButton, selectedTab === "games" && styleSearch.tabButtonSelected]}
                            onPress={() => setSelectedTab("games")}
                        >
                            <Image
                                contentFit={"contain"}
                                source={require("../../../../assets/controller-icon.png")}
                                style={{...styleSearch.item, height: hp("2.7%"),}}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styleSearch.tabButton, selectedTab === "users" && styleSearch.tabButtonSelected]}
                            onPress={() => setSelectedTab("users")}
                        >
                            <Image
                                contentFit={"contain"}
                                source={require("../../../../assets/account-icon-filled.png")}
                                style={styleSearch.item}/>
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
                                {/*<View>*/}
                                {/*    <FiltroComponent onApply={onApplyFilters} selectedPlatform={selectedPlatform} selectedGenre={selectedCategory} />*/}
                                {/*</View>*/}
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
                                <Text style={styleSearch.resultText}><Text style={{...styleSearch.resultText, fontFamily: "zen_kaku_medium", fontSize: wp("4.4")}}>TOP 10</Text>   Most anticipated games</Text>
                            )}
                        </View>
                        <View style={styleSearch.gameCardsContainer}>
                            {loading ? (
                                <>
                                    <View style={stylesHome.loadingIconContainer}>
                                        <ActivityIndicator style={styleHome.loading} size="large" color="#ffffff" animating={loading} />
                                    </View>
                                </>
                            ):(
                                <>
                                    <FlashList
                                        data={gamesDisplayed}
                                        keyExtractor={(item, index) => String(index)}
                                        fadingEdgeLength={80}
                                        renderItem={searchGameItem}
                                        ListFooterComponent={
                                            <Text style={{...styleFav.footerFavGames, display: gamesDisplayed.length > 0 ? "flex" : "none"}}>No more games</Text>
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
                                </>
                            )}
                        </View>
                    </>
                )}

                {selectedTab ===  "users" && (
                    <>
                        <View style={styleSearch.containerHeader}>
                            <View style={styleSearch.containerSearchInput}>
                                <CustomTextInputSearch
                                    keyboardType="default"
                                    secureTextEntry={false}
                                    value={searchUserText}
                                    onPressButtonFromInterface={(text: string) => onSearchUserTextChange(text, user?.access_token ? user?.access_token : "")}
                                />
                            </View>
                        </View>
                        {loading ? (
                            <>
                                <View style={stylesHome.loadingIconContainer}>
                                    <ActivityIndicator style={styleHome.loading} size="large" color="#ffffff" animating={loading} />
                                </View>
                            </>
                        ):(
                            <>
                                <FlashList
                                    data={searchedUsers}
                                    removeClippedSubviews={true}
                                    renderItem={searchUserItem}
                                    ListEmptyComponent={
                                        <View style={{ alignItems: "center", width: "100%", marginTop: 20 }}>
                                            <Text style={{ ...styleSearch.emptyFlatListText, display: loading ? "none" : "flex" }}>
                                                No results
                                            </Text>
                                        </View>
                                    }
                                />
                            </>
                        )}
                    </>
                )}
            </View>
        </View>
    );
}
