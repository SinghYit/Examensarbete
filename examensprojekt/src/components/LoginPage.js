import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions";

const LoginPage = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const [randomizedValue, setRandomizedValue] = useState("");
  const [items, setItems] = useState([]);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  useEffect(
    () => {
      //Fetching data
      const getItems = async () => {
        const response = await fetch("http://localhost:3000/accounts");
        //Converting response to JSON
        const theItems = await response.json();

        setItems(theItems);
      };
      getItems();
    },
    //When the value of randomizedValue is updated, the useEffect will run again
    [randomizedValue]
  );

  //Validates if user has entered username and password that matches an account in the backend.
  const validateUserAccount = () =>
    items.map((item) => {
      if (item.accountName === userName && item.accountPassword === password) {
        dispatch(login());
      }
    });

  return (
    <div className={"inputWrapper"}>
      <label id={"createQuotes"}>Username</label>

      {/*Changes the value of addQuote to the value entered in the input field*/}
      <input
        id={"createQuotes"}
        className={"createQuotesInputField"}
        onInput={(e) => setUserName(e.target.value)}
      ></input>

      <label id={"createQuotes"}>Password</label>

      {/*Changes the value of addQuote to the value entered in the input field*/}
      <input
        id={"createQuotes"}
        className={"createQuotesInputField"}
        onInput={(e) => setPassword(e.target.value)}
      ></input>

      {/*Button to add quote*/}
      <button onClick={validateUserAccount} className={"addQuoteButton"}>
        Log in
      </button>
    </div>
  );
};

export default LoginPage;
