import * as types from "../constants";
const initialState = {
  items: [],
  meta: {},
  item: {},
};
const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LIST_ADDRESS:
      return {
        ...state,
        items: action?.data,
      };
    case types.CREATE_ADDRESS:
    case types.UPDATE_ADDRESS:
      return state;
    case types.SET_DEFAULT_ADDRESS:
      return {
        ...state,
      };
    case types.DETAIL_ADDRESS:
      return {
        ...state,
        item: action.data,
      };
    default:
      return state;
  }
};
export default addressReducer;
