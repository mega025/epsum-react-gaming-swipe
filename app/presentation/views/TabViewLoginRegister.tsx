import * as React from 'react';
import {
    Animated, LayoutChangeEvent, PressableAndroidRippleConfig, StyleProp,
    View,
    ViewStyle,
    useWindowDimensions, Text, ImageBackground, Image
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
import {LoginScreen} from "./Login";
import {RegisterScreen} from "./Register";
import {Scene, Event, LocaleDirection} from 'react-native-tab-view/lib/typescript/commonjs/src/types';
import {AppColors} from "../theme/AppTheme";

const renderScene = SceneMap({
    login: LoginScreen,
    register: RegisterScreen,
});

const renderTabBar = (props: React.JSX.IntrinsicAttributes & SceneRendererProps & { navigationState: NavigationState<Route>; scrollEnabled?: boolean; bounces?: boolean; activeColor?: string; inactiveColor?: string; pressColor?: string; pressOpacity?: number; options?: Record<string, TabDescriptor<Route>> | undefined; renderIndicator?: ((props: TabBarIndicatorProps<Route>) => React.ReactNode) | undefined; renderTabBarItem?: ((props: TabDescriptor<Route> & { position: Animated.AnimatedInterpolation<number>; route: Route; navigationState: NavigationState<Route>; activeColor?: string; inactiveColor?: string; pressColor?: string; pressOpacity?: number; onLayout?: (event: LayoutChangeEvent) => void; onPress: () => void; onLongPress: () => void; defaultTabWidth?: number; style: StyleProp<ViewStyle>; android_ripple?: PressableAndroidRippleConfig; } & { key: string; }) => React.ReactElement) | undefined; onTabPress?: ((scene: Scene<Route> & Event) => void) | undefined; onTabLongPress?: ((scene: Scene<Route>) => void) | undefined; tabStyle?: StyleProp<ViewStyle>; indicatorStyle?: StyleProp<ViewStyle>; indicatorContainerStyle?: StyleProp<ViewStyle>; contentContainerStyle?: StyleProp<ViewStyle>; style?: StyleProp<ViewStyle>; direction?: LocaleDirection; gap?: number; testID?: string; android_ripple?: PressableAndroidRippleConfig; }) => (
    <View>
        <ImageBackground source={require("../../../assets/background.png")} style={{display: "flex"}}>
            />
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: AppColors.selectedTab }}
                style={{
                    backgroundColor: "rgba(215,20,20,0)",
                    width: 200,
                    alignSelf: "flex-end"
            }}
            />
        </ImageBackground>
    </View>
);

export default function TabViewExample() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'login', title: 'Sign In' },
        { key: 'register', title: 'Sign Up' },
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