import React from "react";

const Message = ({ message, color }) => {
  return <div style={{color: color}} className="messageDiv">{message}</div>;
} 

export default Message;
