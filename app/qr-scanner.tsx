import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import { ArrowLeft, X, Scan } from 'lucide-react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { COLORS } from '@/constants/Colors';

export default function QRScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [flashOn, setFlashOn] = useState(false);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <Stack.Screen 
          options={{
            headerShown: false,
          }}
        />
        
        <View style={styles.permissionContainer}>
          <Image 
            source={{ uri: "https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
            style={styles.permissionImage}
          />
          <Text style={styles.permissionTitle}>Camera Access Needed</Text>
          <Text style={styles.permissionText}>We need your permission to scan QR codes</Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    
    // Parse the QR code data
    // In a real app, we would navigate to the appropriate screen
    setTimeout(() => {
      Alert.alert(
        "QR Code Scanned",
        `${data}`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open", onPress: () => router.back() }
        ]
      );
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />

      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ['qr'],
        }}
        flashMode={flashOn ? 'on' : 'off'}
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.topControls}>
            <TouchableOpacity 
              style={styles.circleButton} 
              onPress={() => router.back()}
            >
              <X size={24} color="#FFF" />
            </TouchableOpacity>
          </SafeAreaView>
          
          <View style={styles.scanFrame}>
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
          </View>
          
          <View style={styles.bottomControls}>
            <Text style={styles.scanText}>
              {scanned ? 'QR code detected!' : 'Align QR code within the frame'}
            </Text>
            
            <TouchableOpacity
              style={styles.scanAgainButton}
              onPress={() => setScanned(false)}
              disabled={!scanned}
            >
              <Scan size={24} color={scanned ? COLORS.primary : "rgba(255,255,255,0.6)"} />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 24,
  },
  permissionImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 24,
  },
  permissionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
  },
  permissionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.darkGrey,
    textAlign: 'center',
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  permissionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: COLORS.white,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topControls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
  },
  circleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: COLORS.white,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: COLORS.white,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: COLORS.white,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: COLORS.white,
  },
  bottomControls: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 60,
  },
  scanText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  scanAgainButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});