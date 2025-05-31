import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { QrCode, Clock, TrendingUp, Settings, ShoppingBag, SquareMenu as MenuSquare, ClipboardList } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import Header from '@/components/ui/Header';
import StatsCard from '@/components/dashboard/StatsCard';
import OrderCard from '@/components/orders/OrderCard';
import { mockOrders } from '@/data/mockOrders';

export default function HomePage() {
  const router = useRouter();
  const recentOrders = mockOrders.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Dashboard" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.heroContainer}>
          <View style={styles.heroContent}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.restaurantName}>Dhaka Delights</Text>
            <Text style={styles.tagline}>Manage your restaurant with ease</Text>
          </View>
          <Image 
            source={{ uri: "https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }} 
            style={styles.heroImage} 
          />
        </View>

        <View style={styles.statsContainer}>
          <StatsCard 
            title="Today's Orders" 
            value="12" 
            icon={<ShoppingBag size={20} color={COLORS.primary} />} 
            backgroundColor={COLORS.primaryLight} 
          />
          <StatsCard 
            title="Revenue" 
            value="৳5,240" 
            icon={<TrendingUp size={20} color={COLORS.success} />} 
            backgroundColor={COLORS.successLight} 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/menus')}
            >
              <View style={[styles.iconContainer, { backgroundColor: COLORS.primaryLight }]}>
                <MenuSquare size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.actionText}>Manage Menus</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/qr-scanner')}
            >
              <View style={[styles.iconContainer, { backgroundColor: COLORS.successLight }]}>
                <QrCode size={24} color={COLORS.success} />
              </View>
              <Text style={styles.actionText}>Scan QR Code</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/tables')}
            >
              <View style={[styles.iconContainer, { backgroundColor: COLORS.infoLight }]}>
                <ClipboardList size={24} color={COLORS.info} />
              </View>
              <Text style={styles.actionText}>Manage Tables</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/orders')}
            >
              <View style={[styles.iconContainer, { backgroundColor: COLORS.warningLight }]}>
                <Clock size={24} color={COLORS.warning} />
              </View>
              <Text style={styles.actionText}>Active Orders</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity onPress={() => router.push('/orders')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {recentOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  heroContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.darkGrey,
  },
  restaurantName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: COLORS.black,
    marginBottom: 4,
  },
  tagline: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: COLORS.primary,
  },
  heroImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 12,
  },
  seeAll: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.darkGrey,
    textAlign: 'center',
  },
});