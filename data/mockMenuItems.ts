export const mockMenuItems = [
  // Bangladeshi Specialties
  {
    id: '1',
    categoryId: '1',
    name: 'Kacchi Biryani',
    description: 'Aromatic rice dish with tender meat and special spices',
    price: 350,
    imageUrl: 'https://images.pexels.com/photos/7353380/pexels-photo-7353380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isAvailable: true,
    isVegetarian: false,
    isSpicy: true,
    allergens: ['Nuts']
  },
  {
    id: '2',
    categoryId: '1',
    name: 'Beef Bhuna',
    description: 'Slow-cooked beef with aromatic spices',
    price: 280,
    imageUrl: 'https://images.pexels.com/photos/7353368/pexels-photo-7353368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isAvailable: true,
    isVegetarian: false,
    isSpicy: true,
    allergens: []
  },
  {
    id: '3',
    categoryId: '1',
    name: 'Ilish Paturi',
    description: 'Hilsa fish marinated in mustard and steamed in banana leaf',
    price: 400,
    imageUrl: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isAvailable: true,
    isVegetarian: false,
    isSpicy: true,
    allergens: ['Fish']
  },
  
  // Chinese Favorites
  {
    id: '4',
    categoryId: '2',
    name: 'Kung Pao Chicken',
    description: 'Spicy stir-fried chicken with peanuts, vegetables, and chili peppers',
    price: 250,
    imageUrl: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isAvailable: true,
    isVegetarian: false,
    isSpicy: true,
    allergens: ['Peanuts']
  },
  {
    id: '5',
    categoryId: '2',
    name: 'Szechuan Beef',
    description: 'Spicy beef stir-fried with vegetables and Szechuan peppercorns',
    price: 280,
    imageUrl: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isAvailable: true,
    isVegetarian: false,
    isSpicy: true,
    allergens: []
  },
  {
    id: '6',
    categoryId: '2',
    name: 'Vegetable Spring Rolls',
    description: 'Crispy rolls filled with mixed vegetables',
    price: 180,
    imageUrl: 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    allergens: ['Gluten']
  },
  
  // Italian Cuisine
  {
    id: '7',
    categoryId: '3',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato, mozzarella, and basil',
    price: 320,
    imageUrl: 'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    allergens: ['Gluten', 'Dairy']
  },
  {
    id: '8',
    categoryId: '3',
    name: 'Spaghetti Carbonara',
    description: 'Pasta with crispy bacon, eggs, and Parmesan cheese',
    price: 290,
    imageUrl: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isAvailable: true,
    isVegetarian: false,
    isSpicy: false,
    allergens: ['Gluten', 'Eggs', 'Dairy']
  },
  
  // Pakistani Delicacies
  {
    id: '9',
    categoryId: '4',
    name: 'Chicken Karahi',
    description: 'Spicy chicken dish cooked in a wok with tomatoes and green chilies',
    price: 300,
    imageUrl: 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isAvailable: true,
    isVegetarian: false,
    isSpicy: true,
    allergens: []
  },
  {
    id: '10',
    categoryId: '4',
    name: 'Beef Nihari',
    description: 'Slow-cooked beef stew with special spices',
    price: 320,
    imageUrl: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isAvailable: true,
    isVegetarian: false,
    isSpicy: true,
    allergens: []
  },
];

// For analytics and popular items
export const mockPopularItems = [
  {
    id: '1',
    name: 'Kacchi Biryani',
    orderCount: 42,
    revenue: 14700,
    imageUrl: 'https://images.pexels.com/photos/7353380/pexels-photo-7353380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '4',
    name: 'Kung Pao Chicken',
    orderCount: 38,
    revenue: 9500,
    imageUrl: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '7',
    name: 'Margherita Pizza',
    orderCount: 35,
    revenue: 11200,
    imageUrl: 'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    name: 'Ilish Paturi',
    orderCount: 28,
    revenue: 11200,
    imageUrl: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '9',
    name: 'Chicken Karahi',
    orderCount: 26,
    revenue: 7800,
    imageUrl: 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];