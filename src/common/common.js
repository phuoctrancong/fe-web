import * as moment from "moment";

export const formatTime = (time) => moment(time).format("DD/MM/YYYY HH:mm");

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export const formatMoney = (input = 0) =>
  input?.toLocaleString("it-IT", {
    style: "currency",
    currency: "Vnd",
  });
export const TAG = {
  HOT: "hot",
  POPULAR: "popular",
  NEW: "new",
};
export const FILTER_PRICE = [
  {
    label: "Nhỏ hơn 100.00đ",
    value: 100000,
    maxPrice: 100000,
  },
  {
    label: "Từ 100.000đ - 200.000đ",
    minPrice: 100000,
    maxPrice: 200000,
  },
  {
    label: "Từ 200.000đ - 350.000đ",
    maxPrice: 350000,
    minPrice: 200000,
    value: 350000,
  },
  {
    label: "Từ 350.000đ - 500.000đ",
    maxPrice: 500000,
    minPrice: 350000,
    value: 499999,
  },
  {
    label: "Từ 500.000đ - 700.000đ",
    maxPrice: 700000,
    minPrice: 500000,
    value: 699999,
  },
  {
    label: "Lớn hơn 700.000đ",
    value: 700000,
    maxPrice: 700000,
  },
];
export const STATUS_ORDER = [
  {
    id: 1,
    text: "Chở xác nhận",
    color: "orange",
  },
];
