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

interface FilterModalProps {
    onApply: (filters: { category: string | null; platform: string | null }) => void;
    selectedPlatform: string | null;
    selectedGenre: string | null;
}

function FilterModal({ onApply, selectedGenre, selectedPlatform}: FilterModalProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [selectedCategoryInModal, setSelectedCategoryInModal] = useState<string | null>(null);
    const [selectedPlatformInModal, setSelectedPlatformInModal] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
        const fetchFilters = async () => {
            try {
                setLoading(true);
                const genreRes = await IgdbApiDelivery.post('genres', 'fields name; limit 30;');
                const popularPlatforms = [
                    'PlayStation 5',
                    'Xbox Series X|S',
                    'Nintendo Switch 2',
                    'PC (Microsoft Windows)',
                    'PlayStation 4',
                    'Xbox One',
                    'Nintendo Switch',
                    'PlayStation 3',
                    'PlayStation 2',
                    'Xbox 360',
                    'Nintendo 3DS',
                    'Nintendo DS',
                    'iOS',
                    'Android',
                ];

                setCategories(genreRes.data.map((c: { name: string }) => c.name));
                setPlatforms(popularPlatforms);
                setSelectedPlatformInModal(selectedPlatform);
                setSelectedCategoryInModal(selectedGenre);
                setLoading(false);
            } catch (err) {
                console.log('Error fetching filters:', err);
                setLoading(false);
            }
        };
        fetchFilters();
    }, []));

    const renderOptions = (data: string[], selected: string | null, setSelected: (val: string | null) => void) => (
        <View style={styles.optionsContainer}>
            {data.map((item) => (
                <TouchableOpacity
                    key={item}
                    style={[styles.optionButton, selected === item && styles.selectedOption]}
                    onPress={() => setSelected(selected === item ? null : item)}
                >
                    <Text style={selected === item ? styles.selectedText : styles.optionText}>
                        {item}
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
                       style={{width: wp("7%"), height: wp("7%"), tintColor: AppColors.white}}
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
                        <Text style={styles.title}>Filter</Text>

                        {loading ? (
                            <ActivityIndicator size="large" />
                        ) : (
                            <ScrollView>
                                <Text style={styles.label}>Platforms</Text>
                                <View style={styles.divider} />
                                {renderOptions(platforms, selectedPlatformInModal, setSelectedPlatformInModal)}
                                <View style={styles.divider} />
                                <Text style={styles.label}>Categories</Text>
                                <View style={styles.divider} />
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
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    container: {
        paddingHorizontal: wp("5.4%"),
    },
    button: {
        backgroundColor: AppColors.transparent,
    },

    buttonText: {
        color: '#fff',
        fontSize: wp("3.9%"),
        fontFamily: "zen_kaku_bold",
        height:25,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.48)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: AppColors.buttonBackground,
        padding: 20,
        borderRadius: 12,
        maxHeight: '80%',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: AppColors.white,
        fontFamily: "zen_kaku_medium",
    },
    label: {
        marginTop: 10,
        textAlign: "center",
        marginBottom: 6,
        fontSize: 16,
        color: AppColors.white,
        fontFamily: "zen_kaku_medium",
        height: 25,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    optionButton: {
        backgroundColor: AppColors.buttonBackground,
        padding: 8,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    selectedOption: {
        backgroundColor: AppColors.neonPurple,
    },
    optionText: {
        color: AppColors.white,
    },
    selectedText: {
        color: '#fff',
    },
    closeButton: {
        position: 'absolute',
        top: wp("2%"),
        right: wp("4%"),
        zIndex: 1,
        padding: 8,
    },
    closeButtonText: {
        fontSize: wp("5%"),
        color: AppColors.red,
    },
});
