import React from 'react';
import HeaderMenu from './HeaderMenu.jsx';
import FooterMenu from './FooterMenu.jsx';
import { useState, useEffect } from 'react';

function CreateFlashCards({ username }) {
  const [flashCards, setFlashCards] = useState([
    { question: 'what day is it', answer: 'sunday' },
    { question: 'what time is it', answer: 'i have no idea' },
    { question: 'whats is your favorite food', answer: 'sushi' },
    { question: 'what is food', answer: 'ok' },
    { question: 'what is your food', answer: 'something' },
    { question: 'why is your food', answer: 'because' },
    { question: 'how is your food', answer: 'tasty' },
  ]);
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  //save flashcards to staet an array [{question: 'OKAY', answer: 'TEST}]
  //loop over the flash cards render each one
  //maybe have  pass button that will keep it in the array
  //then maybe have a next button that goes to next object in the array
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

  const { question, answer } = flashCards[index];

  return (
    <div className="createFlashCards">
      <HeaderMenu username={username} />
      <section className="createFlashCardsPage">
        <h1>FLASHCARDS</h1>
        <div className="cards">
          <div className="cardNumber">{index}</div>
          {!show && (
            <div className="cardText">QUESTION: {question.toUpperCase()}?</div>
          )}

          {show && <div className="showAnswer">{answer.toUpperCase()}</div>}
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
      </section>
      <FooterMenu />
    </div>
  );
}

export default CreateFlashCards;
