// src/components/GenreFilter.tsx
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Genre } from '../types';

interface GenreFilterProps {
    genres: Genre[];
    selectedGenre: number[] | null;
    setSelectedGenre: React.Dispatch<React.SetStateAction<number[] | null>>;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selectedGenre, setSelectedGenre }) => {
    return (
        <FlatList
            data={genres}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() =>
                        setSelectedGenre((prev) => {
                            if (prev?.includes(item.id)) {
                                return prev.filter((id) => id !== item.id);
                            } else {
                                return [...(prev || []), item.id];
                            }
                        })
                    }
                    style={styles.genreContainer}
                >
                    <Text
                        style={
                            selectedGenre?.includes(item.id) ? styles.selectedGenre : styles.genre
                        }
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )}
            style={styles.genreFilter}
            horizontal={true}
        />
    );
};
const styles = StyleSheet.create({
    genreFilter: {
        maxHeight: 200, // Adjust height as needed
    },
    genreContainer: {
        paddingBottom: 10,
    },
    genre: {
        margin: 5,
        padding: 5,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    selectedGenre: {
        margin: 5,
        padding: 5,
        backgroundColor: '#666',
        color: '#fff',
        borderRadius: 5,
    },
});

export default GenreFilter;
