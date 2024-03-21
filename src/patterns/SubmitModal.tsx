// Modal.js
import React from "react";
import Icon from "../icons";

const Modal = ({ isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white justify-center font-bold text-xl text-black p-6 rounded-md relative">
        <div className="items-center justify-center mb-4">
          {/* Add classes to center the icon */}
          <div className="text-[#018273] pl-20 pb-5 mr-2">
            <Icon name="tick" height={55} width={55} />
          </div>
          <h2>Submitted Successfully !</h2>
        </div>

        <button
          className="absolute top-2 right-2 text-black hover:text-gray-500"
          onClick={onClose}
        >
          <Icon name="closeIcon" height={16} width={16} />
        </button>
      </div>
    </div>
  );
};

export default Modal;
