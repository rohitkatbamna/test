// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert, Image } from 'react-native';
import GenreFilter from '../components/GenreFilter';
import MovieList from '../components/MovieList';
import { Movie, Genre } from '../types';
import fetchCall from '../util/fetchCall';

const HomeScreen: React.FC = () => {
    const [movies, setMovies] = useState<{ [year: number]: Movie[] }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number[] | null>(null);
    const [currentYear, setCurrentYear] = useState<number>(2012);
    const [earliestYear, setEarliestYear] = useState<number>(2012);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [loadingOlder, setLoadingOlder] = useState<boolean>(false);

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (selectedGenre !== null) {
            setCurrentYear(2012);
            setEarliestYear(2012);
            setMovies({});
            fetchMovies(2012, true);
        }
    }, [selectedGenre]);

    const fetchInitialData = async () => {
        await fetchGenres();
        await fetchMovies(2012);
    };

    const fetchMovies = async (fetchYear: number, reset = false, loadOlder = false) => {
        if (loading || loadingMore || loadingOlder) return;
        if (reset) setLoading(true);
        if (loadOlder) setLoadingOlder(true);
        if (!reset && !loadOlder) setLoadingMore(true);

        try {
            const data = await fetchCall({
                endpoint: 'discover/movie',
                params: {
                    with_origin_country: 'IN',
                    primary_release_year: fetchYear,
                    with_genres: selectedGenre === null ? undefined : selectedGenre?.join(','),
                    sort_by: 'popularity.desc',
                },
            });

            setMovies((prevMovies) => ({
                ...prevMovies,
                [fetchYear]: reset
                    ? data.results
                    : [...(prevMovies[fetchYear] || []), ...data.results],
            }));

            if (loadOlder) {
                setEarliestYear(fetchYear);
            } else {
                setCurrentYear(fetchYear);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to fetch movies.');
        } finally {
            if (reset) setLoading(false);
            if (loadOlder) setLoadingOlder(false);
            if (!reset && !loadOlder) setLoadingMore(false);
        }
    };

    const fetchMoreMovies = async () => {
        if (!loadingMore) {
            const nextYear = currentYear + 1;
            if (nextYear <= new Date().getFullYear()) {
                await fetchMovies(nextYear);
            }
        }
    };

    const fetchOlderMovies = async () => {
        if (!loadingOlder) {
            const previousYear = earliestYear - 1;
            await fetchMovies(previousYear, false, true);
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

    const groupedMovies = Object.keys(movies)
        .sort((a, b) => Number(a) - Number(b)) // Sort older to newer
        .map((year: any) => ({
            year: Number(year),
            data: movies[year],
        }));

    return (
        <View style={styles.container}>
            <View
                style={{
                    backgroundColor: '#242424',
                    padding: 10,
                }}
            >
                <Image source={require('../../assets/fancode-fc.png')} />
                <GenreFilter
                    genres={genres}
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                />
            </View>

            {loading ? (
                <ActivityIndicator size='large' color='#0000ff' style={styles.loading} />
            ) : (
                <MovieList
                    groupedMovies={groupedMovies}
                    genres={genres}
                    fetchMoreMovies={fetchMoreMovies}
                    fetchOlderMovies={fetchOlderMovies}
                    loadingOlder={loadingOlder}
                    loadingMore={loadingMore}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        marginTop: 30,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
