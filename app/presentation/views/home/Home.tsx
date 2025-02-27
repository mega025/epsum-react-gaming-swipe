import {
    ImageBackground,
    View,
    Image,
    Button,
    ActivityIndicator,
    FlatList,
    TouchableWithoutFeedback, Pressable, Platform
} from "react-native";
import stylesHome from "./StyleHome";
import {XButton} from "../../components/XButton";
import {LikeButton} from "../../components/LikeButton";
import {Text} from "react-native"
import React, {useEffect, useState, useCallback, useRef} from "react";
import {CardItemHandle, TinderCard} from "rn-tinder-card";
import styleHome from "./StyleHome";
import viewModel from "./ViewModel";
import {PlatformItem} from "../../components/PlatformItem";
import {Gesture, GestureDetector, ScrollView} from "react-native-gesture-handler";
import {GenreItem} from "../../components/GenreItem";
import {Genre, GenreDTO} from "../../../domain/entities/Game";
import Toast from "react-native-toast-message";
import {getUserUseCase} from "../../../domain/usesCases/userLocal/getUser";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {FavGame} from "../../../domain/entities/FavGame";


export function Home() {

    const tinderCardsRef = useRef<Array<CardItemHandle | null>>([]);
    const {
        listGames,
        setListGames,
        refillSwipeGames,
        transfromCoverUrl,
        showLoading,
        setShowLoading,
        addGameToFav
    } = viewModel.homeViewModel()
    const {user, getUserSession} = UseUserLocalStorage()
    let [swipesCounter, setSwipesCounter] = useState(0);

    const nullGenre: Genre = {
        name : "N/A"
    }

    useEffect(() => {
        refillSwipeGames()
    }, [])

    useEffect(() => {
        if(swipesCounter >= 10) {
            setSwipesCounter(0);
            refillSwipeGames()
        }
    }, [swipesCounter]);


    const OverlayRight = () => {
        return (
            <View
                style={[
                    stylesHome.overlayLabelContainer,
                    {
                        backgroundColor: 'green',
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
                    },
                ]}
            >
                <Text style={stylesHome.overlayLabelText}>Nope</Text>
            </View>
        );
    };
    return (
        <View>
            <ImageBackground source={require("../../../../assets/definitiveBackground.jpeg")}
                             style={{width: '100%', height: '100%'}}>
                <View style={stylesHome.loadingIconContainer}>
                    <ActivityIndicator style={styleHome.loading} size="large" color="#ffffff" animating={showLoading}/>
                </View>
                <View style={styleHome.wrapper}>
                    {listGames.map((item, index) => {
                        return (
                            <View
                                style={stylesHome.cardContainer}
                                pointerEvents="box-none"
                                key={index}
                            >
                                <TinderCard
                                    ref={(el) => (tinderCardsRef.current[index] = el)}
                                    cardWidth={330}
                                    cardHeight={630}
                                    disableBottomSwipe={true}
                                    disableTopSwipe={true}
                                    OverlayLabelRight={OverlayRight}
                                    OverlayLabelLeft={OverlayLeft}
                                    cardStyle={stylesHome.card}
                                    onSwipedRight={async () => {
                                        setSwipesCounter(swipesCounter + 1);
                                        await getUserSession()
                                        console.log(swipesCounter+" "+user?.userId)
                                        if(user?.userId != undefined) {
                                            const genreListDTO: GenreDTO[] = []
                                            item.genres.forEach((genre: Genre) => {
                                                    let genreDTO: GenreDTO = {
                                                        genreName: genre.name,
                                                    }
                                                    genreListDTO.push(genreDTO)
                                                }
                                            )
                                            const favGameDTO: FavGame = {
                                                name: item.name,
                                                ratingScore: Math.round((item.rating * 100) / 100),
                                                releaseYear: item.release_dates ? item.release_dates[0].y : 0,
                                                imageUrl: item.cover ? transfromCoverUrl(item.cover.url) : "",
                                                listPlatforms: item.platforms,
                                                listGenres: genreListDTO
                                            }
                                            addGameToFav(favGameDTO, user?.userId);
                                        }
                                    }}
                                    onSwipedLeft={() => {
                                        setSwipesCounter(swipesCounter + 1);
                                        console.log(swipesCounter);
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: item.cover
                                                ? transfromCoverUrl(item.cover.url)
                                                : "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg"
                                        }}
                                        style={styleHome.image}
                                    />
                                    <View style={{marginHorizontal: 20, marginVertical: 15}}>
                                        <View style={stylesHome.firstRowCardContainer}>
                                            <Text style={stylesHome.gameNameText}> {item.name}</Text>
                                            <Text
                                                style={stylesHome.ratingText}>{Math.round((item.rating * 100) / 100).toFixed(0)}</Text>
                                        </View>
                                        <View style={styleHome.secondRowCardContainer}>
                                            <FlatList style={styleHome.platformsContainer}
                                                      data={item.platforms}
                                                      renderItem={PlatformItem}
                                                      horizontal={true}
                                                      scrollEnabled={true}
                                                      nestedScrollEnabled={true}/>
                                        </View>
                                        <View style={styleHome.thirdRowCardContainer}>
                                            <FlatList style={styleHome.genreContainer}
                                                      data={item.genres}
                                                      renderItem={GenreItem}
                                                      horizontal={true}
                                                      scrollEnabled={true}
                                                      nestedScrollEnabled={true}/>
                                            <Text
                                                style={{fontSize: 15}}>{item.release_dates ? item.release_dates[0].y : "N/A"}</Text>
                                        </View>
                                    </View>
                                </TinderCard>
                                <View style={styleHome.buttonsContainer}>
                                    <XButton onPress={() => tinderCardsRef.current?.[index]?.swipeLeft()}></XButton>
                                    <Image source={require("../../../../assets/logo.png")} style={stylesHome.logo}></Image>
                                    <LikeButton></LikeButton>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ImageBackground>
        </View>
    );
}

