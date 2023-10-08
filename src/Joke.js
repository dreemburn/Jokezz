import React from "react";
import "./Joke.css";

function Joke(props) {
    const { vote, votes, text, id } = props;
    function upVote() {
        vote(id, +1);
    }
    function downVote() {
        vote(id, -1); 
    }

    return (
        <div className="Joke">
          <div className="Joke-votearea">
            <button onClick={upVote}>
                <i className="fas fa-thumbs-up" />
            </button>

            <button onClick={downVote}>
                <i className="fas fa-thumbs-down" />
            </button>

            {votes}
        </div>

        <div className="Joke-text">{text}</div>
        </div>  
    );
}
export default Joke;
