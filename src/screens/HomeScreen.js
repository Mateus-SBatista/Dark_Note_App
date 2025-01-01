import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteCard from '../components/NoteCard';
import styles from '../styles/styles';

const STORAGE_KEY = '@notes_app_notes';

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedNotes) setNotes(JSON.parse(storedNotes));
      } catch (error) {
        console.error('Erro ao carregar as notas:', error);
      }
    };
    loadNotes();
  }, []);

  const saveNotes = async (notes) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Erro ao salvar as notas:', error);
    }
  };

  const addNote = (title, content, noteId = null) => {
    const updatedNotes = noteId
      ? notes.map((note) => (note.id === noteId ? { ...note, title, content } : note))
      : [...notes, { id: Date.now().toString(), title, content }];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() =>
              navigation.navigate('NoteDetail', {
                addNote,
                deleteNote,
                noteId: item.id,
                existingTitle: item.title,
                existingContent: item.content,
              })
            }
          />
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NoteDetail', { addNote })}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
