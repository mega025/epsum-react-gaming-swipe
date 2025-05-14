import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import {styles} from "react-native-toast-message/lib/src/components/BaseToast.styles";
import {
    ActivityIndicator,
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
import React, {useEffect} from "react";
import {RootStackParamsList} from "../../../../App";
import {styleGameDetails} from "./StyleGameDetails";


type CompanyDetailsRouteProp = RouteProp<RootStackParamsList, "CompanyDetails">;

export function CompanyDetails ({navigation = useNavigation()}: PropsStackNavigation) {

    const route = useRoute<CompanyDetailsRouteProp>()
    const {companyId} = route.params
    const {
        showLoading,
        loadCompanyDetails,
        companyDetails,
        transformLogoUrlCompany
    } = companyDetailsViewModel()

    useEffect(() => {
        loadCompanyDetails(companyId)
    }, []);

    return (
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
                                        uri: companyDetails?.logo
                                            ? transformLogoUrlCompany(companyDetails.logo.url)
                                            : "https://www.igdb.com/assets/no_cover_show-ef1e36c00e101c2fb23d15bb80edd9667bbf604a12fc0267a66033afea320c65.png"
                                    }}
                                    style={styleGameDetails.image}
                                />
                                <View style={{flex: 1}}>
                                    <Text style={styleGameDetails.name}>{companyDetails?.name}</Text>
                                </View>
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