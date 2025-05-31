# Menoo - Restaurant Management App

A modern restaurant management application built with React Native and Expo, designed to help restaurant owners and staff manage their operations efficiently.

## Features

- 📱 Cross-platform support (iOS, Android, Web)
- 🎨 Beautiful, modern UI with smooth animations
- 🔒 Secure QR code generation for tables
- 📊 Real-time analytics and reporting
- 🍽️ Menu management system
- 🎯 Table management with status tracking
- 📋 Order management system

## Tech Stack

- React Native
- Expo Router
- TypeScript
- Lucide Icons
- Expo Google Fonts
- React Native Reanimated
- React Native Gesture Handler

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/menoo-restaurant-app.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
app/
├── _layout.tsx              # Root layout
├── +not-found.tsx          # 404 page
├── index.tsx               # Entry point
├── (tabs)/                 # Tab navigation
│   ├── _layout.tsx         # Tab layout
│   ├── index.tsx           # Dashboard
│   ├── menus.tsx          # Menu management
│   ├── orders.tsx         # Order management
│   ├── tables.tsx         # Table management
│   ├── analytics.tsx      # Analytics
│   └── settings.tsx       # Settings
├── menu/                   # Menu routes
│   └── [id].tsx           # Menu details
├── qr-scanner.tsx         # QR Scanner
└── qr-generator.tsx       # QR Generator

components/               # Reusable components
├── analytics/           # Analytics components
├── dashboard/          # Dashboard components
├── menus/             # Menu components
├── orders/           # Order components
└── ui/              # UI components
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.