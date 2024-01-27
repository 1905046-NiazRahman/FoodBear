import React, { useState, useEffect } from "react";
import {Navbar} from "../../components/Navbar";
import { RestaurantCard } from "./RestaurantCard";
import { NavbarRestaurant } from "../../components/Navbar_Restaurant";
import Footer from "../../components/Footer";
// import { FaHeart } from 'react-icons/fa';
// import { FaFire } from 'react-icons/fa';

export const UserHome = () => {
  // Fetch data from /api/restaurants route
  const [restaurants, setRestaurants] = useState([]);

  // Fetch restaurant data
  const fetchData = async () => {
    const response = await fetch("http://localhost:4010/api/user/restaurants", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setRestaurants(data);
    console.log("restaurants", data);
  };

  useEffect(() => {
    fetchData();
    // fetchUser();
  }, []);

  return (
    <div>
      <Navbar/>
      {restaurants.length > 0 && (
        <div className="row mt-4">
          <h4>All Restaurants</h4>
          <hr />
          {restaurants
            .filter((restaurant) => restaurant.is_open) // Filter open restaurants
            .map((restaurant) => (
              <div key={restaurant._id} className="col-12 col-md-6 col-lg-3">
                <RestaurantCard
                  _id={restaurant._id}
                  name={restaurant.name}
                  img={restaurant.img}
                  location={restaurant.location}
                  averageRating={restaurant.averageRating}
                  is_open={restaurant.is_open}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
