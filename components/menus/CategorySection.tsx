import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronUp, CreditCard as Edit, Trash } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import MenuItem from './MenuItem';

interface Category {
  id: string;
  name: string;
  description: string;
  menuId: string;
  order: number;
}

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

interface CategorySectionProps {
  category: Category;
  items: Item[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, items }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{category.name}</Text>
          {category.description && (
            <Text style={styles.description}>{category.description}</Text>
          )}
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Edit size={18} color={COLORS.darkGrey} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            {isExpanded ? (
              <ChevronUp size={18} color={COLORS.darkGrey} />
            ) : (
              <ChevronDown size={18} color={COLORS.darkGrey} />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.content}>
          {items.length > 0 ? (
            items.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No items in this category</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Item</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {items.length > 0 && (
            <TouchableOpacity style={styles.addItemButton}>
              <Text style={styles.addItemText}>+ Add New Item</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.black,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.darkGrey,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 16,
  },
  content: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.darkGrey,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.white,
  },
  addItemButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  addItemText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.primary,
  },
});

export default CategorySection;