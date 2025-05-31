import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/Colors';

/**
 * Entry point of the application
 * Redirects to the appropriate screen based on authentication status
 */
export default function Index() {
  // In a real app, we would check if the user is authenticated here
  // For now, we'll just redirect to the main tabs screen
  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  text: {
    fontSize: 18,
    color: COLORS.black,
    marginTop: 10,
  },
});