import {
    ImageBackground,
    View,
    Image,
    ActivityIndicator,
    StyleSheet, FlatList,
    TouchableOpacity,
} from "react-native";
import stylesHome from "./StyleHome";
import {Text} from "react-native"
import React, {useEffect, useState, useCallback, useRef} from "react";
import {CardItemHandle, TinderCard} from "rn-tinder-card";
import styleHome from "./StyleHome";
import viewModel from "./ViewModel";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    widthPercentageToDP
} from "react-native-responsive-screen";
import {Game, Genre, GenreDTO, Platform} from "../../../domain/entities/Game";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import {useNavigation} from "@react-navigation/native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Swiper, type SwiperCardRefType} from "rn-swiper-list";
import {AppColors} from "../../theme/AppTheme";
import {styles} from "react-native-toast-message/lib/src/components/BaseToast.styles";
import {GenreItem} from "../../components/GenreItem";
import {PlatformItem} from "../../components/PlatformItem";
import {XButton} from "../../components/XButton";
import {LikeButton} from "../../components/LikeButton";
import FilterButton from "../../components/FilterButton";
import {RewindButton} from "../../components/RewindButton";
import {Shadow} from "react-native-shadow-2";


function FiltroComponent(props: {
    onApply: (filters: { category: string | null; platform: string | null }) => Promise<void>,
    selectedGenre: string | null,
    selectedPlatform: string | null
}) {
    return null;
}

export function Home({navigation = useNavigation()}: PropsStackNavigation) {

    const tinderCardsRef = useRef<Array<CardItemHandle | null>>([]);

    const {
        listGames,
        refillSwipeGames,
        transformCoverUrl,
        showLoading,
        addGameToFav,
        selectedGenre,
        swipesCounter,
        setSwipesCounter,
        selectedPlatform,
        showMessageLoading,
        refillSwipeGamesWithFilters,
        setMessageLoading,
        transformGameIntoFavGameInterface
    } = viewModel.homeViewModel()

    const {user} = UseUserLocalStorage()

    const nullGenre: Genre = {name : "N/A"}
    const nullPlatform: Platform = {name : "N/A"}

    useEffect(() => {
        refillSwipeGames()
    }, [])

    const renderCard = useCallback((item: Game) => {
        return (
            <View style={{width: "100%", height:"100%"}}>
                <TouchableOpacity onPress={() => navigation.navigate("GameDetails", {gameId : item.id, likeButton: false})}>
                    <Image
                        source={{
                            uri: item.cover
                                ? transformCoverUrl(item.cover.url)
                                : "https://www.igdb.com/assets/no_cover_show-ef1e36c00e101c2fb23d15bb80edd9667bbf604a12fc0267a66033afea320c65.png"
                        }}
                        style={styleHome.image}
                    />
                </TouchableOpacity>
                <View style={{marginVertical: hp("1%"), paddingHorizontal: wp("5%")}}>
                    <View style={stylesHome.firstRowCardContainer}>
                        <Text style={stylesHome.gameNameText}> {item.name}</Text>
                        <Text
                            style={stylesHome.ratingText}>{
                            item.rating
                                ? Math.round((item.rating * 100) / 100).toFixed(0)
                                : "N/A"
                        }</Text>
                    </View>
                    <View style={{marginTop: hp("2%")}}>
                        <FlatList
                            data={item.platforms ? item.platforms : [nullPlatform]}
                                  renderItem={PlatformItem}
                                  horizontal={true}
                                  scrollEnabled={true}
                                  fadingEdgeLength={80}
                                  showsHorizontalScrollIndicator={false}
                                  nestedScrollEnabled={true}/>
                    </View>
                    <View style={styleHome.thirdRowCardContainer}>
                        <FlatList
                                  data={item.genres ? item.genres : [nullGenre]}
                                  renderItem={GenreItem}
                                  horizontal={true}
                                  fadingEdgeLength={80}
                                  showsHorizontalScrollIndicator={false}
                                  scrollEnabled={true}
                                  nestedScrollEnabled={true}/>
                        <Text
                            style={styleHome.releaseDateText}>{item.release_dates ? item.release_dates[0].y : "N/A"}</Text>
                    </View>
                </View>
            </View>
        );
    }, []);


    const ref = useRef<SwiperCardRefType>(null);

    const OverlayRight = () => {
        return (
            <View
                style={[
                    stylesHome.overlayLabelContainer,
                    {
                        backgroundColor: 'green',
                        opacity: 0.8
                    },
                ]}
            >
                <Text style={stylesHome.overlayLabelText}>Like</Text>
            </View>
        );
    };
    const OverlayLeft = () => {
        return (
            <View
                style={[
                    stylesHome.overlayLabelContainer,
                    {
                        backgroundColor: 'red',
                        opacity: 0.8,
                    },
                ]}
            >
                <Text style={stylesHome.overlayLabelText}>Nope</Text>
            </View>
        );
    };
    return (
        <View style={{width: '100%', height: '100%', backgroundColor: AppColors.backgroundColor}}>
            {showLoading ? (
                <>
                    <View style={stylesHome.loadingIconContainer}>
                        <ActivityIndicator style={styleHome.loading} size="large" color="#ffffff" animating={showLoading} />
                    </View>
                </>
            ):(
                <>
                    <GestureHandlerRootView style={styleHome.cardContainer}>
                        <Swiper
                            ref={ref}
                            data={listGames}
                            cardStyle={styleHome.cardStyle}
                            overlayLabelContainerStyle={styleHome.overlayLabelContainer}
                            renderCard={renderCard}
                            disableTopSwipe={true}
                            disableBottomSwipe={true}
                            onIndexChange={(index) => {
                                console.log('Current Active index', index);
                            }}
                            onSwipeRight={async (cardIndex) => {
                                console.log('cardIndex', cardIndex);
                                if (user?.slug !== undefined)
                                    await addGameToFav(transformGameIntoFavGameInterface(listGames[cardIndex]), user.slug)
                                console.log(listGames[cardIndex].name);
                            }}
                            onSwipeLeft={(cardIndex) => {
                                console.log('onSwipeLeft', cardIndex);
                            }}
                            onPress={() => {
                                console.log('onPress');
                            }}
                            onSwipedAll={() => {
                                console.log("ola")
                            }}
                            OverlayLabelRight={OverlayRight}
                            OverlayLabelLeft={OverlayLeft}
                        />
                    </GestureHandlerRootView>
                    <View style={styleHome.buttonsContainer}>
                        <XButton onPress={() =>  ref.current?.swipeLeft()}></XButton>
                        <View style={{gap:hp("2%"), alignItems: "center"}}>
                            <RewindButton onPress={() =>  ref.current?.swipeBack()}></RewindButton>
                            <FilterButton onApply={refillSwipeGamesWithFilters} selectedGenre={selectedGenre} selectedPlatform={selectedPlatform}  />
                        </View>
                        <LikeButton onPress={() => ref.current?.swipeRight()}></LikeButton>
                    </View>
                </>
            )}
        </View>
    );
}