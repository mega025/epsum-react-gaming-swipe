import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import {
    ActivityIndicator,
    Image,
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
import {SimilarGame} from "../../../domain/entities/Game";
import {homeViewModel} from "../home/ViewModel";
import {FlashList} from "@shopify/flash-list";



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
        if (!loadingMoreDevelopedGames) {
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
        }
    };

    const loadMorePublishedGames = () => {
        if (!loadingMorePublishedGames) {
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
        }
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
            <View style={{width: '100%', height: '100%', backgroundColor: AppColors.backgroundColor}}>
                {!showLoading ? (
                    <>
                        <ScrollView style={{paddingBottom: hp("60%")}} showsVerticalScrollIndicator={false}>
                            <View style={{...styleGameDetails.header, flexDirection: "column", paddingBottom: 0, alignItems:"center"}}>
                                <TouchableOpacity onPress={navigation.goBack} style={{...styleGameDetails.goBackIconTouchable, bottom: hp("37%")}}>
                                    <Image source={require("../../../../assets/go-back-icon.png")}
                                           style={styleGameDetails.goBackIcon} />
                                </TouchableOpacity>
                                <View style={{width: wp("100%"), alignItems: "center", backgroundColor: AppColors.softWhite}}>
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
                                <Text style={{...styleGameDetails.summary, marginBottom: hp("4%")}}>{companyDetails?.description ? companyDetails.description : "No description available"}</Text>
                                {companyDetails?.developed && (
                                    <View>
                                        <Text style={styleGameDetails.infoTitles}>Developed games</Text>
                                        <FlashList
                                            data={developedGames}
                                            renderItem={developedGameItem}
                                            fadingEdgeLength={50}
                                            keyExtractor={(item) => item.id.toString()}
                                            onEndReached={loadMoreDevelopedGames}
                                            onEndReachedThreshold={1.5}
                                            showsHorizontalScrollIndicator={false}
                                            ListFooterComponent={loadingMoreDevelopedGames ? <ActivityIndicator size="large" color={AppColors.white} style={{marginTop: hp("2%")}} /> : null}
                                            horizontal={true}
                                        />
                                    </View>
                                )}

                                {companyDetails?.published && (
                                    <View>
                                        <Text style={{...styleGameDetails.infoTitles, marginTop: wp("-4%")}}>Published games</Text>
                                        <FlashList
                                            data={publishedGames}
                                            renderItem={developedGameItem}
                                            fadingEdgeLength={50}
                                            keyExtractor={(item) => item.id.toString()}
                                            onEndReached={loadMorePublishedGames}
                                            onEndReachedThreshold={1.5}
                                            showsHorizontalScrollIndicator={false}
                                            ListFooterComponent={loadingMorePublishedGames ? <ActivityIndicator size="large" color={AppColors.white} /> : null}
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
            </View>
    )
}