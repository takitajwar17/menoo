import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/Colors';
import Header from '@/components/ui/Header';
import TabFilter from '@/components/ui/TabFilter';
import AnalyticsCard from '@/components/analytics/AnalyticsCard';
import PopularItemsCard from '@/components/analytics/PopularItemsCard';
import { mockAnalytics } from '@/data/mockAnalytics';
import { mockPopularItems } from '@/data/mockMenuItems';

export default function AnalyticsScreen() {
  const [timeFrame, setTimeFrame] = useState('today');
  
  const timeFrames = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
  ];
  
  const analytics = mockAnalytics[timeFrame];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Analytics" />
      
      <View style={styles.content}>
        <TabFilter 
          tabs={timeFrames} 
          activeTab={timeFrame} 
          onTabChange={setTimeFrame} 
        />
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.statsContainer}>
            <AnalyticsCard 
              title="Total Orders" 
              value={analytics.totalOrders.toString()} 
              change={analytics.orderChange} 
              backgroundColor={COLORS.primaryLight}
              textColor={COLORS.primary}
            />
            <AnalyticsCard 
              title="Revenue" 
              value={`৳${analytics.revenue.toLocaleString()}`} 
              change={analytics.revenueChange} 
              backgroundColor={COLORS.successLight}
              textColor={COLORS.success}
            />
          </View>
          
          <View style={styles.statsContainer}>
            <AnalyticsCard 
              title="Avg. Order Value" 
              value={`৳${analytics.averageOrderValue.toLocaleString()}`} 
              change={analytics.aovChange} 
              backgroundColor={COLORS.infoLight}
              textColor={COLORS.info}
            />
            <AnalyticsCard 
              title="New Customers" 
              value={analytics.newCustomers.toString()} 
              change={analytics.customerChange} 
              backgroundColor={COLORS.warningLight}
              textColor={COLORS.warning}
            />
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Items</Text>
            <PopularItemsCard items={mockPopularItems} />
          </View>
        </ScrollView>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
  },
  section: {
    marginTop: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 12,
  },
});