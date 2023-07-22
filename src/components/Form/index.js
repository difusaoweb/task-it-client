import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus} from 'react-icons/fa';

import './Form.css';

export default function Form({ HandleChange, handleSubmit, novaTarefa}) {
  return (
    <form onSubmit={handleSubmit} action="#" className="form">
      <input
      onChange={HandleChange}
      type="text"
      value={novaTarefa}
    />
    <button type="submit">
      <FaPlus />
    </button>
  </form>

  );
}

Form.propTypes = {
  HandleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  novaTarefa: PropTypes.string.isRequired,

}
