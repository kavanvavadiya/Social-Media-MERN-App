import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });

  try {
    const res = await axios.post("/auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    console.log(err,"idhar aaya")
    dispatch({ 
      type: "LOGIN_FAILURE", 
      payload: err.response?.data || "Login failed. Please try again." 
    });
  }
};
