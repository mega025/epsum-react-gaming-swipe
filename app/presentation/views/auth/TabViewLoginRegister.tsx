import * as React from 'react';
import {
    Animated, LayoutChangeEvent, PressableAndroidRippleConfig, StyleProp,
    View,
    ViewStyle,
    useWindowDimensions, Text, ImageBackground, Image, KeyboardAvoidingView
} from 'react-native';
import {
    TabView,
    SceneMap,
    TabBar,
    NavigationState,
    Route,
    SceneRendererProps,
    TabBarIndicatorProps,
    TabDescriptor
} from 'react-native-tab-view';
import {RegisterScreen} from "./Register";
import {AppColors} from "../../theme/AppTheme";
import {LoginScreen} from "./Login";
import StylesTabBar from "./StylesTabBar";
import stylesTabBar from "./StylesTabBar";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

const renderScene = SceneMap({
    login: LoginScreen,
    register: RegisterScreen,
});

const renderTabBar = (props: any) => (
        <View>
            <ImageBackground source={require("../../../../assets/background-tab.png")}
                             style={{...StylesTabBar.container, paddingTop:hp("8%")}}>
                <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                    <Image source={require("../../../../assets/logo.png")} style={stylesTabBar.logoImage}/>
                    <Text style={StylesTabBar.logoText}>GamingSwipe</Text>
                </View>
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: AppColors.white}}
                    style={stylesTabBar.tabLabels}
                />
            </ImageBackground>
        </View>
);

export default function TabViewLoginRegister({}) {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'login', title: 'Sign in' },
        { key: 'register', title: 'Sign up' },
    ]);

    return (
        <KeyboardAwareScrollView
            enableAutomaticScroll={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={{ width: layout.width }}
            />
        </KeyboardAwareScrollView>
    );
}