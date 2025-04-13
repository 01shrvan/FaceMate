// src/screens/SharedPhotosScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Text, ActivityIndicator, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const SharedPhotosScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    // In a real app, fetch shared photos from Firebase
    // For the prototype, use sample data
    const fetchSharedPhotos = () => {
      setLoading(true);
      
      // Sample shared photos
      const sampleSharedPhotos = [
        {
          id: '101',
          uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
          sharedBy: 'Alex Johnson',
          timestamp: new Date().toISOString(),
          event: 'Beach Day',
        },
        {
          id: '102',
          uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
          sharedBy: 'Sam Wilson',
          timestamp: new Date().toISOString(),
          event: 'Birthday Party',
        },
        {
          id: '103',
          uri: 'https://images.unsplash.com/photo-1622495805762-ce1a6c70638e',
          sharedBy: 'Jamie Smith',
          timestamp: new Date().toISOString(),
          event: 'Graduation',
        },
      ];
      
      setPhotos(sampleSharedPhotos);
      setLoading(false);
    };
    
    setTimeout(fetchSharedPhotos, 1000); // Simulate network delay
  }, []);
  
  const handlePhotoPress = (photo) => {
    setSelectedPhoto(photo);
    setModalVisible(true);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const SharedPhotoItem = ({ photo }) => {
    return (
      <TouchableOpacity 
        style={styles.photoItem}
        onPress={() => handlePhotoPress(photo)}
      >
        <Image source={{ uri: photo.uri }} style={styles.photoImage} />
        <View style={styles.photoInfo}>
          <Text style={styles.photoEvent}>{photo.event}</Text>
          <Text style={styles.photoSharedBy}>From: {photo.sharedBy}</Text>
          <Text style={styles.photoTimestamp}>{formatDate(photo.timestamp)}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shared With You</Text>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text>Loading shared photos...</Text>
        </View>
      ) : (
        <>
          {photos.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="images-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>No shared photos yet</Text>
              <Text style={styles.emptySubtext}>
                Photos shared with you will appear here
              </Text>
            </View>
          ) : (
            <FlatList
              data={photos}
              renderItem={({ item }) => <SharedPhotoItem photo={item} />}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.photoList}
              ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            />
          )}
          
          {/* Photo Detail Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {selectedPhoto && (
                  <>
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalEvent}>{selectedPhoto.event}</Text>
                      <Text style={styles.modalSharedBy}>
                        Shared by {selectedPhoto.sharedBy}
                      </Text>
                    </View>
                    
                    <Image 
                      source={{ uri: selectedPhoto.uri }} 
                      style={styles.modalImage} 
                    />
                    
                    <View style={styles.modalActions}>
                      <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="heart-outline" size={24} color="#2196F3" />
                        <Text style={styles.actionText}>Like</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="download-outline" size={24} color="#2196F3" />
                        <Text style={styles.actionText}>Save</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="share-social-outline" size={24} color="#2196F3" />
                        <Text style={styles.actionText}>Share</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  photoList: {
    paddingVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  photoItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  photoImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  photoInfo: {
    marginLeft: 15,
    justifyContent: 'center',
    flex: 1,
  },
  photoEvent: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  photoSharedBy: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  photoTimestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: 15,
  },
  modalEvent: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalSharedBy: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  modalImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
  },
  closeButton: {
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  closeText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
});

export default SharedPhotosScreen;