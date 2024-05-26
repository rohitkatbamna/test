// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Alert, Text } from 'react-native';
import MovieCard from '../components/MovieCard';
import GenreFilter from '../components/GenreFilter';
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
            await fetchMovies(nextYear);
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

    const renderFooter = () => {
        if (!loadingMore) return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        );
    };

    const renderHeader = () => {
        if (!loadingOlder) return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        );
    };

    const groupedMovies = Object.keys(movies)
        .sort((a, b) => Number(a) - Number(b)) // Sort older to newer
        .map((year: any) => ({
            year: Number(year),
            data: movies[year],
        }));

    return (
        <View style={styles.container}>
            <View style={styles.genreContainer}>
                <GenreFilter
                    genres={genres}
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                />
            </View>
            {loading ? (
                <ActivityIndicator size='large' color='#0000ff' style={styles.loading} />
            ) : (
                <FlatList
                    data={groupedMovies}
                    keyExtractor={(item) => item.year.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>{item.year}</Text>
                            </View>
                            {item.data.length === 0 ? (
                                <Text style={styles.noMoviesText}>No movies available</Text>
                            ) : (
                                <FlatList
                                    data={item.data}
                                    keyExtractor={(movie) => movie.id.toString()}
                                    renderItem={({ item: movie }) => (
                                        <MovieCard key={movie.id} movie={movie} genres={genres} />
                                    )}
                                    numColumns={2}
                                    columnWrapperStyle={styles.columnWrapper}
                                />
                            )}
                        </View>
                    )}
                    onEndReached={fetchMoreMovies}
                    onEndReachedThreshold={0.5}
                    onRefresh={fetchOlderMovies}
                    refreshing={loadingOlder}
                    ListFooterComponent={renderFooter}
                    ListHeaderComponent={renderHeader}
                    style={styles.movieList}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    genreContainer: {
        maxHeight: 200,
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
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#ddd',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    noMoviesText: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 10,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
});

export default HomeScreen;
