import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Quotes = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [addQuote, setAddQuote] = useState("");
  const [randomizedValue, setRandomizedValue] = useState("");
  const [items, setItems] = useState([]);

  useEffect(
    () => {
      //Fetching data
      const getItems = async () => {
        const response = await fetch(
          "http://localhost:3000/Quotes?_embed=comments"
        );
        //Converting response to JSON
        const theItems = await response.json();

        setItems(theItems);
      };
      getItems();
    },
    //When the value of randomizedValue is updated, the useEffect will run again
    [randomizedValue]
  );

  // This function takes the value of addQuote and sends a POST request with that value
  const addQuotes = async () => {
    //Validating inputfields if user has entered a empty string value
    if (addQuote === "") {
      document.getElementById("errorAddQuote").innerHTML =
        "Please enter a text";
      return;
    } else {
      document.getElementById("errorAddQuote").innerHTML =
        "You have added a quote";
    }

    //By updating state value of randomizedValue causes useEffect to run again, to fetch the latest data
    setRandomizedValue(Math.random());

    //Sending a POST request with the value of addQuote
    await fetch("http://localhost:3000/Quotes", {
      method: "POST",
      headers: { "Content-type": "application/JSON" },
      body: JSON.stringify({
        description: addQuote,
      }),
    });
  };

  return (
    <div className={"quotesWrapper"}>
      <div className={"quotes"}>
        <div className={"inputWrapper"}>
          <label id={"createQuotes"} className={"createQuotesLabel"}>
            Add a inspiring quote!
          </label>
          <br></br>

          {/*Changes the value of addQuote to the value entered in the input field*/}
          <input
            id={"createQuotes"}
            onInput={(e) => setAddQuote(e.target.value)}
            className={"createQuotesInputField"}
          ></input>
          {isLoggedIn ? (
            /*Add quote*/
            <button onClick={addQuotes} className={"addQuoteButton"}>
              Add
            </button>
          ) : (
            <Link to="/login" className={"addQuoteButton"}>
              Add
            </Link>
          )}
          {/*Displays error message if the user adds the quote with an empty value, or if they've sucessfully added the quote*/}
          <p className={"errorText"} id={"errorAddQuote"}></p>
        </div>
      </div>
      {items.map((item) => (
        <div className={"quotes"}>
          <h2 className={"quoteText"}>{item.description}</h2>
          <div className={"bottomQuoteWrapper"}>
            <div className={"buttonWrapper"}>
              <button className={"linkButton"}>
                <Link
                  to={"/quote/" + item.id}
                  state={item}
                  className={"linkText"}
                >
                  View the quote
                </Link>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Quotes;
