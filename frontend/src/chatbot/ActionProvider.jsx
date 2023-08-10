import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello! Welcome to our shoe shop. How can I assist you today?');
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleShoesInquiry = () => {
    const botMessage = createChatBotMessage('We have a wide variety of shoes available. Would you like to know about our latest collection or sales?');
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleDefault = () => {
    const botMessage = createChatBotMessage('I\'m sorry, I didn\'t understand that. Can you please rephrase or ask something else?');
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleShoesInquiry,
            handleDefault,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
