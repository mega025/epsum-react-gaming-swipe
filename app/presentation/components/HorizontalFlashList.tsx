import {PlatformItem} from "./PlatformItem";
import {FlashList} from "@shopify/flash-list";
import React from "react";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import {LinearGradient} from "expo-linear-gradient";
import {FadeWrapper} from "rn-fade-wrapper";
import {AppColors} from "../theme/AppTheme";

interface FlashListProps {
    data: any []
    renderItem: any
    style?: StyleProp<ViewStyle>
}

export const HorizontalFlashList = ({data, renderItem, style}: FlashListProps) => {
    return (
        <FlashList
            data={data}
            style={style}
            renderItem={renderItem}
            horizontal={true}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}/>
    )
}

const stylesContainer = StyleSheet.create({
    container: {
        overflow: "hidden",
    },
});