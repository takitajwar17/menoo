import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';

interface AnalyticsCardProps {
  title: string;
  value: string;
  change: number;
  backgroundColor: string;
  textColor: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ 
  title, 
  value, 
  change, 
  backgroundColor, 
  textColor 
}) => {
  const isPositive = change >= 0;
  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color: textColor }]}>{value}</Text>
      
      <View style={styles.changeContainer}>
        {isPositive ? (
          <TrendingUp size={14} color={COLORS.success} />
        ) : (
          <TrendingDown size={14} color={COLORS.error} />
        )}
        
        <Text 
          style={[
            styles.changeText, 
            { color: isPositive ? COLORS.success : COLORS.error }
          ]}
        >
          {isPositive ? '+' : ''}{change}%
        </Text>
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
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.darkGrey,
    marginBottom: 8,
  },
  value: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
});

export default AnalyticsCard;