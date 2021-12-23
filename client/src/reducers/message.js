/////////////////////////////////////////////////////////////////////////////////////TYPES
import { GET_MESSAGES, CLEAR_MESSAGES } from '../actions/types/types';
/////////////////////////////////////////////////////////////////////MESSAGE DEFAULT STATE
const errorDefault = {
  message: {},
  status: null,
  id: null,
};
///////////////////////////////////////////////////////////////////////////MESSAGE REDUCER
const messages = (state = errorDefault, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_MESSAGES:
      return {
        message: {},
        status: null,
        id: null,
      };

    default:
      return state;
  }
};

export default messages;
