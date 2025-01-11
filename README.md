# 🐻 FoodBear 🐻

FoodBear is a food delivery website I developed as part of my 4-1 term project for the  CSE-408(Software Development Sessional) course at BUET. It allows users to order food from various restaurants conveniently.

The website is built on the MERN stack, comprising MongoDB, Express.js, React.js, and Node.js. It includes features like location wise restaurant search, menu browsing, cart management,home kitchen,restaurant analytics,order tracking and many more to provide a seamless user experience.
## 📺 Demo Video
https://youtu.be/cIPb2VHdnJU?si=2zo6IdjLN_wLxXuO
## 📋 Features

### 🔐 Home Page & Authentication
- **Account Creation and Login**: Users, Restaurants, and Delivery Personnel can create accounts, log in, and manage their profiles.
  
### 🏠 User Homepage
- **Restaurant Search**: Search for restaurants based on criteria such as location, ratings, and categories.

### 🌍 Google Maps Integration
- **Restaurant Location**: Users can locate nearby restaurants using Google Maps.

### 📖 Menu Browsing
- **Filter & Sort Menus**: Users can browse restaurant menus with filtering and sorting options for easy discovery.

### 🛒 Cart Management
- **Manage Cart Items**: Add items to the cart, adjust quantities, and proceed to checkout smoothly.

### 🎟️ Voucher System
- **Apply Discounts**: Users can use vouchers to receive discounts during checkout.

### 📦 Order Tracking & Map Integration
- **Real-Time Order Tracking**: Track order progress, from preparation to delivery, with real-time updates on a map.

### 🍳 Home Kitchen Feature
- **Home-Cooked Meals**: Users can order unique, home-cooked meals directly from home chefs.

### ⭐ Order Reviews & Ratings
- **Leave Feedback**: Users can provide ratings and reviews on their orders and restaurant experiences.

### 📊 Restaurant Dashboard
- **Order Management**: Manage incoming orders and update their status in real time.
- **Menu Management**: Add, edit, or remove menu items easily.
- **Analytics**: Access performance analytics for business insights.

### 🚚 Delivery Person Dashboard
- **Manage Deliveries**: Delivery personnel can view assigned orders, track delivery routes, and update order statuses.

## 🔧 Installation (Backend)

1. Clone the repository:
   ```sh
   git clone https://github.com/Rakib047/FoodBear.git
   
2. From root directory:
   ```sh
   cd backend
   
3. Package Installation:
   ```sh
   npm install

4. Start the Server:
   ```sh
   npm start
   
## 🔧 Installation (Frontend)

2. From root directory:
   ```sh
   cd frontend
   
3. Package Installation:
   ```sh
   npm install

4. Start localhost:3000 port(you can run multiple ports):
   ```sh
   npm start
## 📝 Note

When setting up your database connection in `db.js`, make sure to use the following URL:

```javascript
const MONGO_URI = "mongodb+srv://rakib047:Rakib22422m@merndb.nlsauhz.mongodb.net/FoodBear?retryWrites=true&w=majority";
