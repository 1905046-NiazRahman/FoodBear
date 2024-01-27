import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
const AddFoodModal = ({ show, onHide, onSubmit }) => {
  const [food, setFood] = useState({
    name: "",
    CategoryName: "",
    price: "",
    img: "",
  });

  const onChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = [];

    if (food.name.trim() === "") {
      errors.push("Name must not be empty");
    }

    if (food.CategoryName.length === 0) {
      errors.push("Category must not be empty");
    }

    if (food.price <= 0) {
      errors.push("Price must be greater than 0");
    }

    if (food.img.trim() === "") {
      errors.push("Image must not be empty");
    }

    return errors;
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const response = await axios.post(
      "http://localhost:4010/api/restaurant/addfood",
      {
        name: food.name,
        CategoryName: food.CategoryName,
        price: food.price,
        img: food.img,
        restaurant_id: localStorage.getItem("restaurant_id"),
      }
    );

    window.location.href = "/restaurant/foods";
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Food</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter food name"
              name="name"
              value={food.name}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="CategoryName">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter food category"
              name="CategoryName"
              value={food.CategoryName}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter food price"
              name="price"
              value={food.price}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="img">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              name="img"
              value={food.img}
              onChange={onChange}
            />
          </Form.Group>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-success btn-sm"
              onClick={handleAddSubmit}
            >
              Add food
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddFoodModal;
