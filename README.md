# 🖼️ Masonry Grid Photo Gallery

A modern, responsive photo gallery built with React and TypeScript featuring a masonry grid layout, infinite scroll, virtualization, and dynamic search functionality. This project demonstrates advanced React patterns including custom hooks, performance optimization, and responsive design.

## ✨ Features

### 🎨 **Masonry Grid Layout**
- Responsive masonry grid that adapts to different screen sizes
- Dynamic column calculation based on window width
- Smooth layout transitions and animations
- Optimized for various image aspect ratios

### 🔍 **Search Functionality**
- Real-time search with Pexels API integration
- Debounced search input for optimal performance
- Search results with loading states and error handling
- Clean, modern search interface

### 📱 **Responsive Design**
- Mobile-first responsive design
- Adaptive column layout (1-10+ columns based on screen size)
- Touch-friendly interface
- Optimized for all device sizes

### ⚡ **Performance Optimizations**
- **Virtualization**: Only renders visible items for smooth scrolling
- **Infinite Scroll**: Loads more images as you scroll
- **Throttled Scroll Events**: Optimized scroll handling
- **Dynamic Imports**: Code splitting for better initial load times
- **Memoized Calculations**: Efficient layout computations

### 🎯 **Advanced Features**
- **Detailed View**: Click any image to view full details
- **Photographer Attribution**: Links to photographer profiles
- **Loading States**: Smooth loading animations
- **Error Boundaries**: Graceful error handling

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/masonry-grid.git
   cd masonry-grid
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header/         # Application header
│   ├── LoadingSpinner/ # Loading animation component
│   └── Search/         # Search input component
├── hooks/              # Custom React hooks
│   ├── useResize.ts    # Window resize handling
│   ├── useScroll.ts    # Scroll position tracking
│   └── useSearch.ts    # Search and data management
├── pages/              # Page components
│   ├── Grid/           # Main grid page
│   └── DetailedView/   # Image detail page
├── services/           # API services
│   └── pexels.ts       # Pexels API integration
├── utils/              # Utility functions
│   └── index.ts        # Throttle and layout utilities
└── constants/          # Application constants
    └── index.ts        # Column width and gap constants
```

## 🔧 Technical Implementation

### **Custom Hooks**

#### `useResize`
- Tracks window resize events
- Calculates optimal column count based on screen width
- Responsive layout management

#### `useScroll`
- Monitors scroll position
- Implements infinite scroll functionality
- Throttled scroll event handling

#### `useSearch`
- Manages search state and API calls
- Implements virtualization for performance
- Handles pagination and data loading

### **Performance Features**

#### **Virtualization**
```typescript
// Only renders items visible in viewport
const visibleItems = useMemo(() => {
  const buffer = 500; // Buffer zone
  const viewportTop = scrollPosition - buffer;
  const viewportBottom = scrollPosition + window.innerHeight + buffer;
  
  return items.filter(item => 
    item.y + item.height >= viewportTop && 
    item.y <= viewportBottom
  );
}, [items, scrollPosition]);
```

#### **Masonry Layout Algorithm**
```typescript
// Calculates optimal item placement
const { minCol, minY } = getNextIndex(yMap, columns);
const x = minCol * (COLUMN_WIDTH + COLUMN_GAP) + xOffset;
const y = minY;
```

### **Responsive Design**
- **Column Calculation**: `Math.floor(window.innerWidth / (COLUMN_WIDTH + COLUMN_GAP))`
- **Dynamic Layout**: Adapts to screen size changes
- **Mobile Optimization**: Touch-friendly interface

## 🎨 Styling

The project uses **styled-components** for:
- Component-scoped styling
- Responsive design utilities
- Performance optimization with `shouldForwardProp`

### **Color Palette**
- Primary: `#3498db` (Light Blue)
- Background: `#282c34` (Dark Gray)
- Text: `#ffffff` (White)
- Accent: `#888888` (Light Gray)

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run all tests
npm test

# Run tests for specific files
npm test -- --testPathPattern=useSearch

# Run tests with coverage report
npm test -- --coverage --watchAll=false
```

### **Test Coverage**
- ✅ Component unit tests
- ✅ Custom hook tests
- ✅ Utility function tests

## 🌐 API Integration

### **Pexels API**
- **Endpoint**: `https://api.pexels.com/v1/search`
- **Features**: 
  - High-quality stock photos
  - Multiple image sizes
  - Photographer attribution
  - Pagination support

### **Environment Variables**
```env
REACT_APP_PEXELS_API_KEY=your_pexels_api_key_here
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the test files for usage examples

**Built with ❤️ using React, TypeScript, and styled-components**
