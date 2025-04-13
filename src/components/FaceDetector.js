// src/components/FaceDetector.js
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as FaceDetector from 'expo-face-detector';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

const FaceDetectorComponent = ({ imageUri, onFacesDetected }) => {
  const [faces, setFaces] = useState([]);
  const [processing, setProcessing] = useState(true);
  const [selectedFace, setSelectedFace] = useState(null);

  useEffect(() => {
    detectFaces();
  }, [imageUri]);

  const detectFaces = async () => {
    try {
      setProcessing(true);
      // Process the image to fit within memory constraints
      const processedImage = await manipulateAsync(
        imageUri,
        [{ resize: { width: 800 } }],
        { format: SaveFormat.JPEG }
      );
      
      // Detect faces in the image
      const options = { mode: FaceDetector.FaceDetectorMode.fast };
      const detectedFaces = await FaceDetector.detectFacesAsync(processedImage.uri, options);
      
      setFaces(detectedFaces.faces);
      if (onFacesDetected) {
        onFacesDetected(detectedFaces.faces);
      }
    } catch (error) {
      console.error('Error detecting faces:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleFacePress = (face) => {
    setSelectedFace(face.faceID === selectedFace ? null : face.faceID);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        
        {/* Overlay faces with bounding boxes */}
        {faces.map((face, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.faceBox,
              {
                left: face.bounds.origin.x,
                top: face.bounds.origin.y,
                width: face.bounds.size.width,
                height: face.bounds.size.height,
                borderColor: selectedFace === face.faceID ? '#2196F3' : '#ffffff',
              },
            ]}
            onPress={() => handleFacePress(face)}
          />
        ))}
      </View>
      
      {processing && (
        <View style={styles.processingContainer}>
          <Text>Processing image...</Text>
        </View>
      )}
      
      {faces.length > 0 && (
        <Text style={styles.detectionText}>
          {faces.length} {faces.length === 1 ? 'face' : 'faces'} detected
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  faceBox: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 5,
  },
  processingContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  detectionText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FaceDetectorComponent;