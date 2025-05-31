import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import Header from '@/components/ui/Header';
import MenuCard from '@/components/menus/MenuCard';
import { mockMenus } from '@/data/mockMenus';
import Button from '@/components/ui/Button';

export default function MenusScreen() {
  const router = useRouter();
  const [menus, setMenus] = useState(mockMenus);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Menus" />
      
      <View style={styles.content}>
        <View style={styles.actionContainer}>
          <Button 
            title="Create Menu" 
            icon={<Plus size={18} color={COLORS.white} />}
            onPress={() => router.push('/menu/new')}
            style={styles.createButton}
          />
        </View>
        
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
  actionContainer: {
    marginBottom: 24,
  },
  createButton: {
    flex: 1,
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
});