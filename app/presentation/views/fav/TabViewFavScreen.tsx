import * as React from 'react';
import {
    Animated, LayoutChangeEvent, PressableAndroidRippleConfig, StyleProp,
    View,
    ViewStyle,
    useWindowDimensions, Text, ImageBackground, Image, SafeAreaView, KeyboardAvoidingView
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
import {AppColors} from "../../theme/AppTheme";
import {FavGamesScreen} from "./FavGamesScreen";
import {PlayedGamesScreen} from "./PlayedGamesScreen";
import styleFav from "./StyleFav";
import stylesTabBar from "../auth/StylesTabBar";

const renderScene = SceneMap({
    favgames: FavGamesScreen,
    playedgames: PlayedGamesScreen,
});


const renderTabBar = (props: any) => (
    <View>
        <View style={styleFav.header}>
            <Text style={styleFav.title}>Game library</Text>
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: AppColors.white }}
                style={stylesTabBar.favScreenTabLabels}
            />
        </View>
    </View>
);

export default function TabViewFavScreen({}) {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'favgames', title: 'I want them' },
        { key: 'playedgames', title: 'I have them' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            initialLayout={{ width: layout.width }}
        />
    );
}