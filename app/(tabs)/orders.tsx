import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/Colors';
import Header from '@/components/ui/Header';
import OrderCard from '@/components/orders/OrderCard';
import { mockOrders } from '@/data/mockOrders';
import TabFilter from '@/components/ui/TabFilter';
import { X, Clock, Users, CreditCard } from 'lucide-react-native';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: string;
  tableNumber: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
  note?: string;
}

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const tabs = [
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];
  
  const filteredOrders = (mockOrders as Order[]).filter(order => {
    if (activeTab === 'active') return ['pending', 'preparing', 'ready'].includes(order.status);
    if (activeTab === 'completed') return order.status === 'completed';
    if (activeTab === 'cancelled') return order.status === 'cancelled';
    return true;
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return COLORS.warning;
      case 'preparing': return COLORS.info;
      case 'ready': return COLORS.success;
      case 'completed': return COLORS.success;
      case 'cancelled': return COLORS.error;
      default: return COLORS.grey;
    }
  };

  const OrderDetailsOverlay = () => {
    if (!selectedOrder) return null;

    return (
      <Modal
        visible={!!selectedOrder}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedOrder(null)}
      >
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <View style={styles.overlayHeader}>
              <Text style={styles.overlayTitle}>Order #{selectedOrder.id}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setSelectedOrder(null)}
              >
                <X size={24} color={COLORS.darkGrey} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.overlayBody}>
              <View style={styles.orderInfo}>
                <View style={styles.infoRow}>
                  <Clock size={20} color={COLORS.darkGrey} />
                  <Text style={styles.infoText}>{selectedOrder.createdAt}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Users size={20} color={COLORS.darkGrey} />
                  <Text style={styles.infoText}>{selectedOrder.customerName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <CreditCard size={20} color={COLORS.darkGrey} />
                  <Text style={styles.infoText}>Table {selectedOrder.tableNumber}</Text>
                </View>
              </View>

              <View style={styles.itemsSection}>
                <Text style={styles.sectionTitle}>Order Items</Text>
                {selectedOrder.items.map((item) => (
                  <View key={item.id} style={styles.orderItem}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  </View>
                ))}
              </View>

              {selectedOrder.note && (
                <View style={styles.noteSection}>
                  <Text style={styles.sectionTitle}>Note</Text>
                  <Text style={styles.noteText}>{selectedOrder.note}</Text>
                </View>
              )}

              <View style={styles.totalSection}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>${selectedOrder.total.toFixed(2)}</Text>
              </View>
            </ScrollView>

            <View style={styles.overlayFooter}>
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: getStatusColor(selectedOrder.status) }]}
                onPress={() => {
                  // Handle status update
                  setSelectedOrder(null);
                }}
              >
                <Text style={styles.actionButtonText}>Update Status</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Orders" />
      
      <View style={styles.content}>
        <TabFilter 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <FlatList
          data={filteredOrders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedOrder(item)}>
              <OrderCard order={item} />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No orders found</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      </View>

      <OrderDetailsOverlay />
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
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.darkGrey,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  overlayContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '70%',
  },
  overlayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  overlayTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.black,
  },
  closeButton: {
    padding: 4,
  },
  overlayBody: {
    flex: 1,
    padding: 16,
    paddingBottom: 16,
  },
  orderInfo: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.darkGrey,
    marginLeft: 8,
  },
  itemsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.black,
    flex: 1,
  },
  itemQuantity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.darkGrey,
    marginHorizontal: 8,
  },
  itemPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.black,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
  totalLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.black,
  },
  totalAmount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.primary,
  },
  overlayFooter: {
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: COLORS.white,
  },
  noteSection: {
    marginBottom: 24,
  },
  noteText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.darkGrey,
  },
});