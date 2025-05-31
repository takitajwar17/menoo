import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '@/constants/Colors';

interface Menu {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  isActive: boolean;
}

interface MenuCardProps {
  menu: Menu;
  onPress: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {menu.imageUrl ? (
        <Image 
          source={{ uri: menu.imageUrl }} 
          style={styles.image} 
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{menu.name}</Text>
          {menu.description && (
            <Text style={styles.description} numberOfLines={2}>
              {menu.description}
            </Text>
          )}
        </View>
        
        <View style={[
          styles.statusBadge, 
          { backgroundColor: menu.isActive ? COLORS.successLight : COLORS.lightGrey }
        ]}>
          <Text style={[
            styles.statusText, 
            { color: menu.isActive ? COLORS.success : COLORS.darkGrey }
          ]}>
            {menu.isActive ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  placeholder: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.darkGrey,
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.darkGrey,
    lineHeight: 20,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});

export default MenuCard;