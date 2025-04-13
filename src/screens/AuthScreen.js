// src/screens/AuthScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Title, Text, ToggleButton } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  
  const { login, signup } = useAuth();
  
  const handleAuth = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Title style={styles.appTitle}>FaceMate</Title>
          <Text style={styles.tagline}>Share Smarter. Not Harder.</Text>
        </View>
        
        <View style={styles.formContainer}>
          <ToggleButton.Row
            onValueChange={value => value && setMode(value)}
            value={mode}
            style={styles.toggleContainer}
          >
            <ToggleButton
              icon="login"
              value="login"
              style={[styles.toggleButton, mode === 'login' && styles.activeToggle]}
            >
              <Text style={[styles.toggleText, mode === 'login' && styles.activeToggleText]}>
                Login
              </Text>
            </ToggleButton>
            <ToggleButton
              icon="account-plus"
              value="signup"
              style={[styles.toggleButton, mode === 'signup' && styles.activeToggle]}
            >
              <Text style={[styles.toggleText, mode === 'signup' && styles.activeToggleText]}>
                Sign Up
              </Text>
            </ToggleButton>
          </ToggleButton.Row>
          
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
          />
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <Button 
            mode="contained" 
            onPress={handleAuth}
            loading={loading}
            style={styles.button}
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </Button>
          
          <Button 
            mode="text" 
            onPress={() => console.log('Demo mode')}
            style={styles.demoButton}
          >
            Try Demo Mode
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  formContainer: {
    width: '100%',
  },
  toggleContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
  },
  activeToggle: {
    backgroundColor: '#2196F3',
  },
  toggleText: {
    fontSize: 14,
  },
  activeToggleText: {
    color: 'white',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    padding: 5,
    marginTop: 10,
  },
  demoButton: {
    marginTop: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default AuthScreen;