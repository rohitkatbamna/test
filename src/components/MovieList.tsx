// src/components/MovieList.tsx
import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Movie, Genre } from '../types';
import MovieCard from './MovieCard';

interface MovieListProps {
    groupedMovies: { year: number; data: Movie[] }[];
    genres: Genre[];
    fetchMoreMovies: () => void;
    fetchOlderMovies: () => void;
    loadingOlder: boolean;
    loadingMore: boolean;
}

const MovieList: React.FC<MovieListProps> = ({
    groupedMovies,
    genres,
    fetchMoreMovies,
    fetchOlderMovies,
    loadingOlder,
    loadingMore,
}) => {
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

    return (
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
                                <MovieCard key={movie.id} movie={movie} genres={[]} />
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
    );
};

const styles = StyleSheet.create({
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    noMoviesText: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 10,
        color: '#fff',
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    movieList: {
        flex: 1,
    },
});

export default MovieList;
