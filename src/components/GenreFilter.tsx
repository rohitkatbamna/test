// src/components/GenreFilter.tsx
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, FlatList, View } from 'react-native';
import { Genre } from '../types';
import { useFonts, Saira_400Regular } from '@expo-google-fonts/saira';

interface GenreFilterProps {
    genres: Genre[];
    selectedGenre: number[] | null;
    setSelectedGenre: React.Dispatch<React.SetStateAction<number[] | null>>;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selectedGenre, setSelectedGenre }) => {
    let [fontsLoaded] = useFonts({
        Saira_400Regular,
    });
    if (!fontsLoaded) return null;
    const onPress = (id: number) => {
        setSelectedGenre((prev) => {
            if (id === 0) return null;
            if (prev?.includes(id)) {
                return prev.filter((genreId) => genreId !== id);
            } else {
                return [...(prev || []), id];
            }
        });
    };

    return (
        <FlatList
            data={genres}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onPress(item.id)}>
                    <View
                        style={
                            selectedGenre?.includes(item.id) ? styles.selectedGenre : styles.genre
                        }
                    >
                        <Text
                            style={
                                selectedGenre?.includes(item.id)
                                    ? styles.selectedGenreText
                                    : styles.genreText
                            }
                        >
                            {item.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
            style={styles.genreFilter}
            horizontal={true}
        />
    );
};
const styles = StyleSheet.create({
    genreFilter: {
        maxHeight: 50,
        backgroundColor: '#242424',
    },
    genre: {
        margin: 5,
        padding: 5,
        backgroundColor: '#484848',
        borderRadius: 5,
    },
    genreText: {
        color: '#F5F5F5',
        fontFamily: 'Saira_400Regular',
    },
    selectedGenre: {
        margin: 5,
        padding: 5,
        backgroundColor: '#F0283C',
        borderRadius: 5,
    },
    selectedGenreText: {
        color: '#F3F4F6',
        fontWeight: '600',
        fontFamily: 'Saira_400Regular',
    },
});

export default GenreFilter;
