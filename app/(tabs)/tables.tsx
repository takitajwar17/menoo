import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Plus, QrCode, CreditCard as Edit, Trash, Filter, Users, Clock } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import { mockTables } from '@/data/mockTables';

export default function TablesScreen() {
  const router = useRouter();
  const [tables, setTables] = useState(mockTables);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const toggleTableStatus = (tableId: string) => {
    setTables(prevTables => 
      prevTables.map(table => 
        table.id === tableId 
          ? { ...table, isActive: !table.isActive } 
          : table
      )
    );
  };

  const updateTableStatus = (tableId: string, newStatus: string) => {
    setTables(prevTables => 
      prevTables.map(table => 
        table.id === tableId 
          ? { ...table, status: newStatus } 
          : table
      )
    );
  };

  // Filter tables based on location
  let filteredTables = tables;
  
  if (activeFilter) {
    filteredTables = filteredTables.filter(table => table.location === activeFilter);
  }
  
  const locations = [...new Set(tables.map(table => table.location))];
  
  // Calculate statistics
  const totalTables = tables.length;
  const activeTables = tables.filter(t => t.isActive).length;
  const occupiedTables = tables.filter(t => t.status === 'occupied').length;
  const totalCapacity = tables.reduce((sum, table) => sum + table.capacity, 0);

  const renderTableItem = ({ item }) => {
    // Define status colors
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'available': return COLORS.success;
        case 'reserved': return COLORS.warning;
        case 'occupied': return COLORS.primary;
        default: return COLORS.grey;
      }
    };

    const getStatusBgColor = (status: string) => {
      switch (status) {
        case 'available': return COLORS.successLight;
        case 'reserved': return COLORS.warningLight;
        case 'occupied': return COLORS.primaryLight;
        default: return COLORS.lightGrey;
      }
    };

    return (
      <View style={[
        styles.tableItem,
        !item.isActive && styles.inactiveTable
      ]}>
        <View style={styles.tableHeader}>
          <View style={styles.tableInfo}>
            <View style={[
              styles.tableNumberContainer,
              { backgroundColor: item.isActive ? getStatusBgColor(item.status) : COLORS.lightGrey }
            ]}>
              <Text style={[
                styles.tableNumber,
                { color: item.isActive ? getStatusColor(item.status) : COLORS.darkGrey }
              ]}>
                {item.number}
              </Text>
            </View>
            <View style={styles.tableDetails}>
              <Text style={styles.tableName}>Table {item.number}</Text>
              <View style={styles.tableMetaContainer}>
                <View style={styles.capacityContainer}>
                  <Users size={14} color={COLORS.darkGrey} />
                  <Text style={styles.tableCapacity}>{item.capacity}</Text>
                </View>
                <View style={styles.locationBadge}>
                  <Text style={styles.locationText}>{item.location}</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={[
            styles.statusBadge, 
            { backgroundColor: getStatusBgColor(item.status) }
          ]}>
            <Text style={[
              styles.statusText,
              { color: getStatusColor(item.status) }
            ]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        {item.reservation && (
          <View style={styles.reservationInfo}>
            <View style={styles.reservationDetail}>
              <Users size={14} color={COLORS.darkGrey} />
              <Text style={styles.reservationText}>{item.reservation.name}</Text>
            </View>
            <View style={styles.reservationDetail}>
              <Clock size={14} color={COLORS.darkGrey} />
              <Text style={styles.reservationText}>{item.reservation.time}</Text>
            </View>
          </View>
        )}
        
        <View style={styles.tableActions}>
          <TouchableOpacity 
            style={[styles.actionButton, !item.isActive && styles.disabledButton]}
              if (item.isActive) {
                Alert.alert(
                  "Update Table Status",
                  "Change table status to:",
                  [
                    { text: "Available", onPress: () => updateTableStatus(item.id, 'available') },
                    { text: "Reserved", onPress: () => updateTableStatus(item.id, 'reserved') },
                    { text: "Occupied", onPress: () => updateTableStatus(item.id, 'occupied') },
                    { text: "Cancel", style: "cancel" }
                  ]
                );
              }
            onPress={() => Alert.alert("Add Table", "This would open a form to add a new table")}
          >
            <Plus size={16} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.iconActions}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => toggleTableStatus(item.id)}
            >
              <View style={[
                styles.statusDot, 
                { backgroundColor: item.isActive ? COLORS.success : COLORS.grey }
              ]} />
              <Text style={styles.statusButtonText}>
                {item.isActive ? 'Active' : 'Inactive'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => router.push(`/qr-generator?table=${item.id}`)}
            >
              <QrCode size={20} color={COLORS.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconButton}>
              <Edit size={20} color={COLORS.darkGrey} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconButton}>
              <Trash size={20} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Tables" 
        rightComponent={
          <TouchableOpacity style={styles.filterButton}>
            <QrCode size={16} color="#fff" />
          </TouchableOpacity>
        }
      />
      
      <View style={styles.content}>
        {/* Simplified header that matches the image */}
        <View style={styles.statsCard}>
          <View style={styles.statsContent}>
            <View style={styles.mainStatsColumn}>
              <Text style={styles.totalTablesNumber}>{totalTables}</Text>
              <Text style={styles.totalTablesText}>Total Tables</Text>
            </View>
            
            <View style={styles.detailedStats}>
              <View style={styles.statItem}>
                <View style={[styles.statDot, { backgroundColor: COLORS.success }]} />
                <Text style={styles.statLabel}>Active:</Text>
                <Text style={styles.statValue}>{activeTables}</Text>
              </View>
              
              <View style={styles.statItem}>
                <View style={[styles.statDot, { backgroundColor: COLORS.primary }]} />
                <Text style={styles.statLabel}>Occupied:</Text>
                <Text style={styles.statValue}>{occupiedTables}</Text>
              </View>
              
              <View style={styles.statItem}>
                <View style={[styles.statDot, { backgroundColor: COLORS.info }]} />
                <Text style={styles.statLabel}>Capacity:</Text>
                <Text style={styles.statValue}>{totalCapacity}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.actionsContent}>
            <TouchableOpacity 
              style={styles.actionCircleButton}
              onPress={() => {
                Alert.alert("Add Table", "This would open a form to add a new table");
              }}
            >
              <Plus size={20} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionCircleButton, styles.qrButton]}
              onPress={() => router.push('/qr-generator')}
            >
              <QrCode size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.filtersSection}>
          <Text style={styles.filterTitle}>Location</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScrollView}>
            <TouchableOpacity 
              style={[
                styles.filterChip,
                activeFilter === null && styles.activeFilterChip
              ]}
              onPress={() => setActiveFilter(null)}
            >
              <Text style={[
                styles.filterChipText,
                activeFilter === null && styles.activeFilterChipText
              ]}>All</Text>
            </TouchableOpacity>
            
            {locations.map(location => (
              <TouchableOpacity 
                key={location}
                style={[
                  styles.filterChip,
                  activeFilter === location && styles.activeFilterChip
                ]}
                onPress={() => setActiveFilter(location)}
              >
                <Text style={[
                  styles.filterChipText,
                  activeFilter === location && styles.activeFilterChipText
                ]}>{location}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <FlatList
          data={filteredTables}
          keyExtractor={item => item.id}
          renderItem={renderTableItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Image 
                source={{ uri: "https://images.pexels.com/photos/6205509/pexels-photo-6205509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                style={styles.emptyImage}
              />
              <Text style={styles.emptyText}>No tables found</Text>
              <Text style={styles.emptySubtext}>Add tables to manage your restaurant</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  statsContent: {
    flex: 3,
    padding: 16,
    flexDirection: 'row',
    borderRightWidth: 1,
    borderRightColor: COLORS.lightGrey,
  },
  mainStatsColumn: {
    justifyContent: 'center',
    marginRight: 20,
  },
  totalTablesNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 48,
    color: COLORS.primary,
    lineHeight: 56,
  },
  totalTablesText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: COLORS.darkGrey,
  },
  detailedStats: {
    flex: 1,
    justifyContent: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: COLORS.darkGrey,
    marginRight: 4,
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: COLORS.black,
  },
  actionsContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.white,
  },
  actionCircleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  qrButton: {
    backgroundColor: COLORS.secondary,
  },
  filtersSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 8,
  },
  filterScrollView: {
    marginBottom: 8,
  },
  filterChip: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: COLORS.primary,
  },
  filterChipText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: COLORS.darkGrey,
  },
  activeFilterChipText: {
    color: COLORS.white,
  },
  filterButton: {
    padding: 8,
  },
  listContent: {
    paddingBottom: 100, // Extra padding to account for tab bar
  },
  tableItem: {
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
  inactiveTable: {
    opacity: 0.7,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderStyle: 'dashed',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  tableInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableNumberContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  tableNumber: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  tableDetails: {
    justifyContent: 'center',
  },
  tableName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.black,
  },
  tableMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  capacityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  tableCapacity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.darkGrey,
    marginLeft: 4,
  },
  locationBadge: {
    backgroundColor: COLORS.infoLight,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  locationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: COLORS.info,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  reservationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: COLORS.lightGrey,
  },
  reservationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reservationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: COLORS.darkGrey,
    marginLeft: 4,
  },
  tableActions: {
    padding: 16,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  disabledButton: {
    backgroundColor: COLORS.lightGrey,
  },
  actionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.white,
  },
  iconActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: COLORS.darkGrey,
    marginRight: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 40,
  },
  emptyImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.darkGrey,
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.grey,
    textAlign: 'center',
  },
});