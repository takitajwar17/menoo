import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CreditCard as Edit, Trash } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';

interface Item {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  isVegetarian: boolean;
  isSpicy: boolean;
  allergens: string[];
}

interface MenuItemProps {
  item: Item;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      
      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>৳{item.price}</Text>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.tagsContainer}>
          {!item.isAvailable && (
            <View style={[styles.tag, { backgroundColor: COLORS.errorLight }]}>
              <Text style={[styles.tagText, { color: COLORS.error }]}>Out of Stock</Text>
            </View>
          )}
          
          {item.isVegetarian && (
            <View style={[styles.tag, { backgroundColor: COLORS.successLight }]}>
              <Text style={[styles.tagText, { color: COLORS.success }]}>Vegetarian</Text>
            </View>
          )}
          
          {item.isSpicy && (
            <View style={[styles.tag, { backgroundColor: COLORS.warningLight }]}>
              <Text style={[styles.tagText, { color: COLORS.warning }]}>Spicy</Text>
            </View>
          )}
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Edit size={16} color={COLORS.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Trash size={16} color={COLORS.error} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 8,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.black,
    flex: 1,
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.primary,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.darkGrey,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: 16,
  },
});

export default MenuItem;