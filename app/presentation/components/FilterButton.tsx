import React, {useCallback, useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ActivityIndicator,
    ScrollView, Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { IgdbApiDelivery } from '../../data/sources/remote/igdbAPI/IgdbApiDelivery';
import {AppColors} from "../theme/AppTheme";
import {useFocusEffect} from "@react-navigation/native";
import {Platform} from "../../domain/entities/Game";
import {popularPlatforms} from "../utils/PopularPlatformsArray";

interface FilterModalProps {
    onApply: (filters: { genres: Platform []; platforms: Platform [] }) => void;
    selectedPlatform: Platform [];
    selectedGenre: Platform [];
}

function FilterModal({ onApply, selectedGenre, selectedPlatform}: FilterModalProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState<Platform[]>([]);
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [selectedGenresInModal, setSelectedGenresInModal] = useState<Platform []>([]);
    const [selectedPlatformsInModal, setSelectedPlatformsInModal] = useState<Platform []>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
        const fetchFilters = async () => {
            try {
                setLoading(true);
                const genreRes = await IgdbApiDelivery.post('genres', 'fields name, id; limit 30;');
                setCategories(genreRes.data);
                setPlatforms(popularPlatforms);
                setSelectedPlatformsInModal(selectedPlatform);
                setSelectedGenresInModal(selectedGenre);
                setLoading(false);
            } catch (err) {
                console.log('Error fetching filters:', err);
                setLoading(false);
            }
        };
        fetchFilters();
    }, []));

    const renderOptions = (data: Platform[], selecteds: Platform [], setSelected: (val: Platform []) => void) => (
        <View style={styles.optionsContainer}>
            {data.map((item) => (
                <TouchableOpacity
                    key={item.name}
                    style={[styles.optionButton, selecteds?.some(selected => selected.name === item.name) && styles.selectedOption]}
                    onPress={() =>
                        selecteds?.some(selected => selected.name === item.name)
                            ? setSelected(selecteds?.filter(selected => selected.name !== item.name))
                            : setSelected([...selecteds, item])}
                >
                    <Text style={styles.optionText}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const applyFilters = () => {
        onApply({
            genres: selectedGenresInModal,
            platforms: selectedPlatformsInModal,
        });
        setModalVisible(false);
    };

    const clearFilters = () => {
        setSelectedGenresInModal([])
        setSelectedPlatformsInModal([])
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Image source={selectedGenre.length === 0 && selectedPlatform.length === 0
                    ? require("../../../assets/filter-icon.png")
                    : require("../../../assets/active-filter-icon.png")}
                       style={{
                           width: wp("7%"),
                           height: wp("7%"),
                           tintColor: selectedGenre.length === 0 && selectedPlatform.length === 0 ? AppColors.white : "",
                }}
                />
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>
                        {loading ? (
                            <ActivityIndicator size="large" />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.label}>Platforms</Text>
                                {renderOptions(platforms, selectedPlatformsInModal, setSelectedPlatformsInModal)}
                                <Text style={styles.label}>Categories</Text>
                                {renderOptions(categories, selectedGenresInModal, setSelectedGenresInModal)}
                            </ScrollView>
                        )}
                        <View style={{flexDirection:"row", paddingHorizontal: wp("2%")}}>
                            <TouchableOpacity
                                style={[styles.button, { marginTop: hp("2%"), width: "50%", alignItems: "flex-start" }]}
                                onPress={clearFilters}
                            >
                                <Text style={{...styles.buttonText, color: AppColors.red}}>Clear filters</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { marginTop: hp("2%"), width: "50%" }]}
                                onPress={applyFilters}
                            >
                                <Text style={styles.buttonText}>Apply filters</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default FilterModal;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp("5.4%"),
    },
    button: {
        backgroundColor: AppColors.transparent,
        alignItems: "flex-end",
    },
    buttonText: {
        color: AppColors.white,
        fontSize: wp("3.9%"),
        fontFamily: "zen_kaku_regular",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.48)',
        justifyContent: 'center',
        padding: wp("4%"),
    },
    modalContent: {
        backgroundColor: AppColors.buttonBackground,
        padding: wp("8%"),
        borderRadius: 15,
        maxHeight: "80%",
    },

    label: {
        textAlign: "center",
        fontSize: wp("4%"),
        color: AppColors.white,
        fontFamily: "zen_kaku_medium",
        alignSelf: "flex-start",
        marginVertical: hp("3%"),
        marginStart: wp("2%"),
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: wp("1%"),
    },
    optionButton: {
        backgroundColor: AppColors.lighterButtonBackground,
        padding: wp("2%"),
        borderRadius: 20,
        marginBottom:hp("1%"),
    },
    selectedOption: {
        backgroundColor: AppColors.secondaryColor,
    },
    optionText: {
        color: AppColors.white,
        fontSize: wp("3%"),
        fontFamily: "zen_kaku_regular",
    },
    closeButton: {
        position: 'absolute',
        right: wp("1%"),
        padding: wp("4%"),
    },
    closeButtonText: {
        fontSize: wp("5%"),
        color: AppColors.red,
    },
});
