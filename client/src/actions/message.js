/////////////////////////////////////////////////////////////////////////////////////TYPES
import { GET_MESSAGES, CLEAR_MESSAGES } from './types/types';
//////////////////////////////////////////////////////////////////////////////////////////

export const returnMessages = (message, status, id = null) => ({
  type: GET_MESSAGES,
  payload: { message, status, id },
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
});
