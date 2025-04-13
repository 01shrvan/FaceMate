// src/screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, Switch, Alert } from 'react-native';
import { Text, Divider, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [autoShare, setAutoShare] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [faceCachingEnabled, setFaceCachingEnabled] = useState(true);
  
  // Mock user profile data for prototype
  const userProfile = {
    name: 'John Doe',
    email: user ? user.email : 'john.doe@example.com',
    photoURL: 'https://randomuser.me/api/portraits/men/32.jpg',
    facesLinked: 12,
    storageUsed: '256 MB',
    premium: false,
  };
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Logout Failed', error.message);
    }
  };
  
  const toggleSwitch = (setting, setValue) => {
    setValue((previousState) => !previousState);
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileDetails}>
          <Image 
            source={{ uri: userProfile.photoURL }} 
            style={styles.profileImage} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileEmail}>{userProfile.email}</Text>
            {!userProfile.premium && (
              <Button 
                mode="contained" 
                compact 
                style={styles.upgradeButton}
                onPress={() => Alert.alert('Premium', 'Upgrade to premium for more features!')}
              >
                Upgrade to Premium
              </Button>
            )}
          </View>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons name="person" size={24} color="#2196F3" />
          <Text style={styles.statValue}>{userProfile.facesLinked}</Text>
          <Text style={styles.statLabel}>Faces Linked</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Ionicons name="cloud" size={24} color="#2196F3" />
          <Text style={styles.statValue}>{userProfile.storageUsed}</Text>
          <Text style={styles.statLabel}>Storage Used</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Ionicons name={userProfile.premium ? "star" : "star-outline"} size={24} color="#2196F3" />
          <Text style={styles.statValue}>{userProfile.premium ? "Yes" : "No"}</Text>
          <Text style={styles.statLabel}>Premium</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Face Settings</Text>
        <Divider />
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="people" size={24} color="#2196F3" style={styles.menuIcon} />
            <Text style={styles.menuText}>Manage Linked Faces</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <View style={styles.toggleItem}>
          <View style={styles.toggleItemLeft}>
            <Ionicons name="flash" size={24} color="#2196F3" style={styles.menuIcon} />
            <View>
              <Text style={styles.menuText}>Auto-Share Photos</Text>
              <Text style={styles.menuSubtext}>
                Automatically share photos with linked contacts
              </Text>
            </View>
          </View>
          <Switch
            value={autoShare}
            onValueChange={() => toggleSwitch(autoShare, setAutoShare)}
            trackColor={{ false: "#767577", true: "#2196F3" }}
            thumbColor={"#f4f3f4"}
          />
        </View>
        
        <View style={styles.toggleItem}>
          <View style={styles.toggleItemLeft}>
            <Ionicons name="save" size={24} color="#2196F3" style={styles.menuIcon} />
            <View>
              <Text style={styles.menuText}>Face Caching</Text>
              <Text style={styles.menuSubtext}>
                Store face data locally for faster recognition
              </Text>
            </View>
          </View>
          <Switch
            value={faceCachingEnabled}
            onValueChange={() => toggleSwitch(faceCachingEnabled, setFaceCachingEnabled)}
            trackColor={{ false: "#767577", true: "#2196F3" }}
            thumbColor={"#f4f3f4"}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <Divider />
        
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="settings" size={24} color="#2196F3" style={styles.menuIcon} />
            <Text style={styles.menuText}>General Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <View style={styles.toggleItem}>
          <View style={styles.toggleItemLeft}>
            <Ionicons name="notifications" size={24} color="#2196F3" style={styles.menuIcon} />
            <View>
              <Text style={styles.menuText}>Notifications</Text>
              <Text style={styles.menuSubtext}>
                Get alerts when photos are shared with you
              </Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={() => toggleSwitch(notificationsEnabled, setNotificationsEnabled)}
            trackColor={{ false: "#767577", true: "#2196F3" }}
            thumbColor={"#f4f3f4"}
          />
        </View>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="help-circle" size={24} color="#2196F3" style={styles.menuIcon} />
            <Text style={styles.menuText}>Help & Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="shield" size={24} color="#2196F3" style={styles.menuIcon} />
            <Text style={styles.menuText}>Privacy Policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>
      
      <Button 
        mode="outlined" 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        Log Out
      </Button>
      
      <View style={styles.version}>
        <Text style={styles.versionText}>FaceMate v1.0.0 (Prototype)</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  upgradeButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#e0e0e0',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  section: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
  },
  menuSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  toggleItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoutButton: {
    margin: 20,
    borderColor: '#f44336',
    borderWidth: 1,
  },
  version: {
    alignItems: 'center',
    marginBottom: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  },
});

export default ProfileScreen;