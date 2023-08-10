import { notification } from "antd";
import * as types from "../constants";
import { detailProduct, list } from "service/product.service";
export const listProduct = (query) => {
  console.log("🚀 ~ file: product.actions.js:5 ~ listProduct ~ query:", query);
  return async (dispatch) => {
    try {
      const response = await list(query);
      dispatch({
        type: types.LIST_PRODUCT,
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
export const detail = (id, onSuccess) => {
  return async (dispatch) => {
    try {
      const response = await detailProduct(id);
      console.log("response", response);
      dispatch({
        type: types.DETAIL_PRODUCT,
        data: response.data,
      });
      onSuccess();
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};
