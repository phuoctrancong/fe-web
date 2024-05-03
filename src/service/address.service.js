import { APIEnum } from "constant/api.endpoint";
import { stringify } from "query-string";
import axios from "../common/axios";

export const listAddress = (query) =>
  axios.get(`${APIEnum.ADDRESS}?${stringify(query)}`);
export const create = (data) => axios.post(`${APIEnum.ADDRESS}/create`, data);
export const update = (id, data) => axios.put(`${APIEnum.ADDRESS}/${id}`, data);
export const setDefaultAddress = (id) =>
  axios.put(`${APIEnum.ADDRESS}/set-default/${id}`);
export const detail = (id) => axios.get(`${APIEnum.ADDRESS}/${id}`);
