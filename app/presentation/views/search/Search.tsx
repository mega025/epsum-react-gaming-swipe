import React, {useEffect, useState} from "react";
import {
    Image,
    ImageBackground,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard, FlatList, ActivityIndicator,
    TouchableOpacity,}
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
import SearchCompanyItem from "../../components/SearchCompanyItem";

export function Search() {

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
        searchCompanyByUserInput,
        companyDisplayed,
        setCompanyDisplayed,
        setAppliedFilters,
        setFiltersApplied,
        setSelectedCategory,
        setSelectedPlatform
    } = viewModel.searchViewModel()
    const [selectedTab, setSelectedTab] = useState<"games" | "company">("games");


    useEffect(() => {
        searchMostAnticipatedGames()
    }, []);
    useEffect(() => {
        searchCompanyByUserInput()
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
                            <Text style={[styleSearch.tabText, selectedTab === "company" && styleSearch.tabTextSelected]}>Company</Text>
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
                                renderItem={({ item }) => <SearchGameItem item={item} />}
                                ListFooterComponent={
                                    loading ? (
                                        <ActivityIndicator
                                            size="large"
                                            color={AppColors.white}
                                            style={{ paddingTop: 20 }}
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
                    <View style={styleSearch.container}>
                        <Text style={styleSearch.title}>Top 15 Game Companies</Text>

                        <FlatList
                            data={companyDisplayed}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={({ item }) => <SearchCompanyItem item={item} />}
                            contentContainerStyle={{ paddingBottom: 20 }}
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
                    </View>
                )}
            </ImageBackground>
        </View>
    );
}
