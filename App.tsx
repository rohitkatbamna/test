// src/App.tsx
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { StatusBar } from 'react-native';

const App: React.FC = () => {
    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <HomeScreen />
        </>
    );
};

export default App;
