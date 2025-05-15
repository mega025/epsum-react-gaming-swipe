import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import {styles} from "react-native-toast-message/lib/src/components/BaseToast.styles";
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
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {companyDetailsViewModel} from "./ViewModel";
import stylesHome from "../home/StyleHome";
import styleHome from "../home/StyleHome";
import React, {useCallback, useEffect, useState} from "react";
import App, {RootStackParamsList} from "../../../../App";
import {styleGameDetails, styleSimilarGame} from "./StyleGameDetails";
import {AppColors} from "../../theme/AppTheme";
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import {SimilarGame} from "../../../domain/entities/Game";
import {homeViewModel} from "../home/ViewModel";
import {white} from "react-native-paper/lib/typescript/styles/themes/v2/colors";


type CompanyDetailsRouteProp = RouteProp<RootStackParamsList, "CompanyDetails">;

export function CompanyDetails ({navigation = useNavigation()}: PropsStackNavigation) {

    const route = useRoute<CompanyDetailsRouteProp>()
    const {companyId} = route.params
    const {
        showLoading,
        loadCompanyDetails,
        companyDetails,
        transformLogoUrlCompany,
        formatUnixDate,
        getCountryNameFromNumericCode,
    } = companyDetailsViewModel()

    const {
        transformCoverUrl
    } = homeViewModel()

    useEffect(() => {
        loadCompanyDetails(companyId)
    }, []);

    const ITEMS_PER_PAGE = 15;

    const [developedGames, setDevelopedGames] = useState<SimilarGame[]>([]);
    const [pageDevelopedGames, setPageDevelopedGames] = useState(1);
    const [loadingMoreDevelopedGames, setLoadingMoreDevelopedGames] = useState(false);

    const [publishedGames, setPublishedGames] = useState<SimilarGame[]>([]);
    const [pagePublishedGames, setPagePublishedGames] = useState(1);
    const [loadingMorePublishedGames, setLoadingMorePublishedGames] = useState(false);

    const loadMoreDevelopedGames = () => {
        if (loadingMoreDevelopedGames) return;
        setLoadingMoreDevelopedGames(true);

        const start = (pageDevelopedGames - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const newItems = companyDetails?.developed.slice(start, end);

        if (newItems != undefined && newItems.length > 0) {
            setTimeout(() => {
                if (newItems != undefined)
                    setDevelopedGames((prev) => [...prev, ...newItems]);
                setPageDevelopedGames((prev) => prev + 1);
                setLoadingMoreDevelopedGames(false);
            }, 500);
        }
        setLoadingMoreDevelopedGames(false);
        return;
    };

    const loadMorePublishedGames = () => {
        if (loadingMorePublishedGames) return;
        setLoadingMorePublishedGames(true);

        const start = (pagePublishedGames - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const newItems = companyDetails?.published.slice(start, end);

        if (newItems != undefined && newItems.length > 0) {
            setTimeout(() => {
                if (newItems != undefined)
                    setPublishedGames((prev) => [...prev, ...newItems]);
                setPagePublishedGames((prev) => prev + 1);
                setLoadingMorePublishedGames(false);
            }, 500);
        }
        setLoadingMorePublishedGames(false);
        return;
    };

    useEffect(() => {
        if (companyDetails?.developed != undefined)
            loadMoreDevelopedGames()
        if (companyDetails?.published != undefined)
            loadMorePublishedGames()
    }, [showLoading]);

    const developedGameItem = useCallback(({item} : {item:SimilarGame}) => (
        <View style={styleSimilarGame.card}>
            <TouchableOpacity onPress={() => {navigation.push("GameDetails", {gameId : item.id, likeButton: true})}}>
                <Image
                    source={{
                        uri: item.cover
                            ? transformCoverUrl(item.cover.url)
                            : "https://www.igdb.com/assets/no_cover_show-ef1e36c00e101c2fb23d15bb80edd9667bbf604a12fc0267a66033afea320c65.png"
                    }}
                    style={styleSimilarGame.image}
                />
            </TouchableOpacity>
            <Text style={styleSimilarGame.name}>{item.name}</Text>
        </View>
    ), [navigation])

    return (
        <SafeAreaView>
            <ImageBackground source={require("../../../../assets/definitiveBackground.jpeg")}
                             style={{width: wp("100%"), height: '100%'}}>

                {!showLoading ? (
                    <>
                        <ScrollView style={{paddingBottom: hp("60%")}} showsVerticalScrollIndicator={false}>
                            <View style={{...styleGameDetails.header, flexDirection: "column", paddingBottom: 0, alignItems:"center"}}>
                                <TouchableOpacity onPress={navigation.goBack}>
                                    <Image source={require("../../../../assets/go-back-icon.png")}
                                           style={{...styleGameDetails.goBackIcon, bottom: hp("3"), end: wp("40%")}} />
                                </TouchableOpacity>
                                <View style={{width: wp("100%"), alignItems: "center", backgroundColor: "rgba(107,91,136,0.75)"}}>
                                    <Image
                                        source={{
                                            uri: companyDetails?.logo
                                                ? transformLogoUrlCompany(companyDetails.logo.url)
                                                : "https://www.igdb.com/assets/no_cover_show-ef1e36c00e101c2fb23d15bb80edd9667bbf604a12fc0267a66033afea320c65.png"
                                        }}
                                        style={{width: wp("50%"), height: hp("20%"), resizeMode: "contain", marginVertical: wp("5%")}}
                                    />
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{...styleGameDetails.name, height: "auto", lineHeight: 40, paddingBottom: hp("2%")}}>{companyDetails?.name}</Text>
                                </View>
                            </View>
                            <View style={{paddingHorizontal: wp("4%")}}>
                                {companyDetails?.start_date && (
                                    <View>
                                        <Text style={styleGameDetails.infoTitles}>Founded</Text>
                                        <Text style={styleGameDetails.summary}>{formatUnixDate(companyDetails.start_date)}</Text>
                                        {companyDetails?.country && (
                                            <View>
                                                <Text style={styleGameDetails.summary}>{getCountryNameFromNumericCode(companyDetails.country)}</Text>
                                            </View>
                                        )}
                                    </View>
                                )}
                                <Text style={styleGameDetails.infoTitles}>Description</Text>
                                <Text style={styleGameDetails.summary}>{companyDetails?.description ? companyDetails.description : "No description available"}</Text>
                                {companyDetails?.developed && (
                                    <View>
                                        <Text style={styleGameDetails.infoTitles}>Developed games</Text>
                                        <FlatList
                                            data={developedGames}
                                            renderItem={developedGameItem}
                                            fadingEdgeLength={50}
                                            keyExtractor={(item) => item.id.toString()}
                                            onEndReached={loadMoreDevelopedGames}
                                            onEndReachedThreshold={0.5}
                                            showsHorizontalScrollIndicator={false}
                                            ListFooterComponent={loadingMoreDevelopedGames ? <ActivityIndicator size="large" color={AppColors.white} style={{marginTop: hp("2%")}} /> : null}
                                            horizontal={true}
                                        />
                                    </View>
                                )}

                                {companyDetails?.published && (
                                    <View>
                                        <Text style={{...styleGameDetails.infoTitles, marginTop: wp("-4%")}}>Published games</Text>
                                        <FlatList
                                            data={publishedGames}
                                            renderItem={developedGameItem}
                                            fadingEdgeLength={50}
                                            keyExtractor={(item) => item.id.toString()}
                                            onEndReached={loadMorePublishedGames}
                                            onEndReachedThreshold={0.5}
                                            showsHorizontalScrollIndicator={false}
                                            ListFooterComponent={loadingMorePublishedGames ? <ActivityIndicator size="large" color={AppColors.white} style={{marginTop: hp("5%")}} /> : null}
                                            horizontal={true}
                                        />
                                    </View>
                                )}

                            </View>
                        </ScrollView>
                    </>
                ) : (
                    <View style={stylesHome.loadingIconContainer}>
                        <ActivityIndicator style={styleHome.loading} size="large" color="#ffffff" animating={showLoading}/>
                    </View>
                )}
            </ImageBackground>
        </SafeAreaView>
    )
}