import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from '../styles/styles';

const NoteCard = ({ note, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.noteItem}>
    <FontAwesome5 name="skull" size={20} color="#fff" style={styles.skullIcon} />
    <View style={{ flex: 1 }}>
      <Text style={styles.noteTitle}>{note.title}</Text>
      <Text style={styles.noteContent}>{note.content}</Text>
    </View>
  </TouchableOpacity>
);

export default NoteCard;
