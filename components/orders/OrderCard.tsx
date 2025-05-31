import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Clock, ChevronsRight } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';

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

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return COLORS.pending;
      case 'preparing':
        return COLORS.info;
      case 'ready':
        return COLORS.success;
      case 'completed':
        return COLORS.success;
      case 'cancelled':
        return COLORS.error;
      default:
        return COLORS.grey;
    }
  };
  
  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableBadge}>
              <Text style={styles.tableBadgeText}>Table {order.tableNumber}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.customerContainer}>
          <Image 
            source={{ uri: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
            style={styles.customerImage}
          />
          <Text style={styles.customerName}>{order.customerName}</Text>
        </View>
        
        <View style={styles.itemsContainer}>
          {order.items.map((item, index) => (
            <Text key={index} style={styles.itemText}>
              {item.quantity}x {item.name}
            </Text>
          ))}
        </View>
        
        {order.note && (
          <View style={styles.noteContainer}>
            <Text style={styles.noteLabel}>Note:</Text>
            <Text style={styles.noteText}>{order.note}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.footer}>
        <View style={styles.timeContainer}>
          <Clock size={14} color={COLORS.darkGrey} />
          <Text style={styles.timeText}>{formatDate(order.createdAt)}</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.totalText}>৳{order.total}</Text>
          <ChevronsRight size={16} color={COLORS.primary} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 4,
  },
  tableContainer: {
    flexDirection: 'row',
  },
  tableBadge: {
    backgroundColor: COLORS.lightGrey,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tableBadgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: COLORS.darkGrey,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: COLORS.white,
  },
  content: {
    marginBottom: 12,
  },
  customerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  customerImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  customerName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.black,
  },
  itemsContainer: {
    marginBottom: 8,
  },
  itemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.darkGrey,
    marginBottom: 4,
  },
  noteContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryLight,
    padding: 8,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  noteLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: COLORS.primary,
    marginRight: 4,
  },
  noteText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: COLORS.darkGrey,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
    paddingTop: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.darkGrey,
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.black,
    marginRight: 4,
  },
});

export default OrderCard;