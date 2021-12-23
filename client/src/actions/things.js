///////////////////////////////////////////////////////////////////////////////////MODULES
import axios from 'axios';
/////////////////////////////////////////////////////////////////////////////////////TYPES
import {
  GET_THINGS_REQUEST,
  GET_THINGS_SUCCESS,
  GET_THINGS_FAILURE,
  POST_THING_REQUEST,
  POST_THING_SUCCESS,
  POST_THING_FAILURE,
  PUT_THING_REQUEST,
  PUT_THING_SUCCESS,
  PUT_THING_FAILURE,
  DELETE_THING_REQUEST,
  DELETE_THING_SUCCESS,
  DELETE_THING_FAILURE,
} from './types/types';
///////////////////////////////////////////////////////////////////////////////////ACTIONS
import { returnMessages } from './message';
/////////////////////////////////////////////////////////////////////////////////////UTILS
import errorParser from '../utils/errorParser';
//////////////////////////////////////////////////////////////////////////////////////////

// GET /api/thing
export const getThingsRequest = () => ({
  type: GET_THINGS_REQUEST,
});

export const getThingsSuccess = things => ({
  type: GET_THINGS_SUCCESS,
  things,
});

export const getThingsFailure = errorMessage => ({
  type: GET_THINGS_FAILURE,
  errorMessage,
});

export const getThings = endpoint => async dispatch => {
  dispatch(getThingsRequest()); // Will set loading to true
  dispatch(returnMessages({ text: null, id: null }, null, GET_THINGS_REQUEST));

  try {
    const response = await axios.get(
      endpoint === undefined
        ? `${process.env.REACT_APP_ORIGIN_URL}/api/thing`
        : `${process.env.REACT_APP_ORIGIN_URL}/api/thing${endpoint}`
    );

    dispatch(returnMessages({ text: response.data.message, id: null }, response.status, GET_THINGS_SUCCESS));
    dispatch(getThingsSuccess(response.data));
  } catch (error) {
    dispatch(
      returnMessages(
        { text: errorParser(error), id: null },
        error.response ? error.response.status : 500,
        GET_THINGS_FAILURE
      )
    );
    dispatch(getThingsFailure(error.message));
  }
};

// POST /api/thing
export const postThingRequest = () => ({
  type: POST_THING_REQUEST,
});

export const postThingSuccess = thing => ({
  type: POST_THING_SUCCESS,
  thing,
});

export const postThingFailure = errorMessage => ({
  type: POST_THING_FAILURE,
  errorMessage,
});

export const postThing =
  ({ thingName }) =>
  async dispatch => {
    dispatch(postThingRequest());
    dispatch(returnMessages({ text: null, id: thingName }, null, POST_THING_REQUEST));

    const data = { thingName };
    try {
      const response = await axios.post(`${process.env.REACT_APP_ORIGIN_URL}/api/thing`, data);

      dispatch(returnMessages({ text: response.data.message, id: thingName }, response.status, POST_THING_SUCCESS));
      dispatch(postThingSuccess(response.data.thing));
    } catch (error) {
      dispatch(
        returnMessages(
          { text: errorParser(error), id: thingName },
          error.response ? error.response.status : 500,
          POST_THING_FAILURE
        )
      );
      dispatch(postThingFailure(error.message));
    }
  };

// PUT /api/thing
export const putThingRequest = () => ({
  type: PUT_THING_REQUEST,
});

export const putThingSuccess = thing => ({
  type: PUT_THING_SUCCESS,
  thing,
});

export const putThingFailure = errorMessage => ({
  type: PUT_THING_FAILURE,
  errorMessage,
});

export const putThing =
  ({ thingId }) =>
  async dispatch => {
    dispatch(putThingRequest());
    dispatch(returnMessages({ text: null, id: thingId }, null, PUT_THING_REQUEST));

    try {
      const response = await axios.put(`${process.env.REACT_APP_ORIGIN_URL}/api/thing/${thingId}`, {});

      dispatch(returnMessages({ text: response.data.message, id: thingId }, response.status, PUT_THING_SUCCESS));
      dispatch(putThingSuccess(response.data.thing));
    } catch (error) {
      dispatch(
        returnMessages(
          { text: errorParser(error), id: thingId },
          error.response ? error.response.status : 500,
          PUT_THING_FAILURE
        )
      );
      dispatch(putThingFailure(error.message));
    }
  };

// DELETE /api/thing
export const deleteThingRequest = () => ({
  type: DELETE_THING_REQUEST,
});

export const deleteThingSuccess = thing => ({
  type: DELETE_THING_SUCCESS,
  thing,
});

export const deleteThingFailure = errorMessage => ({
  type: DELETE_THING_FAILURE,
  errorMessage,
});

export const deleteThing = thingId => async dispatch => {
  dispatch(deleteThingRequest());
  dispatch(returnMessages({ text: null, id: thingId }, null, DELETE_THING_REQUEST));

  try {
    const response = await axios.delete(`${process.env.REACT_APP_ORIGIN_URL}/api/thing/${thingId}`);

    dispatch(returnMessages({ text: response.data.message, id: thingId }, response.status, DELETE_THING_SUCCESS));
    dispatch(deleteThingSuccess(response.data.thing));
  } catch (error) {
    dispatch(
      returnMessages(
        { text: errorParser(error), id: thingId },
        error.response ? error.response.status : 500,
        DELETE_THING_FAILURE
      )
    );
    dispatch(deleteThingFailure(error.message));
  }
};
