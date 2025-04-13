// src/components/Avatar.js
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const Avatar = ({ uri, name, size = 'medium', onPress, showBadge = false }) => {
  // Determine size dimensions
  const dimensions = {
    small: 40,
    medium: 60,
    large: 80,
  };
  
  const avatarSize = dimensions[size] || dimensions.medium;
  const fontSize = size === 'small' ? 14 : size === 'medium' ? 16 : 18;
  
  // Generate placeholder if no image URI is provided
  const getInitials = () => {
    if (!name) return '?';
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[
        styles.avatar, 
        { width: avatarSize, height: avatarSize }
      ]}>
        {uri ? (
          <Image 
            source={{ uri }} 
            style={styles.image} 
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.placeholder, { backgroundColor: '#2196F3' }]}>
            <Text style={[styles.placeholderText, { fontSize }]}>
              {getInitials()}
            </Text>
          </View>
        )}
        
        {showBadge && (
          <View style={styles.badge}>
            <Ionicons name="checkmark" size={12} color="#fff" />
          </View>
        )}
      </View>
      
      {name && (
        <Text 
          style={[styles.name, { fontSize: fontSize - 2 }]}
          numberOfLines={1}
        >
          {name}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  avatar: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: 'white',
    fontWeight: 'bold',
  },
  name: {
    marginTop: 5,
    textAlign: 'center',
    color: '#666',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default Avatar;