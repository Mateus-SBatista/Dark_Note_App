import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const Stack = createStackNavigator();

const STORAGE_KEY = '@notes_app_notes'; // Chave do armazenamento

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  // Carregar notas do AsyncStorage ao inicializar
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error('Erro ao carregar as notas:', error);
      }
    };
    loadNotes();
  }, []);

  // Salvar notas no AsyncStorage
  const saveNotes = async (notes) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Erro ao salvar as notas:', error);
    }
  };

  const addNote = (title, content, noteId = null) => {
    let updatedNotes;
    if (noteId) {
      // Edita a nota existente
      updatedNotes = notes.map((note) =>
        note.id === noteId ? { ...note, title, content } : note
      );
    } else {
      // Adiciona uma nova nota
      updatedNotes = [...notes, { id: Date.now().toString(), title, content }];
    }
    setNotes(updatedNotes);
    saveNotes(updatedNotes); // Salva no AsyncStorage
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes); // Salva no AsyncStorage
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('NoteDetail', {
              addNote,
              deleteNote,
              noteId: item.id,
              existingTitle: item.title,
              existingContent: item.content
            })}
            style={styles.noteItem}
          >
            <FontAwesome5 name="skull" size={20} color="#fff" style={styles.skullIcon} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
  noteItem: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    flex: 1,
    maxWidth: '45%', // Garante que os blocos se alinhem lado a lado
    height: 150, // Tamanho fixo para o bloco quadrado (altura e largura iguais)
    justifyContent: 'space-between',
    position: 'relative',
  },
  skullIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    marginTop: 30,
    textAlign: 'center',
  },
  noteContent: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'left',
    flexShrink: 1, // Garante que o conteúdo maior se ajuste sem expandir o bloco
  },
  addButton: {
    backgroundColor: '#2f2f2f',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  titleInput: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 18,
  },
  contentInput: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    height: 630,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    gap: 30
  },
  saveIcon: {
    marginRight: 15,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#fff' }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Minhas Notas' }} />
        <Stack.Screen name="NoteDetail" component={NoteDetailScreen} options={{ title: 'Nota Detalhada' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
