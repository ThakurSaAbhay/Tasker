import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import apiClient from '../api/client';
import { ThemedView } from '../../components/ThemedView';

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddTask = async () => {
    try {
      setLoading(true);
      await apiClient.post('/tasks', {
        title,
        description,
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
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
        onPress={handleAddTask}
        loading={loading}
        style={styles.button}
        buttonColor='#bf8704'
      >
        Add Task
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
}); 