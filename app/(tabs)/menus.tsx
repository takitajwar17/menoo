import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import Header from '@/components/ui/Header';
import MenuCard from '@/components/menus/MenuCard';
import { mockMenus } from '@/data/mockMenus';

export default function MenusScreen() {
  const router = useRouter();
  const [menus, setMenus] = useState(mockMenus);

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Menus" 
        rightComponent={
          <TouchableOpacity 
            style={styles.actionCircleButton}
            onPress={() => router.push('/menu/new')}
          >
            <Plus size={25} color="#fff" />
          </TouchableOpacity>
        }
      />
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Your Menus</Text>
        
        <FlatList
          data={menus}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MenuCard 
              menu={item} 
              onPress={() => router.push(`/menu/${item.id}`)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
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
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  actionCircleButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});