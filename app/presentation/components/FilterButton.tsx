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

const FilterModal = () => {
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

                // Filtramos las plataformas para solo mostrar las más populares
                const filteredPlatforms = platRes.data.filter((platform: any) =>
                    popularPlatforms.some(popularPlatform =>
                        platform.name.toLowerCase() === popularPlatform.toLowerCase()
                    )
                );

                // Actualizamos los estados con los nombres de las categorías y plataformas
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

    const renderOptions = (data: string[], selected: string | null, setSelected: (val: string) => void) => (
        <View style={styles.optionsContainer}>
            {data.map((item) => (
                <TouchableOpacity
                    key={item}
                    style={[styles.optionButton, selected === item && styles.selectedOption]}
                    onPress={() => setSelected(item)}
                >
                    <Text style={selected === item ? styles.selectedText : styles.optionText}>
                        {item}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    // Función para aplicar los filtros seleccionados
    const applyFilters = () => {
        // Mostrar los filtros aplicados en la consola (puedes usar estos valores para hacer una consulta a la API)
        console.log('Filtros aplicados:', selectedCategory, selectedPlatform);

        // Aquí es donde aplicarías la lógica para usar los filtros en tu app, por ejemplo:
        // - Hacer una nueva llamada API para obtener juegos filtrados por categoría y plataforma.

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
                        <Text style={styles.title}>Filter</Text>
                        {loading ? (
                            <ActivityIndicator size="large" />
                        ) : (
                            <ScrollView>
                                <Text style={styles.label}>Categories</Text>
                                {renderOptions(categories, selectedCategory, setSelectedCategory)}

                                <Text style={styles.label}>Platforms</Text>
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
    container: {
        padding: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        maxHeight: '80%',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    label: {
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 6,
        fontSize: 16,
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
});
