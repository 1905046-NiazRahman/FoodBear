import React, { useState, useEffect } from "react";
import Navbar_Restaurant from "../../components/Navbar_Restaurant";
import {Footer} from "../../components/Footer";
import { Modal } from "react-bootstrap";
import axios from "axios";
export const DashboardRes = () => {
  const [restaurants, setRestaurant] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4010/api/restaurant/dashboard"
      );

      setRestaurant(response.data);

      response.data.map((item, index) => {
        if (item._id === localStorage.getItem("restaurant_id")) {
            console.log(item._id)
          setIsOpen(item.is_open);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleIsOpenToggle = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4010/api/restaurant/isopen/${localStorage.getItem(
          "restaurant_id"
        )}`
      );

      if (response.status === 200) {
        setIsOpen(!isOpen); // Toggle the is_open status
        console.log("is_open status updated successfully");
      } else {
        console.log("Failed to update is_open status");
      }
    } catch (error) {
      console.error("Error updating is_open status:", error);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div>
      <div>
        {restaurants.map((item, index) => {
          if (item._id === localStorage.getItem("restaurant_id")) {
            const restaurant = item;

            return (
              <div>
                <Navbar_Restaurant />

                <img
                  key={restaurant._id}
                  src={restaurant.img}
                  alt=""
                  height="400px"
                  width="100%"
                  style={{ objectFit: "cover" }}
                />

                <div className="container">
                  <div className="container mt-3 mx-6">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <div>
                        <h2>{restaurant.name}</h2>
                        {/* Assuming renderStars and averageRating are defined */}
                        {/* {renderStars(averageRating)} */}
                        <span className="ms-2">
                          {/* {averageRating.toFixed(1)} */}
                        </span>{" "}
                        <br />
                      </div>
                      <div
                        className="form-check form-switch mt-2"
                        style={{ fontSize: "22px" }}
                      >
                        <input
                          className="form-check-input"
                          style={{
                            cursor: "pointer",
                            backgroundColor: isOpen ? "transparent" : "#ff8a00",
                          }}
                          type="checkbox"
                          id="is_open"
                          checked={!isOpen}
                          onChange={handleIsOpenToggle}
                        />
                        <label className="form-check-label" htmlFor="is_open">
                          Close Now
                        </label>
                      </div>
                    </div>

                    <table className="table table-hover mt-3">
                      <tbody>
                        <tr>
                          <th scope="row">Restaurant ID</th>
                          <td>{restaurant._id}</td>
                        </tr>
                        <tr>
                          <th scope="row">Location</th>
                          <td>{restaurant.location}</td>
                        </tr>
                        <tr>
                          <th scope="row">E-mail</th>
                          <td>{restaurant.email}</td>
                        </tr>
                        <tr>
                          <th scope="row">Contact No.</th>
                          <td>{restaurant.contact}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <Footer />
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
