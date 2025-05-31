import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/Colors';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  backgroundColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, backgroundColor }) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: COLORS.darkGrey,
    marginBottom: 4,
  },
  value: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: COLORS.black,
  },
});

export default StatsCard;