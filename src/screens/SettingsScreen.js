// src/screens/SettingsScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { Text, Divider, Button, List, RadioButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const SettingsScreen = ({ navigation }) => {
  const { user } = useAuth();
  
  // App settings
  const [theme, setTheme] = useState('light');
  const [faceDetectionMode, setFaceDetectionMode] = useState('fast');
  const [dataUsage, setDataUsage] = useState('balanced');
  const [backupEnabled, setBackupEnabled] = useState(true);
  const [locationTagging, setLocationTagging] = useState(false);
  
  const toggleSwitch = (setting, setValue) => {
    setValue(previousState => !previousState);
  };
  
  const handleDataPurge = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all locally stored data? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => Alert.alert('Data Cleared', 'All local data has been purged.')
        }
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <List.Section>
        <List.Subheader>App Appearance</List.Subheader>
        <Divider />
        
        <List.Item
          title="App Theme"
          description="Change how the app looks"
          left={props => <List.Icon {...props} icon="palette" />}
          right={() => (
            <RadioButton.Group onValueChange={value => setTheme(value)} value={theme}>
              <View style={styles.radioGroup}>
                <RadioButton.Item label="Light" value="light" position="leading" />
                <RadioButton.Item label="Dark" value="dark" position="leading" />
                <RadioButton.Item label="System" value="system" position="leading" />
              </View>
            </RadioButton.Group>
          )}
        />
      </List.Section>
      
      <List.Section>
        <List.Subheader>Face Detection</List.Subheader>
        <Divider />
        
        <List.Item
          title="Detection Mode"
          description="Fast mode uses less battery but may be less accurate"
          left={props => <List.Icon {...props} icon="face-recognition" />}
          right={() => (
            <RadioButton.Group 
              onValueChange={value => setFaceDetectionMode(value)} 
              value={faceDetectionMode}
            >
              <View style={styles.radioGroup}>
                <RadioButton.Item label="Fast" value="fast" position="leading" />
                <RadioButton.Item label="Accurate" value="accurate" position="leading" />
              </View>
            </RadioButton.Group>
          )}
        />
        
        <List.Item
          title="Location Tagging"
          description="Add location data to your photos"
          left={props => <List.Icon {...props} icon="map-marker" />}
          right={() => (
            <Switch
              value={locationTagging}
              onValueChange={() => toggleSwitch(locationTagging, setLocationTagging)}
              trackColor={{ false: "#767577", true: "#2196F3" }}
              thumbColor={"#f4f3f4"}
            />
          )}
        />
      </List.Section>
      
      <List.Section>
        <List.Subheader>Storage & Data</List.Subheader>
        <Divider />
        
        <List.Item
          title="Data Usage"
          description="Control how much data the app uses"
          left={props => <List.Icon {...props} icon="data-matrix" />}
          right={() => (
            <RadioButton.Group 
              onValueChange={value => setDataUsage(value)} 
              value={dataUsage}
            >
              <View style={styles.radioColumn}>
                <RadioButton.Item label="Low" value="low" position="leading" />
                <RadioButton.Item label="Balanced" value="balanced" position="leading" />
                <RadioButton.Item label="High Quality" value="high" position="leading" />
              </View>
            </RadioButton.Group>
          )}
        />
        
        <List.Item
          title="Backup Photos"
          description="Automatically backup photos to the cloud"
          left={props => <List.Icon {...props} icon="cloud-upload" />}
          right={() => (
            <Switch
              value={backupEnabled}
              onValueChange={() => toggleSwitch(backupEnabled, setBackupEnabled)}
              trackColor={{ false: "#767577", true: "#2196F3" }}
              thumbColor={"#f4f3f4"}
            />
          )}
        />
        
        <List.Item
          title="Clear Cache"
          description="Free up space by clearing locally stored data"
          left={props => <List.Icon {...props} icon="trash-can" />}
          onPress={handleDataPurge}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
      </List.Section>
      
      <List.Section>
        <List.Subheader>About</List.Subheader>
        <Divider />
        
        <List.Item
          title="Version"
          description="1.0.0 (Prototype)"
          left={props => <List.Icon {...props} icon="information" />}
        />
        
        <List.Item
          title="Feedback"
          description="Help us improve FaceMate"
          left={props => <List.Icon {...props} icon="comment" />}
          onPress={() => Alert.alert('Feedback', 'Thank you for your feedback!')}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        
        <List.Item
          title="Terms of Service"
          left={props => <List.Icon {...props} icon="file-document" />}
          onPress={() => {}}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
      </List.Section>
      
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>FaceMate v1.0.0 (Prototype)</Text>
        <Text style={styles.copyrightText}>© 2025 FaceMate</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  radioGroup: {
    flexDirection: 'row',
  },
  radioColumn: {
    flexDirection: 'column',
  },
  versionContainer: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  },
  copyrightText: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

export default SettingsScreen;