// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import MovieCard from '../components/MovieCard';
import GenreFilter from '../components/GenreFilter';
import { Movie, Genre } from '../types';
import fetchCall from '../util/fetchCall';

const HomeScreen: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [year, setYear] = useState<number>(2012);
    const [loading, setLoading] = useState<boolean>(false);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

    useEffect(() => {
        fetchMovies(year);
        fetchGenres();
    }, [year]);

    useEffect(() => {
        fetchMovies(year);
    }, [selectedGenre]);

    const fetchMovies = async (year: number) => {
        setLoading(true);
        try {
            const data = await fetchCall({
                endpoint: 'discover/movie',
                params: {
                    sort_by: 'popularity.desc',
                    primary_release_year: year,
                    vote_count_gte: 100,
                    with_genres: selectedGenre,
                },
            });
            setMovies(data.results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchGenres = async () => {
        try {
            const data = await fetchCall({
                endpoint: 'genre/movie/list',
            });
            setGenres(data.genres);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEndReached = () => {
        if (!loading) {
            setYear((prevYear) => prevYear + 1);
        }
    };

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.genreContainer}>
                <GenreFilter
                    genres={genres}
                    selectedGenre={selectedGenre}
                    onSelectGenre={setSelectedGenre}
                />
            </View>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MovieCard movie={item} genres={genres} />}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                style={styles.movieList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    genreContainer: {
        maxHeight: 200, // Adjust height as needed
        marginBottom: 10,
    },
    movieList: {
        flex: 1,
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
