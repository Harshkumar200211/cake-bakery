import React from 'react';
import '../css/Modal.css';

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        {children}
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
