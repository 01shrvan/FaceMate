// src/utils/faceDetectionUtils.js
import * as FaceDetector from 'expo-face-detector';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

// Optimize the image for face detection
export const prepareImageForDetection = async (imageUri) => {
  try {
    // Process the image to fit within memory constraints
    const processedImage = await manipulateAsync(
      imageUri,
      [{ resize: { width: 800 } }],
      { format: SaveFormat.JPEG, compress: 0.8 }
    );
    
    return processedImage.uri;
  } catch (error) {
    console.error('Error preparing image:', error);
    return imageUri; // Return original if processing fails
  }
};

// Detect faces with options
export const detectFaces = async (imageUri, mode = 'fast') => {
  try {
    const options = {
      mode: mode === 'fast' ? FaceDetector.FaceDetectorMode.fast : FaceDetector.FaceDetectorMode.accurate,
      detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
      runClassifications: FaceDetector.FaceDetectorClassifications.all,
      minDetectionInterval: 100,
      tracking: true,
    };
    
    // Prepare the image
    const preparedImageUri = await prepareImageForDetection(imageUri);
    
    // Detect faces
    const result = await FaceDetector.detectFacesAsync(preparedImageUri, options);
    return result.faces;
  } catch (error) {
    console.error('Error detecting faces:', error);
    return [];
  }
};

// Extract face region from image
export const extractFaceRegion = async (imageUri, face) => {
  try {
    // Add some padding around the face
    const padding = 20;
    const crop = {
      originX: Math.max(0, face.bounds.origin.x - padding),
      originY: Math.max(0, face.bounds.origin.y - padding),
      width: face.bounds.size.width + (padding * 2),
      height: face.bounds.size.height + (padding * 2),
    };
    
    // Crop the face region
    const result = await manipulateAsync(
      imageUri,
      [{ crop }],
      { format: SaveFormat.JPEG }
    );
    
    return result.uri;
  } catch (error) {
    console.error('Error extracting face:', error);
    return null;
  }
};

// Calculate similarity between faces (placeholder for real implementation)
export const calculateFaceSimilarity = (face1, face2) => {
  // This would use face landmarks to calculate similarity
  // For the prototype, return a random similarity score
  return Math.random() * 100;
};

export default {
  prepareImageForDetection,
  detectFaces,
  extractFaceRegion,
  calculateFaceSimilarity,
};