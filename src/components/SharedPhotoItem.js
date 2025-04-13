// src/components/SharedPhotoItem.js
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Avatar from './Avatar';

const SharedPhotoItem = ({ photo, onPress }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress && onPress(photo)}>
      <View style={styles.header}>
        <Avatar 
          uri={photo.sharedByAvatar} 
          name={photo.sharedBy}
          size="small"
        />
        <View style={styles.headerText}>
          <Text style={styles.name}>{photo.sharedBy}</Text>
          <Text style={styles.date}>{formatDate(photo.timestamp)}</Text>
        </View>
        <Chip style={styles.eventChip} textStyle={styles.eventChipText}>
          {photo.event || 'Shared Photo'}
        </Chip>
      </View>
      
      <Image source={{ uri: photo.uri }} style={styles.image} />
      
      <View style={styles.footer}>
        <View style={styles.faceInfo}>
          {photo.facesCount && (
            <View style={styles.faceBadge}>
              <Text style={styles.faceBadgeText}>{photo.facesCount}</Text>
              <Ionicons name="person" size={14} color="#2196F3" />
            </View>
          )}
          
          {photo.taggedPeople && photo.taggedPeople.length > 0 && (
            <Text style={styles.taggedText}>
              Tagged: {photo.taggedPeople.join(', ')}
            </Text>
          )}
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={22} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={22} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download-outline" size={22} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  eventChip: {
    backgroundColor: '#e0f2fe',
    height: 30,
  },
  eventChipText: {
    fontSize: 12,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  footer: {
    padding: 10,
  },
  faceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  faceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  faceBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2196F3',
    marginRight: 4,
  },
  taggedText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  actionButton: {
    marginLeft: 15,
    padding: 5,
  },
});

export default SharedPhotoItem;