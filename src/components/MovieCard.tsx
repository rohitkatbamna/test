// src/components/MovieCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Movie, Genre } from '../types';

interface MovieCardProps {
    movie: Movie;
    genres: Genre[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, genres }) => {
    return (
        <View style={styles.movieCard}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                style={styles.movieImage}
            />
            <View style={styles.movieDetails}>
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <Text style={styles.movieGenre}>
                    {movie.genre_ids
                        .map((genreId) => genres.find((genre) => genre.id === genreId)?.name)
                        .join(', ')}
                </Text>
                <Text style={styles.movieDescription}>{movie.overview}</Text>
            </View>
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
        width: 100,
        height: 150,
        borderRadius: 5,
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
