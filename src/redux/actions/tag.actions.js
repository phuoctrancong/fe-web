import { notification } from "antd";
import * as types from "../constants";
import { detail, list } from "../../service/tag.service";

export const listTag = (query) => {
  return async (dispatch) => {
    try {
      const response = await list(query);
      dispatch({
        type: types.LIST_TAG,
        data: response.data,
      });
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const detailTag = (id) => {
  return async (dispatch) => {
    try {
      const response = await detail(id);
      dispatch({
        type: types.DETAIL_TAG,
        data: response.data,
      });
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};
