// src/navigation/MainNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

type RootStackParamList = {
    Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator: React.FC = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default MainNavigator;
