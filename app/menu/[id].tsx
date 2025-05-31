import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowLeft, Plus, Trash, CreditCard as Edit, MoveVertical, QrCode } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import Button from '@/components/ui/Button';
import CategorySection from '@/components/menus/CategorySection';
import { mockMenus } from '@/data/mockMenus';
import { mockCategories } from '@/data/mockCategories';
import { mockMenuItems } from '@/data/mockMenuItems';

export default function MenuDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const isNewMenu = id === 'new';
  const [menu, setMenu] = useState(isNewMenu ? {
    id: 'new',
    name: '',
    description: '',
    imageUrl: null,
    isActive: true
  } : mockMenus.find(m => m.id === id) || null);
  
  const [categories, setCategories] = useState(isNewMenu ? [] : mockCategories);
  const [menuItems, setMenuItems] = useState(mockMenuItems);
  
  const [isEditing, setIsEditing] = useState(isNewMenu);
  
  if (!menu && !isNewMenu) {
    return (
      <View style={styles.container}>
        <Text>Menu not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTitle: isNewMenu ? 'Create Menu' : menu?.name || '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={COLORS.black} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            !isNewMenu && !isEditing ? (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Edit size={24} color={COLORS.primary} />
              </TouchableOpacity>
            ) : null
          ),
        }}
      />
      
      <ScrollView style={styles.content}>
        {isEditing ? (
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Menu Name</Text>
              <TextInput
                style={styles.input}
                value={menu?.name || ''}
                onChangeText={(text) => setMenu({ ...menu!, name: text })}
                placeholder="Enter menu name"
                placeholderTextColor={COLORS.darkGrey}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={menu?.description || ''}
                onChangeText={(text) => setMenu({ ...menu!, description: text })}
                placeholder="Enter menu description"
                placeholderTextColor={COLORS.darkGrey}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
            
            <View style={styles.actionContainer}>
              <Button
                title={isNewMenu ? "Create Menu" : "Save Changes"}
                onPress={() => {
                  // In a real app, we would save the menu to the database here
                  setIsEditing(false);
                }}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        ) : (
          <>
            {menu?.description && (
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{menu.description}</Text>
              </View>
            )}
            
            <View style={styles.actionContainer}>
              <Button 
                title="Add Category" 
                icon={<Plus size={18} color={COLORS.white} />}
                onPress={() => {
                  // In a real app, we would add a new category here
                }}
                style={{ flex: 1, marginRight: 8 }}
              />
              
              <Button 
                title="QR Code" 
                icon={<QrCode size={18} color={COLORS.white} />}
                onPress={() => router.push('/qr-generator')}
                variant="secondary"
                style={{ flex: 1 }}
              />
            </View>
            
            {categories.map((category) => {
              const categoryItems = menuItems.filter(item => item.categoryId === category.id);
              return (
                <CategorySection 
                  key={category.id}
                  category={category}
                  items={categoryItems}
                />
              );
            })}
            
            {categories.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No categories added yet</Text>
                <Text style={styles.emptySubtext}>Add a category to start building your menu</Text>
              </View>
            )}
          </>
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
    padding: 16,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.darkGrey,
    lineHeight: 24,
  },
  actionContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  emptyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: COLORS.darkGrey,
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.grey,
  },
  formContainer: {
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: COLORS.black,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
});