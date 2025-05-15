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
import {Scene, Event, LocaleDirection} from 'react-native-tab-view/lib/typescript/commonjs/src/types';
import {AppColors} from "../../theme/AppTheme";
import {FavGamesScreen} from "./FavGamesScreen";
import {PlayedGamesScreen} from "./PlayedGamesScreen";
import styleFav from "./StyleFav";
import stylesTabBar from "../auth/StylesTabBar";

const renderScene = SceneMap({
    favgames: FavGamesScreen,
    playedgames: PlayedGamesScreen,
});


const renderTabBar = (props: React.JSX.IntrinsicAttributes & SceneRendererProps & { navigationState: NavigationState<Route>; scrollEnabled?: boolean; bounces?: boolean; activeColor?: string; inactiveColor?: string; pressColor?: string; pressOpacity?: number; options?: Record<string, TabDescriptor<Route>> | undefined; renderIndicator?: ((props: TabBarIndicatorProps<Route>) => React.ReactNode) | undefined; renderTabBarItem?: ((props: TabDescriptor<Route> & { position: Animated.AnimatedInterpolation<number>; route: Route; navigationState: NavigationState<Route>; activeColor?: string; inactiveColor?: string; pressColor?: string; pressOpacity?: number; onLayout?: (event: LayoutChangeEvent) => void; onPress: () => void; onLongPress: () => void; defaultTabWidth?: number; style: StyleProp<ViewStyle>; android_ripple?: PressableAndroidRippleConfig; } & { key: string; }) => React.ReactElement) | undefined; onTabPress?: ((scene: Scene<Route> & Event) => void) | undefined; onTabLongPress?: ((scene: Scene<Route>) => void) | undefined; tabStyle?: StyleProp<ViewStyle>; indicatorStyle?: StyleProp<ViewStyle>; indicatorContainerStyle?: StyleProp<ViewStyle>; contentContainerStyle?: StyleProp<ViewStyle>; style?: StyleProp<ViewStyle>; direction?: LocaleDirection; gap?: number; testID?: string; android_ripple?: PressableAndroidRippleConfig; }) => (
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