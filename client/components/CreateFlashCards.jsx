import React from 'react';
import HeaderMenu from './HeaderMenu.jsx';
import FooterMenu from './FooterMenu.jsx';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function CreateFlashCards({ username }) {
  const [flashCards, setFlashCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(25 * 60);
  const [timer, setTimer] = useState(null);
  const [breakTimer, setBreakTimer] = useState(null);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  console.log(data);

  useEffect(() => {
    submitNotes(data);
  }, []);

  function submitNotes(notes) {
    setIsLoading(true);

    fetch('/flashcards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notes: notes }),
    })
      .then(response => response.json())
      .then(data => {
        //navigate('/studysession', { state: notesData });
        console.log('DATA', data.data);
        setFlashCards(data.data);
        setIsLoading(false);
        if (data.success) {
          // navigate('/studysession', { state: sessionData });
        } else {
          console.log('ERROR', data.message);
        }
      })
      .catch(err => {
        console.log('ERROR CREATING SESSION');
      });
  }

  const startClick = () => {
    const timer = setInterval(() => {
      setSeconds(seconds => seconds - 1);
      if (seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);
    setTimer(timer);
  };

  const breakClick = () => {
    const breakTimer = setInterval(() => {
      setBreakTime(breakTime => breakTime - 1);
      if (breakTime === 0) {
        clearInterval(breakTimer);
      }
    }, 1000);
    setBreakTimer(breakTimer);
  };

  const resetClick = () => {
    setBreakTime(5 * 60);
    clearInterval(breakTimer);
  };

  const pomodoroClick = () => {
    setSeconds(25 * 60);
    clearInterval(timer);
  };

  useEffect(() => {
    if (breakTime === 0) {
      clearInterval(breakTimer);
    }
  }, [breakTime, breakTimer]);

  useEffect(() => {
    return () => clearInterval(breakTimer);
  }, [breakTimer]);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(timer);
    }
  }, [seconds, timer]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${minutes}:${remaining < 10 ? '0' : ''}${remaining}`;
  }

  const simpleShuffle = array => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setFlashCards(currentFlashCards => simpleShuffle([...currentFlashCards]));
  }, []);

  const passHandleClick = () => {
    setShow(bool => (bool === true ? false : false));
    setScore(score => (score -= 1));
    setIndex(index => {
      // When index is 0, set to the last index. Otherwise, decrement.
      console.log(index);
      const nextIndex = index === flashCards.length - 1 ? 0 : index + 1;
      return nextIndex;
    });
  };

  const nextHandleClick = () => {
    setShow(bool => (bool === true ? false : false));
    setScore(score => (score += 1));
    //if you press next, delete that object out of the array (in progress...)
    setIndex(index => {
      //same logic
      console.log(index);
      const nextIndex = index === flashCards.length - 1 ? 0 : index + 1;
      return nextIndex;
    });
  };

  const showAnswerClick = () => {
    console.log(show);
    setShow(bool => !bool);
  };

  let term = '';
  let definition = '';

  if (flashCards.length !== 0) {
    // Assign values from the current flashcard
    term = flashCards[index].term;
    definition = flashCards[index].definition;
  }

  return (
    <>
      {isLoading === true ? (
        <div className="loader-container-2">
          <div className="loader-2"></div>
        </div>
      ) : (
        <>
          {' '}
          <div className="createFlashCards">
            <HeaderMenu username={username} />
            <section className="createFlashCardsPage">
              <h1 id="flashTitle">FLASHCARDS</h1>
              <div className="cards">
                <div className="cardNumber">{index}</div>
                {!show && (
                  <div className="cardText">
                    QUESTION: {definition.toUpperCase()}
                  </div>
                )}

                {show && <div className="showAnswer">{term.toUpperCase()}</div>}
                <div className="buttonContainer">
                  <button id="pass" onClick={passHandleClick}>
                    PASS
                  </button>
                  <button id="answer" onClick={showAnswerClick}>
                    SHOW ANSWER
                  </button>
                  <button id="next" onClick={nextHandleClick}>
                    NEXT
                  </button>
                </div>
              </div>
              <div className="score">BRAIN CELLS: {score} </div>

              <div className="sessionBox">
                <div>TIMER: {formatTime(seconds)} </div>
                <button id="answer" onClick={startClick}>
                  START
                </button>
                <button id="answer" onClick={pomodoroClick}>
                  RESET
                </button>
              </div>
              <div className="breakBox">
                <div>BREAK: {formatTime(breakTime)} </div>
                <button id="answer" onClick={breakClick}>
                  START
                </button>
                <button id="answer" onClick={resetClick}>
                  RESET
                </button>
              </div>
            </section>
            <FooterMenu />
          </div>
        </>
      )}
    </>
  );
}

export default CreateFlashCards;
