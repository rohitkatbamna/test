// src/components/MovieCard.tsx
import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Movie, Genre } from '../types';
import { Archivo_600SemiBold, useFonts } from '@expo-google-fonts/archivo';
interface MovieCardProps {
    movie: Movie;
    genres: Genre[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, genres }) => {
    let [fontsLoaded] = useFonts({
        Archivo_600SemiBold,
    });
    if (!fontsLoaded) return null;
    return (
        <View style={styles.movieCard}>
            <ImageBackground
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                style={styles.movieImage}
            >
                <View style={styles.movieDetails}>
                    <Text style={styles.movieTitle}>{movie.title}</Text>
                    <Text style={styles.movieVote}>{movie.vote_average.toFixed(1)}</Text>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    movieCard: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        elevation: 2,
    },
    movieImage: {
        width: 158,
        height: 222,
        borderRadius: 10,
    },
    movieDetails: {
        width: '100%',
        marginTop: 'auto',
    },
    movieTitle: {
        fontSize: 13,
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 5,
        fontFamily: 'Archivo_600SemiBold',
    },
    movieVote: {
        fontSize: 12,
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginTop: 5,
        fontFamily: 'Archivo_600SemiBold',
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
