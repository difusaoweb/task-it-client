import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus} from 'react-icons/fa';

 import './Form.css';

interface FormPropTypes {
    handleSubmit: (e: any) => void;
    handleChange: (e: any) => void;
    novaTarefa: string;
}
 export const Form = ({ handleChange, handleSubmit, novaTarefa}:FormPropTypes) => {
  return (
    <form onSubmit={handleSubmit} action="#" className="form">
      <input
      onChange={(e) => handleChange(e.target.value)}
      type="text"
      value={novaTarefa}
    />
    <button type="submit">
      <FaPlus />
    </button>
  </form>

  );
}

