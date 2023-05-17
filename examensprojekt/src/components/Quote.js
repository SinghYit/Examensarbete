import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Quote = () => {
  let { state } = useLocation();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [addComment, setAddComment] = useState("");
  const [editQuoteValue, setEditQuoteValue] = useState("");
  const [editCommentValue, setEditCommentValue] = useState("");
  const [randomizedValue, setRandomizedValue] = useState("");
  const [items, setItems] = useState([]);

  //This function deletes a quote with a specific object id

  const deleteQuote = async (itemId) => {
    setRandomizedValue(Math.random());

    //Sending a DELETE request with the value of itemId
    await fetch("http://localhost:3000/Quotes/" + itemId, {
      method: "DELETE",
      headers: { "Content-type": "application/JSON" },
    });
  };

  //This function takes the value of editQuoteValue and sends a PUT request with that value.

  const editQuote = async (itemId) => {
    //Validating input fields
    if (editQuoteValue === "") {
      document.getElementById("errorEditQuote" + itemId).innerHTML =
        "Please enter a text";
      return;
    } else {
      document.getElementById("errorEditQuote" + itemId).innerHTML =
        "You have edited the quote";
    }

    setRandomizedValue(Math.random());

    //Sending a PUT request with the value of itemId and editQuoteValue
    await fetch("http://localhost:3000/Quotes/" + itemId, {
      method: "PUT",
      headers: { "Content-type": "application/JSON" },
      body: JSON.stringify({
        id: itemId,
        description: editQuoteValue,
      }),
    });
  };

  const showQuoteField = (itemId) => {
    document.getElementById("editQuoteDiv" + itemId).style.display = "block";
  };

  //This function takes the value of addComment and sends a POST request with that value.

  const addComments = async (itemId) => {
    //Validating input fields
    if (addComment === "") {
      document.getElementById("errorAddComment" + itemId).innerHTML =
        "Please enter a text";
      return;
    } else {
      document.getElementById("errorAddComment" + itemId).innerHTML =
        "You have added a comment";
    }

    setRandomizedValue(Math.random());

    //Sending a POST request with the value of addComment and itemId
    await fetch("http://localhost:3000/Comments", {
      method: "POST",
      headers: { "Content-type": "application/JSON" },
      body: JSON.stringify({
        description: addComment,
        quoteId: itemId,
      }),
    });
  };

  //This function deletes a comment with a specific object id

  const deleteComment = async (itemId) => {
    setRandomizedValue(Math.random());

    //Sending a Delete request with the value of itemId
    await fetch("http://localhost:3000/Comments/" + itemId, {
      method: "DELETE",
      headers: { "Content-type": "application/JSON" },
    });
  };

  //This function changes the display property of a div element from none to flex.

  const showCommentField = (itemId) => {
    document.getElementById("commentDiv" + itemId).style.display = "flex";
  };

  //This function takes the value of editCommentValue and sends a PUT request with that value.

  const editComment = async (itemId, quoteId) => {
    //Validating input fields
    if (editCommentValue === "") {
      document.getElementById("errorEditComment" + itemId).innerHTML =
        "Please enter a text";
      return;
    } else {
      document.getElementById("errorEditComment" + itemId).innerHTML =
        "You have edited the comment";
    }

    setRandomizedValue(Math.random());

    //Sending a PUT request with the value of itemId, editCommentValue and quoteId
    await fetch("http://localhost:3000/Comments/" + itemId, {
      method: "PUT",
      headers: { "Content-type": "application/JSON" },
      body: JSON.stringify({
        id: itemId,
        description: editCommentValue,
        quoteId: quoteId,
      }),
    });
  };

  return (
    <div className={"quoteWrapper"}>
      <div className={"quote"}>
        <h2 className={"quoteText"}>{state.description}</h2>
        <div className={"bottomQuoteWrapper"}>
          <div className={"buttonWrapperQuote"}>
            {isLoggedIn ? (
              /*Displays the input field for editing a quote*/
              <button
                className={"quoteButton"}
                onClick={() => showQuoteField(state.id)}
              >
                Update
              </button>
            ) : null}
            {/*A div containing input field and a button to edit a quote, and is shown when user clicks the Update button*/}
            <div id={"editQuoteDiv" + state.id} style={{ display: "none" }}>
              {/*Changes the value of editQuoteValue to the value entered in the input field*/}
              <input onInput={(a) => setEditQuoteValue(a.target.value)}></input>

              {/*Edits specific quote*/}
              <button
                className={"quoteButton"}
                onClick={() => editQuote(state.id)}
              >
                Edit
              </button>

              <br></br>

              {/*Displays error message if the user edits the quote with an empty value, or if they've sucessfully edited the quote*/}
              <p id={"errorEditQuote" + state.id}></p>
            </div>
            {isLoggedIn ? (
              <button
                className={"quoteButton"}
                onClick={() => deleteQuote(state.id)}
              >
                Delete
              </button>
            ) : null}
          </div>

          {/*Displays error message if the user edits the quote with an empty value, or if they've sucessfully edited the quote*/}
          <p id={"errorEditQuote" + state.id}></p>
          <div className={"commentsWrapper"}>
            <div className={"addCommentWrapper"}>
              <p id={"errorAddComment" + state.id}></p>

              {/*Changes the value of addComment to the value entered in input field*/}
              <input
                className={"editCommentsInputField"}
                onInput={(a) => setAddComment(a.target.value)}
              ></input>

              {isLoggedIn ? (
                /*Adds a comment to the quote*/
                <button
                  className={"linkButton"}
                  onClick={() => addComments(state.id)}
                >
                  Add a comment
                </button>
              ) : (
                <Link to="/login" className={"linkButton"}>
                  Add
                </Link>
              )}

              {/*Displays error message if the user adds a comment with an empty value, or if they've sucessfully added the comment*/}
              <p id={"errorAddComment" + state.id}></p>
            </div>
            {state.comments.map((anotherItem) => (
              <div className={"commentWrapper"}>
                {/*Displays the description of a specific comment*/}
                <p className={"commentDescription"}>
                  {anotherItem.description}
                </p>

                {isLoggedIn ? (
                  <div className={"commentsButtonWrapper"}>
                    {/*Deletes specific comment*/}
                    <button
                      className={"linkButton"}
                      onClick={() => deleteComment(anotherItem.id)}
                    >
                      Delete
                    </button>
                    {/*Displays a input field for editing a comment*/}
                    <button
                      className={"linkButton"}
                      onClick={() => showCommentField(anotherItem.id)}
                    >
                      Update
                    </button>
                  </div>
                ) : null}
                {/*A div containing input field and a button to edit a comment, and is shown when user clicks the Update button*/}
                <div
                  id={"commentDiv" + anotherItem.id}
                  style={{ display: "none" }}
                  className={"editCommentsInputFieldWrapper"}
                >
                  {/*Changes the value of editCommentValue to the value entered in the input field*/}
                  <input
                    onInput={(e) => setEditCommentValue(e.target.value)}
                    className={"editCommentsInputField"}
                  ></input>

                  {/*Edit comment*/}
                  <button
                    onClick={() =>
                      editComment(anotherItem.id, anotherItem.quoteId)
                    }
                    className={"linkButton"}
                  >
                    Edit
                  </button>
                </div>
                {/*Displays a message if the user edits the comment with an empty value, or if they've sucessfully edited the comment*/}
                <p
                  className={"errorText"}
                  id={"errorEditComment" + anotherItem.id}
                ></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
