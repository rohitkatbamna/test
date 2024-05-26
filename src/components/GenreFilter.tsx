// src/components/GenreFilter.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Genre } from '../types';

interface GenreFilterProps {
    genres: Genre[];
    selectedGenre: number | null;
    onSelectGenre: (genreId: number | null) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selectedGenre, onSelectGenre }) => {
    return (
        <View style={styles.genreFilter}>
            {genres.map((genre) => (
                <TouchableOpacity key={genre.id} onPress={() => onSelectGenre(genre.id)}>
                    <Text style={selectedGenre === genre.id ? styles.selectedGenre : styles.genre}>
                        {genre.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    genreFilter: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
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
