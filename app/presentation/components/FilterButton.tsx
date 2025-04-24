import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { IgdbApiDelivery } from '../../data/sources/remote/igdbAPI/IgdbApiDelivery';
import {AppColors} from "../theme/AppTheme";

interface FilterModalProps {
    onApply: (filters: { category: string | null; platform: string | null }) => void;
}

function FilterModal({ onApply}: FilterModalProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                setLoading(true);

                const genreRes = await IgdbApiDelivery.post('genres', 'fields name; limit 100;');
                const platRes = await IgdbApiDelivery.post('platforms', 'fields name; limit 500;');

                const popularPlatforms = [
                    'PlayStation 5',
                    'Xbox Series X',
                    'Nintendo Switch',
                    'PC (Microsoft Windows)',
                    'PlayStation 4',
                    'Xbox One',
                    'Nintendo 3DS',
                    'iOS',
                    'Game Boy Advance',
                    'Xbox',
                    'Nintendo DS',
                    'Nintendo Switch 2',
                    'Game Boy',
                    'Xbox Series X|S',
                    'Android',
                ];

                const filteredPlatforms = platRes.data.filter((platform: any) =>
                    popularPlatforms.some(popularPlatform =>
                        platform.name.toLowerCase() === popularPlatform.toLowerCase()
                    )
                );

                setCategories(genreRes.data.map((c: { name: string }) => c.name));
                setPlatforms(filteredPlatforms.map((p: { name: string }) => p.name));

                setLoading(false);
            } catch (err) {
                console.error('Error fetching filters:', err);
                setLoading(false);
            }
        };
        fetchFilters();
    }, []);

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
            category: selectedCategory,
            platform: selectedPlatform,
        });

        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Filter</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
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
                                <Text style={styles.label}>Categories</Text>
                                <View style={styles.divider} />
                                {renderOptions(categories, selectedCategory, setSelectedCategory)}
                                <View style={styles.divider} />
                                <Text style={styles.label}>Platforms</Text>
                                <View style={styles.divider} />
                                {renderOptions(platforms, selectedPlatform, setSelectedPlatform)}
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
        padding: 20,
    },
    button: {
        backgroundColor: '#19114b',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        minWidth:"auto",
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontFamily: "zen_kaku_light",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(246,237,237,0.3)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: AppColors.colorButton,
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
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 6,
        fontSize: 16,
        color: AppColors.white,
        fontFamily: "zen_kaku_light",
        height: 25,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    optionButton: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    selectedOption: {
        backgroundColor: '#007BFF',
    },
    optionText: {
        color: '#333',
    },
    selectedText: {
        color: '#fff',
        fontWeight: '600',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        padding: 8,
    },
    closeButtonText: {
        fontSize: 22,
        color: '#ff0000',
    },
});
