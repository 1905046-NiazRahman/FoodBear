import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Navbar_Restaurant from "../../components/Navbar_Restaurant";

const RestaurantSalesPage = () => {
  // Dummy data representing restaurant sales information
  const salesData = [
    { name: "Burger", Earned: 4730 },
    { name: "Pizza", Earned: 5500 },
    { name: "Salad", Earned: 1890 },
    // Add more categories as needed
  ];

  // Dummy data representing how many times each food item was sold
  const foodSoldData = [
    { food: "Burger", count: 50 },
    { food: "Pizza", count: 70 },
    { food: "Salad", count: 30 },
    // Add more food items as needed
  ];

  // Colors for different categories
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Add more colors as needed
  const [isHoveredSales, setIsHoveredSales] = useState(false);
  const [isHoveredFood, setIsHoveredFood] = useState(false);

  const handleMouseEnterSales = () => {
    setIsHoveredSales(true);
  };

  const handleMouseLeaveSales = () => {
    setIsHoveredSales(false);
  };

  const handleMouseEnterFood = () => {
    setIsHoveredFood(true);
  };

  const handleMouseLeaveFood = () => {
    setIsHoveredFood(false);
  };

  const cardStyle = {
    paddingTop: "120px",
    width: "45%",
    marginLeft: "20px",
    transition: "transform 0.1s ease-in-out",
  };

  const cardStyleSales = {
    ...cardStyle,
    transform: isHoveredSales ? "scale(1.05)" : "scale(1)",
  };

  const cardStyleFood = {
    ...cardStyle,
    transform: isHoveredFood ? "scale(1.05)" : "scale(1)",
  };

  return (
    <div>
      <Navbar_Restaurant />
      <div
        className="container"
        style={{ display: "flex" }}
      >
        {/* Restaurant Sales Card */}
        <div style={cardStyleSales} onMouseEnter={handleMouseEnterSales} onMouseLeave={handleMouseLeaveSales}>
          <Card>
            <Card.Body>
              <Card.Title>Catagory-wise Sales</Card.Title>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={salesData}>
                    <Bar dataKey="Earned" fill="#8884d8" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Food Sold Card */}
        <div style={cardStyleFood} onMouseEnter={handleMouseEnterFood} onMouseLeave={handleMouseLeaveFood}>
          <Card>
            <Card.Body>
              <Card.Title>Food-wise Sales</Card.Title>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={foodSoldData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="food" type="category" />
                    <Bar dataKey="count" fill="#82ca9d" />
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSalesPage;
