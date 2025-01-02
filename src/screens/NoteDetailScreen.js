import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/styles';

// Substitua a View principal:
const NoteDetailScreen = ({ route, navigation }) => {
  const { addNote, deleteNote, noteId, existingTitle, existingContent } = route.params;
  const [title, setTitle] = useState(existingTitle || '');
  const [content, setContent] = useState(existingContent || '');

  const handleSave = () => {
    if (content.trim()) {
      if (noteId) {
        addNote(title, content, noteId);
      } else {
        addNote(title, content);
      }
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
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true} // Ativa o comportamento no Android
      extraScrollHeight={100} // Ajusta o deslocamento para visibilidade
    >
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
    </KeyboardAwareScrollView>
  );
};
export default NoteDetailScreen;
