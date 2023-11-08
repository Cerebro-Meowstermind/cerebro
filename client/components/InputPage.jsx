import React from "react";
import { useState } from "react";

const InputPage = ({onCreate, title, titleChangeHandler, topic, topicChangeHandler}) => {

  return (
    <>
      <h1>CREATE NEW STUDY SESSION</h1>
      <form onSubmit={onCreate}>
        <div>
          <label>
            TITLE
            <input
              type="text"
              name="name"
              placeholder="What would you like to name this session?"
              style={{width: '400px'}}
              value={title}
              onChange={titleChangeHandler}
            />
          </label>
        </div>
        <div>
          <label>
            TOPIC
            <input
              type="text"
              name="topic"
              placeholder="What topic would you like to study?"
              style={{width: '400px'}}
              value={topic}
              onChange={topicChangeHandler}
            />
          </label>
        </div>
        <div>
          <label>
            MAIN POINTS
            <input
              type="text"
              name="main_points"
              placeholder="What are the main areas you'd like to cover?"
              style={{width: '400px'}}
            />
          </label>
        </div>
        <div>
          <label>
            PAIN POINTS
            <input
              type="text"
              name="pain_points"
              placeholder="What areas do you need help with?"
              style={{width: '400px'}}
            />
          </label>
        </div>
        <div>
          <textarea placeholder="Copy + Paste Your Notes Here" style={{ width: '500px', height: "400px" }}></textarea>
          <button type="submit">Create Session</button>
        </div>
      </form>
    </>
  );
};

export default InputPage;
