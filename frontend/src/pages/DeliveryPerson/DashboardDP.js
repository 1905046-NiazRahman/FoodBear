import React, { useState, useEffect } from "react";
import { NavbarDP } from "../../components/NavbarDP";
import { Footer } from "../../components/Footer";
import axios from "axios";
export const DashboardDP = () => {
  const [delivery_persons, setDeliveryPersons] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);

  const fetchAllDeliveryPersons = async (req, res) => {
    let response = await axios.get(
      "http://localhost:4010/api/deliveryperson/dashboard"
    );
    setDeliveryPersons(response.data);

    delivery_persons.map((singleDP) => {
      if (singleDP._id === localStorage.getItem("deliveryperson_id")) {
        setIsAvailable(singleDP.is_available);
      }
    });
  };

  //currently jesob dp logged in tader current active status set korbe
  //if they were offine then set offline and vice versa

  //there might be a bug in my code

  const handleIsAvailableToggle = async () => {
    try {
      const response =
        await axios.put(`http://localhost:4010/api/deliveryperson/isavailable/
        ${localStorage.getItem("deliveryperson_id")}`);

      if (response.status === 200) {
        setIsAvailable(!isAvailable);
        console.log("is available updated ok");
      }
    } catch (error) {
      console.log("error is available updating");
    }
  };

  useEffect(() => {
    fetchAllDeliveryPersons();
  }, []);

  return (
    <div>
      <div>
        {delivery_persons.map((item, index) => {
          if (item._id === localStorage.getItem("deliveryperson_id")) {
            const deliveryperson = item;

            return (
              <div>
                <NavbarDP />

                <div
                  className="container"
                  style={{ position: "relative", top: "100px" }}
                >
                  <div className="container mt-3 mx-6">
                    <div className="d-flex flex-row justify-content-between">
                      <h2>{deliveryperson.name}</h2>
                      <div
                        className="form-check form-switch mt-2"
                        style={{ fontSize: "22px" }}
                      >
                        <input
                          className="form-check-input"
                          style={{
                            cursor: "pointer",
                            backgroundColor: isAvailable
                              ? "#ff8a00"
                              : "transparent",
                          }}
                          type="checkbox"
                          id="is_available"
                          checked={isAvailable}
                          onChange={handleIsAvailableToggle}
                        />
                        <label className="form-check-label" htmlFor="is_open">
                          Available Now
                        </label>
                      </div>
                    </div>

                    <table className="table table-hover">
                      <tbody>
                        <tr>
                          <th scope="row">Delivery Person ID</th>
                          <td>{deliveryperson._id}</td>
                        </tr>
                        <tr>
                          <th scope="row">Location</th>
                          <td>{deliveryperson.location}</td>
                        </tr>
                        <tr>
                          <th scope="row">E-mail</th>
                          <td>{deliveryperson.email}</td>
                        </tr>
                        <tr>
                          <th scope="row">Contact No.</th>
                          <td>{deliveryperson.contact}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
