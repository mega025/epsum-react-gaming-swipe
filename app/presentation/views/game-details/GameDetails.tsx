import {
    ActivityIndicator, FlatList,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamsList} from "../../../../App";
import styleHome from "../home/StyleHome";
import React, {useEffect} from "react";
import {homeViewModel} from "../home/ViewModel"
import styleGameDetails from "./StyleGameDetails";
import gameDetailsViewModel from "./ViewModel";
import stylesHome from "../home/StyleHome";
import {styles} from "react-native-toast-message/lib/src/components/BaseToast.styles";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {PlatformItem} from "../../components/PlatformItem";
import {Genre, Platform} from "../../../domain/entities/Game";
import {GenreItem} from "../../components/GenreItem";
type GameDetailsRouteProp = RouteProp<RootStackParamsList, "GameDetails">;
import YoutubePlayer from "react-native-youtube-iframe";


export function GameDetails({navigation = useNavigation()}: PropsStackNavigation) {
    const {transformCoverUrl} = homeViewModel()
    const {
        gameDetails,
        loadGameDetails,
        showLoading
    } = gameDetailsViewModel()

    const route = useRoute<GameDetailsRouteProp>()
    const {gameId} = route.params

    useEffect(() => {
        loadGameDetails(gameId)
    }, []);

    const nullGenre: Genre = {name : "N/A"}
    const nullPlatform: Platform = {abbreviation : "N/A"}

    return(
        <SafeAreaView>
            <ImageBackground source={require("../../../../assets/definitiveBackground.jpeg")}
                             style={{width: wp("100%"), height: '100%'}}>
                {!showLoading ? (
                    <>
                    <ScrollView style={{paddingBottom: hp("60%")}} showsVerticalScrollIndicator={false}>
                        <View style={styleGameDetails.header}>
                            <TouchableOpacity onPress={navigation.goBack}>
                                <Image source={require("../../../../assets/go-back-icon.png")}
                                       style={styleGameDetails.goBackIcon}/>
                            </TouchableOpacity>
                            <Image
                                source={{
                                    uri: gameDetails?.cover
                                        ? transformCoverUrl(gameDetails.cover.url)
                                        : "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg"
                                }}
                                style={styleGameDetails.image}
                            />
                            <View style={{flex: 1}}>
                                <Text style={styleGameDetails.name}>{gameDetails?.name}</Text>
                                <View style={{flexDirection: "row", gap: wp("19%")}}>
                                    {gameDetails?.rating ? (
                                        <Text style={styleGameDetails.rating}>⭐ {gameDetails?.rating.toFixed(1)}</Text>
                                    ) : (
                                        <Text style={styleGameDetails.rating}>N/A</Text>
                                    )}
                                    <Text style={styleGameDetails.rating}>{gameDetails?.release_dates[0] ? gameDetails?.release_dates[0].y : "N/A"}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{paddingHorizontal: wp("4%")}}>
                            <Text style={styleGameDetails.infoTitles}>Involved companies</Text>
                            <FlatList
                                data={gameDetails?.involved_companies}
                                scrollEnabled={false}
                                renderItem={({ item }) => (<Text style={styleGameDetails.involvedCompany}>{item.company.name}</Text>)}/>

                            <Text style={styleGameDetails.infoTitles}>Platforms</Text>
                            <FlatList style={{...styleHome.platformsContainer, width: wp("90%")}}
                                      data={gameDetails?.platforms ? gameDetails?.platforms : [nullPlatform]}
                                      renderItem={PlatformItem}
                                      horizontal={true}
                                      scrollEnabled={true}
                                      fadingEdgeLength={80}
                                      showsHorizontalScrollIndicator={false}
                                      nestedScrollEnabled={true}/>

                            <Text style={styleGameDetails.infoTitles}>Genres</Text>
                            <FlatList style={{...styleHome.genreContainer, width: wp("90%")}}
                                      data={gameDetails?.genres ? gameDetails?.genres : [nullGenre]}
                                      renderItem={GenreItem}
                                      horizontal={true}
                                      fadingEdgeLength={80}
                                      showsHorizontalScrollIndicator={false}
                                      scrollEnabled={true}
                                      nestedScrollEnabled={true}/>

                            {gameDetails?.release_dates[0] && (
                                <View>
                                    <Text style={styleGameDetails.infoTitles}>Release date</Text>
                                    <Text style={{...styleGameDetails.summary, lineHeight: 20}}>{gameDetails?.release_dates[0].human}</Text>
                                </View>
                            )}
                            <Text style={styleGameDetails.infoTitles}>Summary</Text>
                            <Text style={styleGameDetails.summary}>{gameDetails?.summary ? gameDetails?.summary : "--"}</Text>
                            {gameDetails?.storyline && (
                                <View>
                                    <Text style={styleGameDetails.infoTitles}>Story line</Text>
                                    <Text style={styleGameDetails.summary}>{gameDetails?.storyline ? gameDetails?.storyline : "--"}</Text>
                                </View>
                            )}

                            {gameDetails?.videos && (
                                <View>
                                    <Text style={styleGameDetails.infoTitles}>Videos</Text>
                                    <YoutubePlayer
                                        height={200}
                                        videoId={gameDetails?.videos[0].video_id}
                                    />
                                </View>
                            )}

                            <Text style={styleGameDetails.infoTitles}>Related games</Text>

                        </View>
                    </ScrollView>
                    </>
                ) : (
                    <View style={stylesHome.loadingIconContainer}>
                        <ActivityIndicator style={styleHome.loading} size="large" color="#ffffff" animating={showLoading}/>
                    </View>
                )}
            </ImageBackground>
            <View style={stylesHome.loadingIconContainer}>
                <ActivityIndicator style={styleHome.loading} size="large" color="#ffffff" animating={showLoading}/>
            </View>
        </SafeAreaView>
    )
}