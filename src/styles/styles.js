import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Todos os estilos do código original
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
    left: -3,
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
    minHeight: 400, // Para manter o espaço inicial adequado
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
  noteHeader: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: 'center',
    marginBottom: -15,
  },
  
  noteDateContainer: {
    flexDirection: 'column', // Alinha a data e a hora verticalmente
    alignItems: 'flex-end', // Alinha ao lado esquerdo
  },
  
  noteDate: {
    fontSize: 12,
    color: '#aaa',
  },
  
  noteTime: {
    fontSize: 10,
    color: '#ccc',
  },  
  
});
