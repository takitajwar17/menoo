export const mockOrders = [
  {
    id: '1001',
    tableNumber: '12',
    customerName: 'Rafiq Ahmed',
    items: [
      { id: '1', name: 'Kacchi Biryani', quantity: 2, price: 350, total: 700 },
      { id: '4', name: 'Kung Pao Chicken', quantity: 1, price: 250, total: 250 },
    ],
    total: 950,
    status: 'preparing',
    createdAt: '2025-04-14T10:30:00Z',
    note: 'Extra spicy for the biryani please',
  },
  {
    id: '1002',
    tableNumber: '5',
    customerName: 'Sadia Rahman',
    items: [
      { id: '7', name: 'Margherita Pizza', quantity: 1, price: 320, total: 320 },
      { id: '8', name: 'Spaghetti Carbonara', quantity: 1, price: 290, total: 290 },
    ],
    total: 610,
    status: 'pending',
    createdAt: '2025-04-14T10:45:00Z',
  },
  {
    id: '1003',
    tableNumber: '8',
    customerName: 'Mohammed Hasan',
    items: [
      { id: '9', name: 'Chicken Karahi', quantity: 1, price: 300, total: 300 },
      { id: '5', name: 'Szechuan Beef', quantity: 1, price: 280, total: 280 },
    ],
    total: 580,
    status: 'ready',
    createdAt: '2025-04-14T10:15:00Z',
  },
  {
    id: '1004',
    tableNumber: '3',
    customerName: 'Farah Khan',
    items: [
      { id: '2', name: 'Beef Bhuna', quantity: 1, price: 280, total: 280 },
      { id: '3', name: 'Ilish Paturi', quantity: 1, price: 400, total: 400 },
    ],
    total: 680,
    status: 'completed',
    createdAt: '2025-04-14T09:30:00Z',
  },
  {
    id: '1005',
    tableNumber: '9',
    customerName: 'Arif Khan',
    items: [
      { id: '10', name: 'Beef Nihari', quantity: 2, price: 320, total: 640 },
      { id: '6', name: 'Vegetable Spring Rolls', quantity: 2, price: 180, total: 360 },
    ],
    total: 1000,
    status: 'cancelled',
    createdAt: '2025-04-14T10:00:00Z',
    note: 'Customer changed their mind',
  },
];