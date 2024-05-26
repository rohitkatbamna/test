import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import fetchCall from './util/fetchCall';

export default function App(): React.JSX.Element {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        fetchCall({ endpoint: 'discover/movie' }).then((response) => {
            console.log(response);
            setData(response.results);
        });
    }, []);
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <Text>{JSON.stringify(data)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
