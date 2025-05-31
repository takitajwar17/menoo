import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { COLORS } from '@/constants/Colors';

interface PopularItem {
  id: string;
  name: string;
  orderCount: number;
  revenue: number;
  imageUrl: string;
}

interface PopularItemsCardProps {
  items: PopularItem[];
}

const PopularItemsCard: React.FC<PopularItemsCardProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={item.id} style={[
          styles.itemContainer,
          index < items.length - 1 && styles.itemBorder
        ]}>
          <View style={styles.rankContainer}>
            <Text style={styles.rankText}>{index + 1}</Text>
          </View>
          
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.orderCount}>{item.orderCount} orders</Text>
          </View>
          
          <Text style={styles.revenue}>৳{item.revenue.toLocaleString()}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  rankContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.darkGrey,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.black,
  },
  orderCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.darkGrey,
  },
  revenue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.success,
  },
});

export default PopularItemsCard;