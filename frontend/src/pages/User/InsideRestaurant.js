import React, { useState, useEffect } from "react";
import { RestaurantCard } from "./RestaurantCard";
import { Navbar } from "../../components/Navbar";
import { Row, Col } from "react-bootstrap";
//import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaStar } from "react-icons/fa";

export default function ShowFoods_Restaurant() {
  const [foods, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [desired_restaurant_id, setDesiredRestaurantID] = useState(
    localStorage.getItem("restaurant_id")
  );
  const [ratingUpdated, setratingUpdated] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [showRatingButtons, setShowRatingButtons] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [feedbackDisplayed, setFeedbackDisplayed] = useState(false);
  const [userReview, setUserReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewFeedbackDisplayed, setReviewFeedbackDisplayed] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [ratingPercentages, setRatingPercentages] = useState({});

  const fetchData = async () => {
    let response = await fetch("http://localhost:4010/api/restaurant/foods", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setFoodItems(response[0]);
    setFoodCategory(response[1]);
    setRestaurants(response[2]);
    console.log("restaurant id", localStorage.getItem("restaurant_id"));
  };

  const handleRating = async (userRating) => {
    //user will rate the restaurant
    const userId = localStorage.getItem("user_id");
    const response = await fetch(
      `http://localhost:5001/api/restaurant/rating/${desired_restaurant_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, rating: userRating }),
      }
    );

    const data = await response.json();

    if (data.success) {
      fetchReviews(); // Fetch the latest reviews
      setratingUpdated(true); // Update the rating in the state
      return true;
    } else {
      console.error("Failed to rate the restaurant");
      return false;
    }
  };

  const fetchRating = async () => {
    //average rating will be fetched from the database
    const response = await fetch(
      `http://localhost:5001/api/restaurant/rating/${desired_restaurant_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(response);

    const data = await response.json();
    // console.log(data.averageRating);

    if (data.success) {
      // console.log(data.averageRating);
      setAverageRating(data.averageRating); // Update the rating in the state
    } else {
      console.error("Failed to fetch the average rating");
    }

    setratingUpdated(false); // Reset the rating state
  };

  const fetchFavorites = async () => {
    const userId = localStorage.getItem("user_id");
    const restaurantId = localStorage.getItem("restaurant_id");
    console.log(userId);

    try {
      const response = await fetch(
        `http://localhost:5001/api/favorites/${userId}`
      );
      const data = await response.json();
      console.log("heree is the frontend part");
      console.log(data);

      if (response.ok) {
        // Update state or do something with the fetched favorites
        const favorites = data.map((fav) => fav._id);

        // Setting the isFavorite state
        setIsFavorite(favorites.includes(restaurantId));
        console.log("boolean value....", isFavorite);
      } else {
        console.log("Error fetching favorites:", data.message);
      }
    } catch (error) {
      console.error("An error occurred while fetching favorites:", error);
    }
  };

  const fetchRatings = async (restaurantId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/restaurant/${restaurantId}/ratings`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching ratings:", error);
      return [];
    }
  };

  const handleReviewSubmit = async () => {
    const userId = localStorage.getItem("user_id");
    const userName = localStorage.getItem("user_name");
    const response = await fetch(
      `http://localhost:5001/api/restaurant/review/${desired_restaurant_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, userName, review: userReview }),
      }
    );

    const data = await response.json();
    if (data.success) {
      fetchReviews();
      setReviewFeedbackDisplayed(true);
      setReviewSubmitted(true);
      setTimeout(() => {
        setReviewFeedbackDisplayed(false);
      }, 3000); // Hide the message after 3 seconds
    } else {
      console.error("Failed to submit the review");
    }
  };

  // New function to fetch reviews
  const fetchReviews = async () => {
    const response = await fetch(
      `http://localhost:5001/api/restaurant/review/${desired_restaurant_id}`
    );
    const data = await response.json();
    if (data.success) {
      setReviews(data.reviews);
    }
  };

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };

  //Function to toggle favourite button
  const toggleFavorite = async () => {
    // const userId = localStorage.getItem('user_id');
    const restaurantId = localStorage.getItem("restaurant_id");

    const url = isFavorite
      ? "http://localhost:5001/api/favorites/remove"
      : "http://localhost:5001/api/favorites/add";
    const payload = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, restaurantId }),
    };

    try {
      const response = await fetch(url, payload);
      if (response.ok) {
        setIsFavorite(!isFavorite);
      } else {
        console.error("Failed to update favorites");
      }

      // setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  // Function to render stars
  const renderStars = (averageRating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(averageRating)) {
        stars.push(
          <i className="bi bi-star-fill" style={{ color: "#ff8a00" }}></i>
        );
      } else if (i === Math.ceil(averageRating)) {
        const percentage = ((averageRating % 1) * 100).toFixed(2);
        stars.push(
          <div style={{ position: "relative", display: "inline-block" }}>
            <i className="bi bi-star" style={{ color: "#ff8a00" }}></i>
            <div
              style={{
                position: "absolute",
                overflow: "hidden",
                top: 0,
                left: 0,
                width: `${percentage}%`,
                zIndex: 1,
              }}
            >
              <i className="bi bi-star-fill" style={{ color: "#ff8a00" }}></i>
            </div>
          </div>
        );
      } else {
        stars.push(<i className="bi bi-star" style={{ color: "#ff8a00" }}></i>);
      }
    }
    return stars;
  };

  // New function to handle user rating
  const handleUserRating = async (rating) => {
    setUserRating(rating);
    const success = await handleRating(rating); // Assume handleRating() returns a boolean indicating success or failure
    if (success) {
      setFeedbackDisplayed(true);
      // setShowRatingButtons(false);
      setTimeout(() => {
        setFeedbackDisplayed(false);
        setShowRatingButtons(false);
      }, 3000); // Hide the message after 3 seconds and show the "Rate this restaurant" button again
    }
    // setratingUpdated(true); // Update the rating in the state
  };

  // New function to render clickable stars
  const renderClickableStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={i <= userRating ? "bi bi-star-fill" : "bi bi-star"}
          onClick={() => handleUserRating(i)}
          style={{ cursor: "pointer", color: "#ff8a00" }}
        ></i>
      );
    }
    return stars;
  };

  const calculateRatingPercentages = (ratings) => {
    let totalRatings = ratings.length;
    let ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    for (let rating of ratings) {
      console.log("Current rating:", rating);
      ratingCounts[rating.rating]++;
    }

    console.log("rating counts", ratingCounts);
    let ratingPercentages = {};
    for (let star = 1; star <= 5; star++) {
      ratingPercentages[star] = (ratingCounts[star] / totalRatings) * 100;
    }

    return ratingPercentages;
  };

  useEffect(() => {
    fetchData();
    //fetchRating();
    //fetchReviews();
    //fetchFavorites();
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("restaurant_id");
    setDesiredRestaurantID(id);
  }, []);

  useEffect(() => {
    const loadRatings = async () => {
      const restaurant_id = localStorage.getItem("restaurant_id");
      const fetchedRatings = await fetchRatings(restaurant_id);
      console.log("ratings", fetchedRatings);
      //setRatings(fetchedRatings);
      //setRatingPercentages(calculateRatingPercentages(fetchedRatings));
      console.log("rating percentage", ratingPercentages);
    };

    loadRatings();
  }, []);

  useEffect(() => {
    if (ratingUpdated) {
      fetchRating();
      setratingUpdated(false); // Reset the variable
    }
  }, [ratingUpdated]);

  useEffect(() => {
    if (feedbackDisplayed) {
      toggleReviewModal(); // Close the review modal
    }
  }, [feedbackDisplayed]);

  const [isHovered, setIsHovered] = useState(false);
  const hoverStyle = isHovered
    ? { transform: "scale(1.1)", transition: "transform 0.1s ease" }
    : {};

  const [isHovered2, setIsHovered2] = useState(false);
  const hoverStyle2 = isHovered2
    ? { transform: "scale(1.05)", transition: "transform 0.1s ease" }
    : {};

  const [isHovered3, setIsHovered3] = useState(false);
  const hoverStyle3 = isHovered3
    ? { transform: "scale(1.05)", transition: "transform 0.1s ease" }
    : {};

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        {restaurants.map((restaurant) =>
          restaurant._id === desired_restaurant_id ? (
            <img
              key={restaurant._id}
              src={restaurant.img}
              alt=""
              height="400px"
              width="100%"
              style={{ objectFit: "cover" }}
            />
          ) : null
        )}
      </div>

      <div className="container">
        {restaurants.map((restaurant) =>
          restaurant._id === desired_restaurant_id ? (
            <div
              className="d-flex justify-content-between align-items-center"
              key={restaurant._id}
            >
              <h2 className="mt-3">{restaurant.name}</h2>
            </div>
          ) : null
        )}
      </div>

      <div className="container">
        {foodCategory ? (
          foodCategory.map((item, index) => {
            const foodsInCategory = foods.filter(
              (foodItem) =>
                foodItem.CategoryName === item.CategoryName &&
                foodItem.restaurant_id === desired_restaurant_id &&
                foodItem.is_instock === true
            );

            if (foodsInCategory.length > 0) {
              return (
                <div key={index} className="row mb-3">
                  <h3>{item.CategoryName}</h3>
                  <hr />

                  {foodsInCategory.map((foodItem) => (
                    <div
                      key={foodItem._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <RestaurantCard
                        _id={foodItem._id}
                        restaurant_id={foodItem.restaurant_id}
                        name={foodItem.name}
                        img={foodItem.img}
                        CategoryName={foodItem.CategoryName}
                        price={foodItem.price}
                      ></RestaurantCard>
                    </div>
                  ))}
                </div>
              );
            }
            return null; // Don't render anything if there are no foods in this category
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}
