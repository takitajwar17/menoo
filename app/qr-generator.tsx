import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Share, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Share2, QrCode, Download, Copy, CircleCheck as CheckCircle, Coffee, CreditCard as Edit, X } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import Button from '@/components/ui/Button';
import QRCode from 'react-native-qrcode-svg';
import { mockTables } from '@/data/mockTables';

export default function QRGeneratorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialTableId = params.table as string;
  
  const [selectedTable, setSelectedTable] = useState<string | null>(initialTableId || null);
  const [customUrl, setCustomUrl] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [qrType, setQrType] = useState<'table' | 'menu' | 'custom'>('table');
  const [showCustomization, setShowCustomization] = useState(false);
  const [qrColor, setQrColor] = useState('#000000');
  const [qrBgColor, setQrBgColor] = useState('#FFFFFF');
  const [showLogo, setShowLogo] = useState(true);
  
  const qrRef = useRef<any>(null);
  
  useEffect(() => {
    if (initialTableId) {
      generateQRForTable(initialTableId);
    }
  }, [initialTableId]);
  
  const generateQRForTable = (tableId: string) => {
    const table = mockTables.find(t => t.id === tableId);
    if (table) {
      // In a real app, this would be your actual restaurant URL + table ID
      const qrData = `https://menoo.app/restaurant/table/${tableId}`;
      setQrValue(qrData);
      setSelectedTable(tableId);
      setCustomUrl('');
      setQrType('table');
    }
  };
  
  const generateMenuQR = () => {
    const qrData = `https://menoo.app/restaurant/menu`;
    setQrValue(qrData);
    setSelectedTable(null);
    setCustomUrl('');
    setQrType('menu');
  };
  
  const generateCustomQR = () => {
    if (customUrl.trim()) {
      setQrValue(customUrl);
      setSelectedTable(null);
      setQrType('custom');
    }
  };
  
  const shareQRCode = async () => {
    try {
      if (qrValue) {
        let message = '';
        
        if (qrType === 'table') {
          const table = mockTables.find(t => t.id === selectedTable);
          message = `Scan this QR code to order at Table ${table?.number}`;
        } else if (qrType === 'menu') {
          message = "Scan this QR code to view our menu";
        } else {
          message = "Scan this QR code";
        }
        
        await Share.share({
          message,
          url: qrValue,
        });
      }
    } catch (error) {
      console.error('Error sharing QR code:', error);
    }
  };
  
  const copyToClipboard = () => {
    // In a real app, this would copy the QR value to clipboard
    Alert.alert("Copied to Clipboard", `URL copied: ${qrValue}`);
  };
  
  const downloadQRCode = () => {
    // In a real app, this would save the QR code as an image
    Alert.alert("QR Code Saved", "QR code has been saved to your device's gallery");
  };
  
  const toggleCustomization = () => {
    setShowCustomization(!showCustomization);
  };
  
  const getQRDescription = () => {
    switch(qrType) {
      case 'table':
        const table = mockTables.find(t => t.id === selectedTable);
        return `Table ${table?.number} QR Code`;
      case 'menu':
        return 'Restaurant Menu QR Code';
      case 'custom':
        return 'Custom QR Code';
      default:
        return 'QR Code';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTitle: 'QR Code Generator',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={COLORS.black} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://images.pexels.com/photos/6205624/pexels-photo-6205624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
            style={styles.headerImage}
          />
          <View style={styles.headerOverlay}>
            <Text style={styles.headerTitle}>QR Code Generator</Text>
            <Text style={styles.headerSubtitle}>Create unique QR codes for your restaurant</Text>
          </View>
        </View>
        
        <View style={styles.qrTypeSelector}>
          <TouchableOpacity 
            style={[styles.qrTypeOption, qrType === 'table' && styles.selectedQrType]}
            onPress={() => {
              if (selectedTable) {
                generateQRForTable(selectedTable);
              } else {
                setQrType('table');
                setQrValue('');
              }
            }}
          >
            <Coffee size={24} color={qrType === 'table' ? COLORS.primary : COLORS.darkGrey} />
            <Text style={[styles.qrTypeText, qrType === 'table' && styles.selectedQrTypeText]}>Table QR</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.qrTypeOption, qrType === 'menu' && styles.selectedQrType]}
            onPress={generateMenuQR}
          >
            <QrCode size={24} color={qrType === 'menu' ? COLORS.primary : COLORS.darkGrey} />
            <Text style={[styles.qrTypeText, qrType === 'menu' && styles.selectedQrTypeText]}>Menu QR</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.qrTypeOption, qrType === 'custom' && styles.selectedQrType]}
            onPress={() => {
              setQrType('custom');
              if (customUrl) generateCustomQR();
            }}
          >
            <Edit size={24} color={qrType === 'custom' ? COLORS.primary : COLORS.darkGrey} />
            <Text style={[styles.qrTypeText, qrType === 'custom' && styles.selectedQrTypeText]}>Custom QR</Text>
          </TouchableOpacity>
        </View>
        
        {qrType === 'table' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select a Table</Text>
            <View style={styles.tableGrid}>
              {mockTables.map((table) => (
                <TouchableOpacity 
                  key={table.id} 
                  style={[
                    styles.tableItem,
                    selectedTable === table.id && styles.selectedTable,
                    !table.isActive && styles.inactiveTable
                  ]}
                  onPress={() => table.isActive && generateQRForTable(table.id)}
                  disabled={!table.isActive}
                >
                  <Text style={[
                    styles.tableNumber,
                    selectedTable === table.id && styles.selectedTableText,
                    !table.isActive && styles.inactiveTableText
                  ]}>
                    {table.number}
                  </Text>
                  {selectedTable === table.id && (
                    <CheckCircle size={16} color={COLORS.primary} style={styles.checkIcon} />
                  )}
                  {!table.isActive && (
                    <Text style={styles.inactiveLabel}>Inactive</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        
        {qrType === 'custom' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Custom URL or Text</Text>
            <View style={styles.customUrlContainer}>
              <TextInput
                style={styles.input}
                value={customUrl}
                onChangeText={setCustomUrl}
                placeholder="Enter URL or text"
                placeholderTextColor={COLORS.darkGrey}
              />
              <Button 
                title="Generate" 
                onPress={generateCustomQR} 
                style={styles.generateButton}
                disabled={!customUrl.trim()}
              />
            </View>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.customizationToggle}
          onPress={toggleCustomization}
        >
          <Text style={styles.customizationToggleText}>
            {showCustomization ? 'Hide Customization Options' : 'Show Customization Options'}
          </Text>
          {showCustomization ? (
            <X size={18} color={COLORS.darkGrey} />
          ) : (
            <Edit size={18} color={COLORS.darkGrey} />
          )}
        </TouchableOpacity>
        
        {showCustomization && (
          <View style={styles.customizationSection}>
            <View style={styles.colorOption}>
              <Text style={styles.colorLabel}>QR Code Color</Text>
              <View style={styles.colorPicker}>
                {['#000000', '#FF796D', '#4CAF50', '#2196F3', '#9C27B0'].map(color => (
                  <TouchableOpacity 
                    key={color}
                    style={[
                      styles.colorSwatch,
                      { backgroundColor: color },
                      qrColor === color && styles.selectedColorSwatch
                    ]}
                    onPress={() => setQrColor(color)}
                  />
                ))}
              </View>
            </View>
            
            <View style={styles.colorOption}>
              <Text style={styles.colorLabel}>Background Color</Text>
              <View style={styles.colorPicker}>
                {['#FFFFFF', '#FFF0E0', '#E8F5E9', '#E3F2FD', '#F3E5F5'].map(color => (
                  <TouchableOpacity 
                    key={color}
                    style={[
                      styles.colorSwatch,
                      { backgroundColor: color },
                      qrBgColor === color && styles.selectedColorSwatch
                    ]}
                    onPress={() => setQrBgColor(color)}
                  />
                ))}
              </View>
            </View>
            
            <View style={styles.switchOption}>
              <Text style={styles.switchLabel}>Show Restaurant Logo</Text>
              <TouchableOpacity 
                style={[
                  styles.switchTrack,
                  showLogo && styles.switchTrackActive
                ]}
                onPress={() => setShowLogo(!showLogo)}
              >
                <View style={[
                  styles.switchThumb,
                  showLogo && styles.switchThumbActive
                ]} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {qrValue ? (
          <View style={styles.qrContainer}>
            <QRCode
              value={qrValue}
              size={200}
              color={qrColor}
              backgroundColor={qrBgColor}
              ref={qrRef}
              logo={showLogo ? {
                uri: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                logoSize: 40,
                logoBackgroundColor: 'white',
                logoMargin: 2,
                logoBorderRadius: 20,
              } : undefined}
            />
            <Text style={styles.qrText}>{getQRDescription()}</Text>
            <Text style={styles.qrValue}>{qrValue}</Text>
            
            <View style={styles.qrActions}>
              <TouchableOpacity style={styles.qrActionButton} onPress={shareQRCode}>
                <Share2 size={24} color={COLORS.primary} />
                <Text style={styles.qrActionText}>Share</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.qrActionButton} onPress={copyToClipboard}>
                <Copy size={24} color={COLORS.darkGrey} />
                <Text style={styles.qrActionText}>Copy URL</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.qrActionButton} onPress={downloadQRCode}>
                <Download size={24} color={COLORS.darkGrey} />
                <Text style={styles.qrActionText}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.emptyQrContainer}>
            <QrCode size={80} color={COLORS.lightGrey} />
            <Text style={styles.emptyQrText}>
              {qrType === 'table' 
                ? 'Select a table to generate a QR code' 
                : qrType === 'custom'
                  ? 'Enter a URL or text to generate a QR code'
                  : 'Generate a QR code for your restaurant menu'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
  },
  header: {
    height: 150,
    position: 'relative',
    marginBottom: 24,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: COLORS.white,
  },
  headerSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  qrTypeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 16,
  },
  qrTypeOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    backgroundColor: COLORS.lightGrey,
  },
  selectedQrType: {
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  qrTypeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: COLORS.darkGrey,
    marginTop: 8,
  },
  selectedQrTypeText: {
    color: COLORS.primary,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 12,
  },
  tableGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tableItem: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'relative',
  },
  selectedTable: {
    backgroundColor: COLORS.primaryLight,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  inactiveTable: {
    backgroundColor: '#F5F5F5',
    opacity: 0.7,
  },
  tableNumber: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.darkGrey,
  },
  selectedTableText: {
    color: COLORS.primary,
  },
  inactiveTableText: {
    color: COLORS.grey,
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  inactiveLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: COLORS.grey,
    marginTop: 4,
  },
  customUrlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: COLORS.black,
    marginRight: 8,
  },
  generateButton: {
    paddingHorizontal: 16,
  },
  customizationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  customizationToggleText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.darkGrey,
    marginRight: 8,
  },
  customizationSection: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 12,
  },
  colorOption: {
    marginBottom: 16,
  },
  colorLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 8,
  },
  colorPicker: {
    flexDirection: 'row',
  },
  colorSwatch: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  selectedColorSwatch: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  switchOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.black,
  },
  switchTrack: {
    width: 50,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.grey,
    padding: 2,
  },
  switchTrackActive: {
    backgroundColor: COLORS.primary,
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  switchThumbActive: {
    transform: [{ translateX: 26 }],
  },
  qrContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 40,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.black,
    marginTop: 16,
  },
  qrValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.darkGrey,
    marginTop: 8,
    marginBottom: 16,
    textAlign: 'center',
  },
  qrActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  qrActionButton: {
    alignItems: 'center',
  },
  qrActionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: COLORS.darkGrey,
    marginTop: 8,
  },
  emptyQrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderStyle: 'dashed',
    marginBottom: 40,
  },
  emptyQrText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: COLORS.darkGrey,
    textAlign: 'center',
    marginTop: 16,
  },
});