// src/utils/storageUtils.js
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Platform } from 'react-native';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Save image to local cache
export const cacheImage = async (uri, fileName) => {
  try {
    const cacheDir = FileSystem.cacheDirectory + 'facemate/';
    const cacheFilePath = cacheDir + fileName;
    
    // Ensure cache directory exists
    const dirInfo = await FileSystem.getInfoAsync(cacheDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(cacheDir, { intermediates: true });
    }
    
    // Copy the file to cache
    await FileSystem.copyAsync({
      from: uri,
      to: cacheFilePath
    });
    
    return cacheFilePath;
  } catch (error) {
    console.error('Error caching image:', error);
    return null;
  }
};

// Save image to device's photo gallery
export const saveToGallery = async (uri) => {
  try {
    // Check if we have permission
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Gallery permission not granted');
    }
    
    // Save to gallery
    const asset = await MediaLibrary.createAssetAsync(uri);
    
    // Create FaceMate album if it doesn't exist
    const albums = await MediaLibrary.getAlbumsAsync();
    const facemateAlbum = albums.find(album => album.title === 'FaceMate');
    
    if (facemateAlbum) {
      await MediaLibrary.addAssetsToAlbumAsync([asset], facemateAlbum, false);
    } else {
      await MediaLibrary.createAlbumAsync('FaceMate', asset, false);
    }
    
    return asset;
  } catch (error) {
    console.error('Error saving to gallery:', error);
    return null;
  }
};

// Upload image to Firebase Storage
export const uploadToFirebase = async (uri, userId, fileName) => {
  try {
    // Create a storage reference
    const storageRef = ref(storage, `users/${userId}/photos/${fileName}`);
    
    // Fetch the image data
    const response = await fetch(uri);
    const blob = await response.blob();
    
    // Upload to Firebase Storage
    const snapshot = await uploadBytes(storageRef, blob);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading to Firebase:', error);
    return null;
  }
};

// Get local app storage info
export const getStorageInfo = async () => {
  try {
    const cacheDir = FileSystem.cacheDirectory + 'facemate/';
    
    // Ensure cache directory exists
    const dirInfo = await FileSystem.getInfoAsync(cacheDir);
    if (!dirInfo.exists) {
      return {
        totalSpace: 0,
        freeSpace: 0,
        usedSpace: 0,
      };
    }
    
    // Get directory content
    const content = await FileSystem.readDirectoryAsync(cacheDir);
    
    // Calculate total size
    let totalSize = 0;
    for (const item of content) {
      const fileInfo = await FileSystem.getInfoAsync(cacheDir + item);
      if (fileInfo.exists && !fileInfo.isDirectory) {
        totalSize += fileInfo.size;
      }
    }
    
    return {
      totalSpace: content.length,
      usedSpace: Math.round(totalSize / 1024 / 1024 * 10) / 10, // Convert to MB
      fileCount: content.length,
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return {
      totalSpace: 0,
      freeSpace: 0,
      usedSpace: 0,
    };
  }
};

// Clear the app's cache
export const clearCache = async () => {
  try {
    const cacheDir = FileSystem.cacheDirectory + 'facemate/';
    
    // Ensure cache directory exists
    const dirInfo = await FileSystem.getInfoAsync(cacheDir);
    if (dirInfo.exists) {
      await FileSystem.deleteAsync(cacheDir);
      await FileSystem.makeDirectoryAsync(cacheDir, { intermediates: true });
    }
    
    return true;
  } catch (error) {
    console.error('Error clearing cache:', error);
    return false;
  }
};

export default {
  cacheImage,
  saveToGallery,
  uploadToFirebase,
  getStorageInfo,
  clearCache,
};