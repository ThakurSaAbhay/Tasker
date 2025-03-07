import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Text, Image } from 'react-native';
import { FAB, Card, IconButton } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/client';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Audio } from 'expo-av';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { logout } = useAuth();
  const [sound, setSound] = React.useState();

  const fetchTasks = async () => {
    try {
      const response = await apiClient.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchTasks);
    return () => unsubscribe();
  }, [navigation]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/status.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => sound.unloadAsync()
      : undefined;
  }, [sound]);

  const renderTask = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('TaskDetail', { taskId: item._id })}
      theme={{ colors: { primary: '#bf8704' } }}
    >
      <Card.Content>
        <ThemedText type="subtitle" style={{ color: '#bf8704' }}>{item.title}</ThemedText>
        <ThemedText>{item.description}</ThemedText>
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon={item.completed ? 'check-circle' : 'circle-outline'}
          onPress={() => toggleTaskStatus(item._id, !item.completed)}
          iconColor="#bf8704"
        />
      </Card.Actions>
    </Card>
  );

  const toggleTaskStatus = async (taskId, completed) => {
    try {
      await playSound();  // Play sound first
      await apiClient.put(`/tasks/${taskId}`, { completed });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {(tasks.length != 0) ?
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        :
        <View style={styles.placeholder}>
         
         <Image 
        source={require('../../assets/images/no-pending-tasks.png')} // Local image
        style={styles.image}
        resizeMode="contain" // Optional (cover, contain, stretch, center)
      />
          <Text style={styles.text}>No tasks pending</Text>
        </View>
      }
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddTask')}
        theme={{ colors: { primary: '#bf8704' } }}
        color='#fff'
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 8,
    backgroundColor: '#fff0cc',
  },
  fab: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
    right: 0,
    bottom: 20,
    backgroundColor: '#bf8704',
  },
  placeholder: {
    width: '100%',
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -50 }],
    textAlign: 'center',
    fontSize: 16,
  },
  placeholder: {
    width: '100%',
    position: 'absolute',
    top: '35%',
    transform: [{ translateY: -50 }],
    alignItems: 'center', // Centers image & text horizontally
    justifyContent: 'center', // Centers content vertically
  },
  image: {
    width: 200,  // Set image width
    height: 200, // Set image height
    marginBottom: 10, // Adds space between image & text
    opacity: 0.4, 
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#bf8704', // Optional color
  },
});
