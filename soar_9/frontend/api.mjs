import React from "react";

import axios from "axios";

//Fetch the button states from the backend
export const fetchButtonStatesFromBackend = async () => {
  const response = await axios.get("http://localhost:3000/buttons");
  return response.data;
};

//Send the updated state to the backend
export const updateButtonStateOnBackend = async (id, state) => {
    console.log("here");
    console.log(id, state);
  await axios.patch("http://localhost:3000/buttons", { id, state});
};

