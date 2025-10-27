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

interface FilterModalProps {
    onApply: (filters: { category: Platform | null; platform: Platform | null }) => void;
    selectedPlatform: Platform | null;
    selectedGenre: Platform | null;
}

function FilterModal({ onApply, selectedGenre, selectedPlatform}: FilterModalProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState<Platform[]>([]);
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [selectedCategoryInModal, setSelectedCategoryInModal] = useState<Platform | null>(null);
    const [selectedPlatformInModal, setSelectedPlatformInModal] = useState<Platform | null>(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
        const fetchFilters = async () => {
            try {
                setLoading(true);
                const genreRes = await IgdbApiDelivery.post('genres', 'fields name, id; limit 30;');
                const popularPlatforms: Platform [] = [
                    {
                        id:167,
                        name:'PlayStation 5'
                    },
                    {
                        id:169,
                        name:'Xbox Series X|S'
                    },
                    {
                        id:6,
                        name:'PC (Microsoft Windows)'
                    },
                    {
                        id:48,
                        name:'PlayStation 4'
                    },
                    {
                        id:49,
                        name:'Xbox One'
                    },
                    {
                        id:130,
                        name:'Nintendo Switch'
                    },
                    {
                        id:9,
                        name:'PlayStation 3',
                    },
                    {
                        id:8,
                        name:'PlayStation 2',
                    },

                    {
                        id:12,
                        name:'Xbox 360',
                    },

                    {
                        id:37,
                        name:'Nintendo 3DS',
                    },

                    {
                        id:20,
                        name:'Nintengo DS',
                    },
                    {
                        id:39,
                        name:'iOS',
                    },
                    {
                        id:34,
                        name:'Android',
                    },
                ];
                setCategories(genreRes.data);
                setPlatforms(popularPlatforms);
                console.log(selectedGenre?.name);
                console.log(selectedPlatform?.name);
                setSelectedPlatformInModal(selectedPlatform);
                setSelectedCategoryInModal(selectedGenre);
                console.log(selectedCategoryInModal?.id)
                console.log(selectedPlatformInModal?.id)
                setLoading(false);
            } catch (err) {
                console.log('Error fetching filters:', err);
                setLoading(false);
            }
        };
        fetchFilters();
    }, []));

    const renderOptions = (data: Platform[], selected: Platform | null, setSelected: (val: Platform | null) => void) => (
        <View style={styles.optionsContainer}>
            {data.map((item) => (
                <TouchableOpacity
                    key={item.name}
                    style={[styles.optionButton, selected?.name === item.name && styles.selectedOption]}
                    onPress={() => setSelected(selected?.name === item.name ? null : item)}
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
            category: selectedCategoryInModal,
            platform: selectedPlatformInModal,
        });
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Image source={require("../../../assets/filter-icon.png")}
                       style={{
                           width: wp("7%"),
                           height: wp("7%"),
                           tintColor: selectedGenre == null && selectedPlatform == null ? AppColors.gray : AppColors.white,
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
                                {renderOptions(platforms, selectedPlatformInModal, setSelectedPlatformInModal)}
                                <Text style={styles.label}>Categories</Text>
                                {renderOptions(categories, selectedCategoryInModal, setSelectedCategoryInModal)}
                            </ScrollView>
                        )}
                        <TouchableOpacity
                            style={[styles.button, { marginTop: 20 }]}
                            onPress={applyFilters}
                        >
                            <Text style={styles.buttonText}>Apply Filters</Text>
                        </TouchableOpacity>
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
