import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Globe, Bell, Moon, Info, ChevronRight, Languages } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import Header from '@/components/ui/Header';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Settings" />
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: COLORS.primaryLight }]}>
                <Globe size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.settingText}>Language</Text>
            </View>
            <View style={styles.settingAction}>
              <Text style={styles.settingValue}>English</Text>
              <ChevronRight size={20} color={COLORS.darkGrey} />
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: COLORS.infoLight }]}>
                <Bell size={20} color={COLORS.info} />
              </View>
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: COLORS.lightGrey, true: COLORS.primaryLight }}
              thumbColor={notifications ? COLORS.primary : COLORS.grey}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: COLORS.warningLight }]}>
                <Moon size={20} color={COLORS.warning} />
              </View>
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: COLORS.lightGrey, true: COLORS.primaryLight }}
              thumbColor={darkMode ? COLORS.primary : COLORS.grey}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Restaurant</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: COLORS.successLight }]}>
                <Languages size={20} color={COLORS.success} />
              </View>
              <Text style={styles.settingText}>Menu Languages</Text>
            </View>
            <View style={styles.settingAction}>
              <Text style={styles.settingValue}>2 Languages</Text>
              <ChevronRight size={20} color={COLORS.darkGrey} />
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: COLORS.primaryLight }]}>
                <Info size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.settingText}>About Menoo</Text>
            </View>
            <ChevronRight size={20} color={COLORS.darkGrey} />
          </TouchableOpacity>
          
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>
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
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.black,
  },
  settingAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.darkGrey,
    marginRight: 8,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  versionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.darkGrey,
  },
});