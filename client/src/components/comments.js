import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../utils/commentAPI";
import { formatRelative } from "date-fns";
import "./edBrowseEtc.css";

// component to display comments
const Comments = (props) => {
  console.log("props for Comments", props.lesson);
  // setting state for comments

  const [input, setInput] = useState("");

  function handleCommentSubmit(event) {
    event.preventDefault();
    if (!input) return;
    console.log(props.lessonID);

    API.saveComments(input, props.lessonID).then((response) => {
      console.log(response);
      props.viewDetails(props.lessonID);
      setInput("");
    });
  }

  // will display the comments
  return (
    <div>
      <ol>
        {props.lesson.commentArray?.map((comment) => (
          <li>
            <p>Review: {comment.message}</p>
            <p>User: {comment.userName}</p>
            <p>
              {comment.date &&
                formatRelative(new Date(comment.date), new Date())}
            </p>
          </li>
        ))}
      </ol>

      <form onSubmit={handleCommentSubmit}>
        <label>
          <textarea
            placeholder="Thank you for reviewing this lesson. Please make this box as large as you like."
            className="commentBox"
            type="text"
            name="textbox"
            row="10"
            cols="75"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Comments;
