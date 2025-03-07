import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, logout } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: 'Tasks',
              headerRight: () => (
                <IconButton
                  icon="logout"
                  onPress={logout}
                />
              ),
            }}
          />
          <Stack.Screen 
            name="AddTask" 
            component={AddTaskScreen}
            options={{ title: 'Add Task' }}
          />
          <Stack.Screen 
            name="TaskDetail" 
            component={TaskDetailScreen}
            options={{ title: 'Task Details' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Signup" 
            component={SignupScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}