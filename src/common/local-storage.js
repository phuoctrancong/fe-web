import { toast } from "react-toastify";
import emitter from "utils/eventEmitter";
export const addToLocal = (key, value) => {
  const items =
    typeof window !== "undefined"
      ? localStorage.getItem(key)
        ? localStorage.getItem(key)
        : { carts: [] }
      : {
          carts: [],
        };

  if (typeof items !== "string") {
    value.item.currentQuantity = 1;
    items.carts.push(value);
    typeof window !== "undefined" &&
      localStorage.setItem(key, JSON.stringify(items));
  } else {
    const newItems = { ...JSON.parse(items) };
    let check = false;
    newItems.carts.forEach((e) => {
      if (e.item.id === value.item.id) {
        check = true;
        e.item.currentQuantity = e.item.currentQuantity + 1;
      }
    });
    if (!check) {
      value.item.currentQuantity = 1;
      newItems.carts.push(value);
    }
    typeof window !== "undefined" &&
      localStorage.setItem(key, JSON.stringify(newItems));
  }
};

export const getFromLocal = (key) => {
  const items =
    typeof window !== "undefined"
      ? localStorage.getItem(key)
        ? localStorage.getItem(key)
        : { carts: [] }
      : {
          carts: [],
        };

  if (typeof items !== "string") {
    return items.carts;
  } else {
    const newItems = { ...JSON.parse(items) };
    return newItems.carts;
  }
};

export const deleteItemInLocal = (id) => {
  const items = getFromLocal("cart");
  const newItems = items.filter((e) => e.item.id !== id);
  typeof window !== "undefined" &&
    localStorage.setItem(
      "cart",
      JSON.stringify({
        carts: newItems,
      })
    );
};

export const resetItemInLocal = () => {
  typeof window !== "undefined" &&
    localStorage.setItem(
      "cart",
      JSON.stringify({
        carts: [],
      })
    );
};

export const changeQuantityItemInLocal = (id, mode) => {
  const items = getFromLocal("cart");

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.item.id === id) {
      if (mode === "minus") {
        item.item.currentQuantity--;
        emitter.emit(
          "cartQuantityChange",
          item.item.currentQuantity
            ? item.item.currentQuantity
            : item.item.currentQuantity
        );
        if (item.item.currentQuantity === 0) {
          toast.error("Số lượng sản phẩm đã đạt tối thiểu");
          return;
        }
      } else {
        item.item.currentQuantity++;
        emitter.emit(
          "cartQuantityChange",
          item.item.currentQuantity
            ? item.item.currentQuantity
            : item.item.currentQuantity
        );
        if (item?.item.currentQuantity > item?.item.quantity) {
          toast.error("Số lượng sản phẩm đã đạt tối đa");
          return;
        }
      }
    }
  }

  typeof window !== "undefined" &&
    localStorage.setItem(
      "cart",
      JSON.stringify({
        carts: items,
      })
    );
};

export const onChangeQuantityItemInLocal = (id, quantity) => {
  const items = getFromLocal("cart");

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item?.item.id === id) {
      if (quantity > item?.item.quantity) {
        toast.error(
          `Số lượng sản phẩm không hợp lệ, chỉ còn ${item?.item.quantity} sản phẩm`
        );
        return [false, 1];
      } else if (!quantity || +quantity <= 0) {
        toast.error(`Số lượng sản phẩm đã đạt tối thiểu`);
        return [false, 0];
      } else {
        item.item.currentQuantity = quantity;
      }
    }
  }

  typeof window !== "undefined" &&
    localStorage.setItem(
      "cart",
      JSON.stringify({
        carts: items,
      })
    );

  return [true, true];
};
