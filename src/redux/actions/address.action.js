import { notification } from "antd";
import {
  create,
  detail,
  listAddress,
  setDefaultAddress,
  update,
} from "service/address.service";
import * as types from "../constants";
import { toast } from "react-toastify";
export const listAddresses = (query) => {
  return async (dispatch) => {
    try {
      const response = await listAddress(query);
      dispatch({
        type: types.GET_LIST_ADDRESS,
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

export const createAddress = (data, cb) => {
  return async (dispatch) => {
    try {
      const response = await create(data);
      if (response.statusCode !== 200) {
        toast.error("");
      } else {
        toast.success(response?.message);
      }
    } catch (error) {
      console.log(error?.message || error);
      toast.success(error?.message || error);
      toast.success(error?.message || error);
    }
  };
};

export const updateAddress = (id, data, cb) => {
  return async (dispatch) => {
    try {
      const response = await update(id, data);

      if (response.statusCode !== 200) {
        toast.error(response?.message);
      } else {
        toast.success(response?.message);
        cb();
      }
    } catch (error) {
      console.log(error?.message || error);
      toast.error(error?.message || error);
    }
  };
};

export const setDefault = (id, onSuccess) => {
  return async (dispatch) => {
    const response = await setDefaultAddress(id);
    if (response.statusCode !== 200) {
      notification.error({
        message: response.message,
        description: response.message,
      });
    } else {
      dispatch({
        type: types.SET_DEFAULT_ADDRESS,
      });
      toast.success(response?.message);
      onSuccess();
    }
  };
};

export const detailAddress = (id) => {
  return async (dispatch) => {
    try {
      const response = await detail(id);
      dispatch({
        type: types.DETAIL_ADDRESS,
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
