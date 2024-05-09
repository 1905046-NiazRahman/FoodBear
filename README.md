# FoodBear

FoodBear is a food delivery website I developed as part of my 4-1 term project for the  CSE-408(Software Development Sessional) course at BUET. It allows users to order food from various restaurants conveniently.

The website is built on the MERN stack, comprising MongoDB, Express.js, React.js, and Node.js. It includes features like location wise restaurant search, menu browsing, cart management,home kitchen,restaurant analytics,order tracking and many more to provide a seamless user experience.

## Features

### Home page and Authentications

Allows users,restaurants and delivery persons to create accounts, log in, and manage their profiles.
![User Authentication](https://gcdnb.pbrd.co/images/UObLCMd3AKyY.png?o=1)

![User Authentication](https://gcdnb.pbrd.co/images/r9vPHo4di9Dm.png?o=1)

![User Authentication](https://gcdnb.pbrd.co/images/yZ7Qb4DQ9K96.png?o=1)

### User Homepage

Enables users to search for restaurants based on various criteria such as location, and ratings.

![Restaurant Search](https://gcdnb.pbrd.co/images/CopJbEddNsLT.png?o=1)

### Integration of Google Map Api

Enables users to use Google map for searching restaurant.
![Restaurant Search](https://gcdnb.pbrd.co/images/HfAQon3YOKm1.png?o=1)

### Menu Browsing

- Description: Displays restaurant menus with options for filtering and sorting.
- Image: ![Menu Browsing](images/menu_browsing.png)

### Cart Management

- Description: Allows users to add items to their cart, adjust quantities, and proceed to checkout.
- Image: ![Cart Management](images/cart_management.png)

### Use Vouchers

- Description: Allows users to add items to their cart, adjust quantities, and proceed to checkout.
- Image: ![Cart Management](images/cart_management.png)

### Order Tracking and Map integration

- Description: Provides real-time updates on the status of orders, from preparation to delivery.
- Image: ![Order Tracking](images/order_tracking.png)

### HomeKitchen

- Description: Provides real-time updates on the status of orders, from preparation to delivery.
- Image: ![Order Tracking](images/order_tracking.png)

### Order Reviews and Ratings

- Description: Provides real-time updates on the status of orders, from preparation to delivery.
- Image: ![Order Tracking](images/order_tracking.png)

### Restaurant Side Dashboard

- Description: Provides real-time updates on the status of orders, from preparation to delivery.
- Image: ![Order Tracking](images/order_tracking.png)

### Restaurant Side Menu

- Description: Provides real-time updates on the status of orders, from preparation to delivery.
- Image: ![Order Tracking](images/order_tracking.png)

### Restaurant Analytics

- Description: Provides real-time updates on the status of orders, from preparation to delivery.
- Image: ![Order Tracking](images/order_tracking.png)

### Deliveryperson Dashboard

- Description: Provides real-time updates on the status of orders, from preparation to delivery.
- Image: ![Order Tracking](images/order_tracking.png)

## Installation (Backend)

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
   
## Installation (Frontend)

2. From root directory:
   ```sh
   cd frontend
   
3. Package Installation:
   ```sh
   npm install

4. Start localhost:3000 port(you can run multiple ports):
   ```sh
   npm start
## Note

When setting up your database connection in `db.js`, make sure to use the following URL:

```javascript
const MONGO_URI = "";
