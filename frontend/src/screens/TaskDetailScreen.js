import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import apiClient from '../api/client';
import { ThemedView } from '../../components/ThemedView';
import { Audio } from 'expo-av';


export default function TaskDetailScreen({ route, navigation }) {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = React.useState();


  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const fetchTask = async () => {
    try {
      const response = await apiClient.get(`/tasks/${taskId}`);
      setTask(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      console.error('Error fetching task:', error);
      navigation.goBack();
    }
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/delete.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }
  useEffect(() => {
    return sound
      ? () => sound.unloadAsync()
      : undefined;
  }, [sound]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await apiClient.put(`/tasks/${taskId}`, {
        title,
        description,
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await apiClient.delete(`/tasks/${taskId}`);
              await playSound();
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting task:', error);
              alert('Failed to delete task');
            }
          },
        },
      ]
    );
  };

  if (!task) return null;

  return (
    <ThemedView style={styles.container} lightColor='#fff' darkColor='#bf8704' >
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
        theme={{ colors: { primary: '#bf8704' }}}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        style={styles.input}
        multiline
        numberOfLines={4}
        theme={{ colors: { primary: '#bf8704' }}}
      />
      <Button
        mode="contained"
        onPress={handleUpdate}
        loading={loading}
        style={styles.button}
        buttonColor='#bf8704'
      >
        Update Task
      </Button>
      <Button
        mode="contained"
        onPress={handleDelete}
        style={styles.deleteButton}
        buttonColor='#ff0000'
      >
        Delete
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  deleteButton: {
    borderColor:'#fff',
    marginTop: 16,
  },
});
