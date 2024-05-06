import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
};

const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_TAG:
      return {
        ...state,
        items: action.data,
        meta: action.data.meta,
      };
    case types.DETAIL_TAG:
      return {
        ...state,
        item: action.data,
      };
    default:
      return state;
  }
};

export default tagReducer;
