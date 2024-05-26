// src/components/MovieCard.tsx
import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Movie, Genre } from '../types';

interface MovieCardProps {
    movie: Movie;
    genres: Genre[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, genres }) => {
    return (
        <View style={styles.movieCard}>
            <ImageBackground
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                style={styles.movieImage}
            >
                <Text style={styles.movieTitle}>{movie.title}</Text>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    movieCard: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
    },
    movieImage: {
        width: 158,
        height: 222,
        borderRadius: 10,
    },
    movieDetails: {
        flex: 1,
        marginLeft: 10,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    movieGenre: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
    },
    movieDescription: {
        fontSize: 14,
    },
});

export default MovieCard;
