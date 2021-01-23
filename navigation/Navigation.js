import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import ManagementEmployeeScreen from '../screens/ManagementEmployeeScreen';
import EmployeeDetailsScreen from '../screens/EmployeeDetailsScreen';

const Stack = createStackNavigator();

const Navigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ManagementEmployeeScreen" component={ManagementEmployeeScreen} />
        <Stack.Screen name="EmployeeDetailsScreen" component={EmployeeDetailsScreen} />
    </Stack.Navigator>
)

export default Navigator;