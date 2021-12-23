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
} from '../actions/types/types';
//////////////////////////////////////////////////////////////////////THINGS DEFAULT STATE
const thingsDefaultState = {
  things: [],
  isLoading: false,
};
////////////////////////////////////////////////////////////////////////////THINGS REDUCER
const things = (state = thingsDefaultState, action) => {
  switch (action.type) {
    // GET request
    case GET_THINGS_REQUEST:
      return {
        isLoading: true,
        things: [...state.things],
      };
    case GET_THINGS_SUCCESS:
      return {
        isLoading: false,
        things: [...action.things],
      };
    case GET_THINGS_FAILURE:
      return {
        isLoading: false,
        things: [...state.things],
      };

    // POST request
    case POST_THING_REQUEST:
      return {
        isLoading: true,
        things: [...state.things],
      };
    case POST_THING_SUCCESS:
      return {
        isLoading: false,
        things: [...state.things, action.thing],
      };
    case POST_THING_FAILURE:
      return {
        isLoading: false,
        things: [...state.things],
      };

    // PUT request
    case PUT_THING_REQUEST:
      return {
        isLoading: true,
        things: [...state.things],
      };
    case PUT_THING_SUCCESS:
      return {
        isLoading: false,
        things: state.things.map(thing => {
          if (thing._id === action.thing._id) {
            return {
              ...thing,
              ...action.thing,
            };
          } else {
            return thing;
          }
        }),
      };
    case PUT_THING_FAILURE:
      return {
        isLoading: false,
        things: [...state.things],
      };

    // DELETE request
    case DELETE_THING_REQUEST:
      return {
        isLoading: true,
        things: [...state.things],
      };
    case DELETE_THING_SUCCESS:
      return {
        isLoading: false,
        things: state.things.filter(thing => thing._id !== action.thing._id),
      };
    case DELETE_THING_FAILURE:
      return {
        isLoading: false,
        things: [...state.things],
      };

    default:
      return state;
  }
};

export default things;
