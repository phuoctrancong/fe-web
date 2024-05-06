// @ts-nocheck
import * as moment from "moment";
import { isEqual, isNil } from "lodash";

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
export const SortKey = {
  PRICE_MAX: "orderPriceMax",
  PRICE_MIN: "orderPriceMin",
  CODE: "code",
  NAME: "name",
  CREATED_AT: "createdAt",
};
export const SORTS = [
  { label: "Mới nhất", value: `${SortKey.CREATED_AT}` },
  { label: "Giá: Từ thấp đến cao", value: `${SortKey.PRICE_MIN}` },
  { label: "Giá: Từ cao đến thấp", value: `${SortKey.PRICE_MAX}` },
];
export const STATUS_ORDER = [
  {
    id: 1,
    text: "Chờ xác nhận",
    color: "orange",
  },
  {
    id: 2,
    text: "Đã xác nhận",
    color: "green",
  },
  {
    id: 3,
    text: "Đang giao hàng",
    color: "yellow",
  },
  {
    id: 4,
    text: "Đã nhận hàng",
    color: "green",
  },
  {
    id: 5,
    text: "Hoàn thành",
    color: "green",
  },
  {
    id: 6,
    text: "Từ chối",
    color: "red",
  },
];
export const transformObjectToFilter = (obj) => {
  const filter = [];
  for (const key in obj) {
    filter.push({
      column: key,
      text: Array.isArray(obj[key])
        ? obj[key].join(",")
        : obj[key]?.toString() || obj[key],
    });
  }
  return JSON.stringify(filter);
};

export const transformObjectToSort = (obj, order) => {
  const sort = [];
  for (const key in obj) {
    sort.push({
      column: key,
      order: `${order}`,
    });
  }

  return JSON.stringify(sort);
};
export const convertFilterParams = (filters = {}, columns = []) => {
  const filterData = Object.keys(filters).reduce((acc, cur) => {
    if (
      isNil(filters[cur]) ||
      filters[cur] === "" ||
      isEqual(filters[cur], []) ||
      isEqual(filters[cur], {})
    ) {
      return acc;
    }

    // if (
    //   columns.find((col) => col.field === cur && col.filterFormat === 'date')
    // ) {
    //   let day1 = filters[cur]?.[0]
    //   let day2 = filters[cur]?.[1]

    //   if (!day1 && !day2) {
    //     return acc
    //   }

    //   day1 = day1 || day2
    //   day2 = day2 || day1

    //   const startOfDay1 = startOfDay(new Date(day1))
    //   const endOfDay2 = endOfDay(new Date(day2))
    //   return [
    //     ...acc,
    //     {
    //       column: cur,
    //       text: `${startOfDay1?.toISOString()}|${endOfDay2?.toISOString()}`,
    //     },
    //   ]
    // }
    if (
      columns.find((col) => col.field === cur && col.filterFormat === "price")
    ) {
      let price1 = filters[cur]?.[0];
      let price2 = filters[cur]?.[1];

      if (!price1 && !price2) {
        return acc;
      }

      price1 = price1 || price2;
      price2 = price2 || price1;

      return [
        ...acc,
        {
          column: cur,
          text: `${price1}|${price2}`,
        },
      ];
    }
    if (
      columns.find(
        (col) => col.field === cur && col.filterFormat === "multiple"
      )
    ) {
      return [
        ...acc,
        {
          column: cur,
          text: (filters[cur] || []).toString(),
        },
      ];
    }

    return [
      ...acc,
      {
        column: cur,
        text: filters[cur].toString(),
      },
    ];
  }, []);

  return JSON.stringify(filterData);
};
export const convertSortParams = (sort) => {
  console.log("🚀 ~ convertSortParams ~ sort:", sort);
  const sortData =
    sort && sort?.orderBy && sort?.order
      ? [
          {
            column: sort?.orderBy,
            order: sort?.order?.toUpperCase(),
          },
        ]
      : [];

  return JSON.stringify(sortData);
};
export const ROWS_PER_PAGE_OPTIONS = [20, 50, 100];
