// src/components/PhotoItem.js
import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { db, storage } from '../../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../contexts/AuthContext';

const PhotoItem = ({ photo, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tagName, setTagName] = useState('');
  const [taggedFaces, setTaggedFaces] = useState(photo.taggedFaces || []);
  const { user } = useAuth();
  
  const handlePhotoPress = () => {
    onSelect(photo);
  };
  
  const handleTagFace = async () => {
    if (!tagName.trim()) return;
    
    // In a real app, you would update the face tag in Firestore
    const newTag = {
      name: tagName,
      faceId: Math.random().toString(), // Simulate a unique face ID
      timestamp: new Date().toISOString()
    };
    
    const updatedTags = [...taggedFaces, newTag];
    setTaggedFaces(updatedTags);
    
    try {
      // Simulate updating Firebase
      console.log('Updating face tag in Firebase:', newTag);
      // In reality, you would do something like:
      // await updateDoc(doc(db, 'photos', photo.id), {
      //   taggedFaces: arrayUnion(newTag)
      // });
      
      setTagName('');
      setModalVisible(false);
    } catch (error) {
      console.error('Error tagging face:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePhotoPress}>
        <Image source={{ uri: photo.uri }} style={styles.image} />
        
        {photo.faces && photo.faces.length > 0 && (
          <View style={styles.faceBadge}>
            <Text style={styles.faceBadgeText}>{photo.faces.length}</Text>
            <Ionicons name="person" size={12} color="#ffffff" />
          </View>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tagButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="pricetag" size={20} color="#2196F3" />
      </TouchableOpacity>
      
      {/* Tag Face Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tag a Face</Text>
            
            <Image source={{ uri: photo.uri }} style={styles.modalImage} />
            
            <TextInput
              label="Name"
              value={tagName}
              onChangeText={setTagName}
              style={styles.input}
            />
            
            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={handleTagFace}>
                Save Tag
              </Button>
              <Button 
                mode="outlined" 
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
                Cancel
              </Button>
            </View>
            
            {taggedFaces.length > 0 && (
              <View style={styles.taggedList}>
                <Text style={styles.taggedTitle}>Tagged People:</Text>
                {taggedFaces.map((tag, index) => (
                  <View key={index} style={styles.tagItem}>
                    <Ionicons name="person-circle" size={24} color="#2196F3" />
                    <Text style={styles.tagName}>{tag.name}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    width: '47%',
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  faceBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(33, 150, 243, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  faceBadgeText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
    marginRight: 2,
  },
  tagButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    marginLeft: 10,
  },
  taggedList: {
    marginTop: 20,
  },
  taggedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  tagName: {
    marginLeft: 10,
    fontSize: 14,
  },
});

export default PhotoItem;