import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/styles';

const NoteDetailScreen = ({ route, navigation }) => {
  const { addNote, deleteNote, noteId, existingTitle, existingContent } = route.params;
  const [title, setTitle] = useState(existingTitle || '');
  const [content, setContent] = useState(existingContent || '');

  const handleSave = () => {
    if (content.trim()) {
      addNote(title, content, noteId);
      navigation.goBack();
    } else {
      alert('Por favor, preencha o conteúdo da nota.');
    }
  };

  const handleDelete = () => {
    if (noteId) {
      deleteNote(noteId);
      navigation.goBack();
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRight}>
          {noteId && (
            <TouchableOpacity onPress={handleDelete}>
              <MaterialIcons name="delete" size={24} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleSave}>
            <MaterialIcons name="save" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, title, content, noteId]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Título da Nota"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Digite sua anotação aqui..."
        placeholderTextColor="#888"
        value={content}
        onChangeText={setContent}
        multiline
      />
    </View>
  );
};

export default NoteDetailScreen;
