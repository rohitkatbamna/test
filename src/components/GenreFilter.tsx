// src/components/GenreFilter.tsx
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Genre } from '../types';

interface GenreFilterProps {
    genres: Genre[];
    selectedGenre: number | null;
    onSelectGenre: (genreId: number | null) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selectedGenre, onSelectGenre }) => {
    return (
        <FlatList
            data={genres}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onSelectGenre(item.id)}>
                    <Text style={selectedGenre === item.id ? styles.selectedGenre : styles.genre}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )}
            style={styles.genreFilter}
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
