# 🌱 Mini Plant Store

A modern, full-stack e-commerce web application for selling plants online. Built with React.js frontend and Node.js backend, featuring a beautiful glass morphism design and complete shopping experience.

## ✨ Features

### 🛍️ Shopping Experience
- **Interactive Plant Catalog** - Browse 50+ plants with detailed information
- **Advanced Search & Filter** - Find plants by name, category, and care level
- **Smart Cart System** - Add, remove, and manage quantities with real-time updates
- **Blinkit-style Checkout** - Professional cart with quantity controls and bill breakdown

### 💳 Payment & Checkout
- **Multi-step Checkout Flow** - Cart → Payment → Order Confirmation
- **Multiple Payment Options** - Card, UPI, Digital Wallet, Cash on Delivery
- **Order Management** - Auto-generated order IDs and tracking
- **Transparent Pricing** - MRP includes all taxes, free delivery above ₹199

### 🎨 Modern UI/UX
- **Glass Morphism Design** - Beautiful translucent cards with blur effects
- **Dark/Light Theme** - Toggle between themes with smooth transitions
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Engaging micro-interactions and transitions

### 🌟 Interactive Elements
- **Hero Slider** - Showcasing featured products and offers
- **Plant Modal** - Detailed plant information with high-quality images
- **Toast Notifications** - Success messages and feedback
- **Loading States** - Skeleton screens and spinners for better UX

## 🚀 Tech Stack

### Frontend
- **React.js** - Component-based UI library
- **CSS3** - Custom styling with CSS variables and animations
- **Context API** - State management for theme and cart
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for plant data
- **Mongoose** - MongoDB object modeling

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/mini-plant-store
PORT=5000
```

Start backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend development server:
```bash
npm run dev
```

## 🌐 API Endpoints

### Plants
- `GET /api/plants` - Get all plants
- `GET /api/plants/:id` - Get plant by ID
- `POST /api/plants` - Create new plant (Admin)
- `PUT /api/plants/:id` - Update plant (Admin)
- `DELETE /api/plants/:id` - Delete plant (Admin)

## 📱 Pages & Components

### Main Pages
- **Home** - Plant catalog with search and filters
- **Admin** - Plant management dashboard

### Key Components
- **HeroSlider** - Featured products carousel
- **PlantCard** - Individual plant display
- **CartModal** - Shopping cart with Blinkit-style UI
- **PaymentModal** - Payment method selection
- **ThankYouModal** - Order confirmation
- **Toast** - Notification system

## 🎯 Key Features Explained

### Shopping Cart
- **Quantity Controls** - Increase/decrease with visual feedback
- **Bill Breakdown** - MRP (includes all taxes) + delivery fee
- **Free Delivery** - Orders above ₹199 get free delivery
- **Address Management** - Click to edit delivery address

### Payment Flow
1. **Add to Cart** - Success modal with continue/view cart options
2. **Cart Review** - Manage quantities and see bill details
3. **Payment** - Select payment method and process
4. **Confirmation** - Order placed notification + thank you page

### Theme System
- **CSS Variables** - Dynamic color switching
- **Context API** - Global theme state management
- **Smooth Transitions** - Animated theme changes
- **Persistent Storage** - Theme preference saved locally

## 🎨 Design System

### Colors
- **Primary Green** - #2d5016
- **Secondary Green** - #4a7c59
- **Accent Green** - #7fb069
- **Light Green** - #a7c957
- **Glass Background** - rgba(255, 255, 255, 0.9)

### Typography
- **Font Family** - Inter, system fonts
- **Headings** - 700-800 weight
- **Body Text** - 400-600 weight
- **Responsive Sizing** - clamp() for fluid typography

### Animations
- **Entrance** - fadeIn, slideInUp, bounceIn
- **Interactions** - hover effects, button animations
- **Loading** - skeleton screens, spinners
- **Micro-interactions** - cart updates, notifications

## 📊 Database Schema

### Plant Model
```javascript
{
  name: String,
  price: Number,
  description: String,
  image: String,
  categories: [String],
  available: Boolean,
  careInstructions: String
}
```

## 🔧 Configuration

### Environment Variables
- `MONGODB_URI` - Database connection string
- `PORT` - Server port (default: 5000)
- `VITE_API_URL` - Frontend API endpoint

### Build Commands
```bash
# Frontend build
cd frontend && npm run build

# Backend start
cd backend && npm start
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables

### Backend (Heroku/Railway)
1. Push to Git repository
2. Set environment variables
3. Deploy with auto-build

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mini Plant Store Team**
- Modern e-commerce solution for plant enthusiasts
- Built with ❤️ for plant lovers

## 🌟 Acknowledgments

- Plant images from Unsplash
- Icons and emojis for enhanced UX
- Modern web technologies and best practices

---

**🌱 Transform Your Space • 💨 Purify Air • 💚 Live Green**