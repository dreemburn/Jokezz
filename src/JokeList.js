import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

function JokeList({ numJokesToGet = 5 }) {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function getJokes() {
      let j = [];
      let seenJokes = new Set();
      try {
        while (j.length < numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let { joke, id } = res.data;

          if (!seenJokes.has(id)) {
            seenJokes.add(id);
            j.push({ joke, id, votes: 0 });
          } else {
            console.error("duplicate found!");
          }
        }
        setJokes(j);
        setIsLoading(false)
      } catch (err) {
        console.error(err);
        setError('Error getting joke');
        setIsLoading(false);
      }
    }

    if (jokes.length === 0) getJokes();
  }, [jokes, numJokesToGet]);

  /* empty joke list and then call getJokes */

  function generateNewJokes() {
    setJokes([]);
    setIsLoading(true);
    setError(null);
  }

  /* change vote for this id by delta (+1 or -1) */

  function vote(id, delta) {
    setJokes((allJokes) =>
      allJokes.map((j) => 
      j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    );
  }

  /* render: loading spinner or list of sorted jokes. */

  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
      )
  }

  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  return (
    <div className="JokeList">
    {error && <div className="error">{error}</div>}
      <button className="JokeList-getmore" onClick={generateNewJokes}>
        Get New Jokes
        </button>

      {sortedJokes.map(({joke, id, votes}) => (
        <Joke text={joke} key={id} id={id} votes={votes} vote={vote} />
      ))}
    </div>
  );
}

export default JokeList;
