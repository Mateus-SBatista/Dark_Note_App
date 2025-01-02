import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteCard from '../components/NoteCard';
import styles from '../styles/styles';
import { FontAwesome5 } from '@expo/vector-icons';

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

  const formatDateTime = (date) => {
    const dateTime = new Date(date);
    const formattedDate = dateTime.toLocaleDateString(); // Exemplo: 01/01/2025
    const formattedTime = dateTime.toLocaleTimeString(); // Exemplo: 14:35:20
    return { date: formattedDate, time: formattedTime };
  };

  const addNote = (title, content, noteId = null) => {
    let updatedNotes;
    const { date, time } = formatDateTime(Date.now());

    if (noteId) {
      // Edita a nota existente e atualiza o horário de modificação
      updatedNotes = notes.map((note) =>
        note.id === noteId
          ? { ...note, title, content, updatedAt: { date, time } }
          : note
      );
    } else {
      // Adiciona uma nova nota
      updatedNotes = [
        ...notes,
        {
          id: Date.now().toString(),
          title,
          content,
          createdAt: { date, time },
          updatedAt: null, // Sem atualização no momento da criação
        },
      ];
    }
    setNotes(updatedNotes);
    saveNotes(updatedNotes); // Salva no AsyncStorage
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('NoteDetail', {
                addNote,
                deleteNote,
                noteId: item.id,
                existingTitle: item.title,
                existingContent: item.content,
              })
            }
            style={styles.noteItem}
          >
            <View style={styles.noteHeader}>
              <FontAwesome5 name="skull" size={20} color="#fff" style={styles.skullIcon} />
              <View style={styles.noteDateContainer}>
                <Text style={styles.noteDate}>
                  {item.updatedAt ? item.updatedAt.date : item.createdAt.date}
                </Text>
                <Text style={styles.noteTime}>
                  {item.updatedAt ? item.updatedAt.time : item.createdAt.time}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteContent}>{item.content}</Text>
            </View>
          </TouchableOpacity>
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
