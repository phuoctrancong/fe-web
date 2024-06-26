import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, ROOT_URL } from "constant/config";
import {
  changeQuantityItemInLocal,
  deleteItemInLocal,
  onChangeQuantityItemInLocal,
} from "common/local-storage";
import { formatMoney } from "common/common";
import { Popconfirm } from "antd";
import { DeleteOutlined } from "@material-ui/icons";
import emitter from "utils/eventEmitter";
const CartItem = ({
  changeCart,
  setChangeCart,
  product,
  setIsDelete,
  isDelete,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(
    product.item.currentQuantity
  );
  useEffect(() => {
    setCurrentQuantity(product.item.currentQuantity);
  }, [product?.item.currentQuantity]);
  const handleChangeQuantity = (id, mode) => {
    changeQuantityItemInLocal(id, mode);
    setChangeCart(!changeCart);
    setIsDelete(!isDelete);
  };
  return (
    <div className="cart__item">
      <div className="cart__item__image">
        <img
          src={`${BASE_URL}/${product?.product?.productImages[0]?.id}`}
          alt=""
        />
      </div>
      <div className="cart__item__info">
        <div className="cart__item__info__name">
          <Link to={`/catalog/${product?.product?.id}`}>
            {`${product?.product?.name} - ${product.item.color?.name} - ${product.item?.size?.name}`}
          </Link>
        </div>
        <div className="cart__item__info__price">
          {product?.product?.salePrice
            ? formatMoney(product?.product?.salePrice)
            : formatMoney(product?.product?.price)}{" "}
          Đ
        </div>
        <div className="cart__item__info__quantity">
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => handleChangeQuantity(product.item.id, "minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <input
              value={currentQuantity}
              className="product__info__item__quantity__input"
              type="number"
              onChange={(e) => {
                setCurrentQuantity(e.target.value);
              }}
              onBlur={() => {
                const [status, check] = onChangeQuantityItemInLocal(
                  product?.item.id,
                  currentQuantity
                );
                if (status) setCurrentQuantity(currentQuantity);
                else {
                  if (check === 1) {
                    setCurrentQuantity(product?.item.quantity);
                    setChangeCart(!changeCart);
                    onChangeQuantityItemInLocal(
                      product?.item.id,
                      product?.item.quantity
                    );
                  } else {
                    setCurrentQuantity(1);
                    onChangeQuantityItemInLocal(product?.item.id, 1);
                  }
                }
                setIsDelete(!isDelete);
              }}
            />
            <div
              className="product__info__item__quantity__btn"
              onClick={() => handleChangeQuantity(product?.item.id, "plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="cart__item__info__del">
          <Popconfirm
            title="Bạn có muốn xoá sản phẩm này không?"
            onConfirm={() => {
              deleteItemInLocal(product.item.id);
              setIsDelete(!isDelete);
            }}
            okText="Có"
            cancelText="Không"
          >
            <DeleteOutlined
              className="cart__item__info__del__icon"
              width={"2em"}
              style={{
                cursor: "pointer",
                paddingRight: 10,
              }}
            />
          </Popconfirm>
          {/* <i
						className='bx bx-trash'
						onClick={() => {
							deleteItemInLocal(product.item.id);
							setIsDelete(!isDelete);
						}}
					></i> */}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
