// src/screens/GalleryScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { FAB, Text, ActivityIndicator } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import PhotoItem from "../components/PhotoItem";
import FaceDetectorComponent from "../components/FaceDetector";
import { useAuth } from "../contexts/AuthContext";
// Removed unused imports
// Removed unused imports
// Removed unused imports

const GalleryScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuth();

  // In a real app, fetch photos from Firebase
  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);

      // For the prototype, just use sample data
      const samplePhotos = [
        {
          id: "1",
          uri: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
          faces: [{ faceID: "face1" }],
          timestamp: new Date().toISOString(),
        },
        {
          id: "2",
          uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
          faces: [{ faceID: "face2" }],
          timestamp: new Date().toISOString(),
        },
        {
          id: "3",
          uri: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
          faces: [{ faceID: "face3" }, { faceID: "face4" }],
          timestamp: new Date().toISOString(),
        },
      ];

      setPhotos(samplePhotos);
      setLoading(false);
    };

    fetchPhotos();
  }, [user]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["photo"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Add the newly selected photo to the list
      const newPhoto = {
        id: Date.now().toString(),
        uri: result.assets[0].uri,
        timestamp: new Date().toISOString(),
      };

      setSelectedPhoto(newPhoto);
      setModalVisible(true);
    }
  };

  const handleFacesDetected = (faces) => {
    if (selectedPhoto && faces.length > 0) {
      setSelectedPhoto({
        ...selectedPhoto,
        faces: faces,
      });
    }
  };

  const handleSavePhoto = async () => {
    if (!selectedPhoto) return;

    // In a real app, you would upload the photo to Firebase Storage
    // and save metadata to Firestore

    // For the prototype, just add it to the local state
    setPhotos([selectedPhoto, ...photos]);
    setModalVisible(false);
    setSelectedPhoto(null);
  };

  const handleSelectPhoto = (photo) => {
    setSelectedPhoto(photo);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text>Loading photos...</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={photos}
            renderItem={({ item }) => (
              <PhotoItem photo={item} onSelect={handleSelectPhoto} />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.photoGrid}
          />

          <FAB style={styles.fab} icon="camera" onPress={pickImage} />

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
                    <FaceDetectorComponent
                      imageUri={selectedPhoto.uri}
                      onFacesDetected={handleFacesDetected}
                    />

                    <View style={styles.modalButtons}>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={handleSavePhoto}
                      >
                        <Text style={styles.buttonText}>Save Photo</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.modalButton, styles.cancelButton]}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={styles.buttonText}>Close</Text>
                      </TouchableOpacity>
                    </View>
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

// Completing the Gallery Screen styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photoGrid: {
    padding: 5,
  },
  fab: {
    position: "absolute",
    margin: 16,
    inset-inline-end: 0,
    inset-block-end: 0,
    backgroundColor: "#2196F3",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    inline-size: "90%",
    block-size: "80%",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    inset-block-start: 20,
  },
  modalButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default GalleryScreen;
