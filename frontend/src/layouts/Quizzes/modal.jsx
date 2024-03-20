// Modal.js
import React from 'react';

const Modal = ({ isOpen, closeModal, data }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <button onClick={closeModal}>Close</button>
        {data && data.questions.map(question => (
          <div key={question.QuestionID}>
            <h3>{question.QuestionText}</h3>
            <ul>
              {question.Options.map(option => (
                <li key={option.OptionID}>
                  {option.OptionText} - {option.IsCorrect ? 'Correct' : 'Incorrect'}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modal;
