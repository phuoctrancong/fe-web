// @ts-nocheck
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
// import Button from './Button';
import { listSize } from "redux/actions/size.actions";
import { toast } from "react-toastify";
import { ROOT_URL } from "constant/config";
import { isEmpty } from "lodash";
import { addToLocal, getFromLocal } from "common/local-storage";
import { formatMoney } from "common/common";
import { Button } from "antd";
import emitter from "utils/eventEmitter";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ProductView = (props) => {
  const { product, isLoading, setIsLoading } = props;
  const [previewImg, setPreViewImg] = useState(
    `${ROOT_URL}/${product?.productImages[0]?.url}`
  );
  const [descriptionExpand, setDescriptionExpand] = useState(false);
  const [selectedColor, setSelectedColor] = useState(undefined);
  const [selectedSize, setSelectedSize] = useState(undefined);
  const [quantity, setQuantity] = useState(1);
  const [selectedItem, setSelectedItem] = useState();
  const [filterListSizes, setSizes] = useState([]);
  const [inventory, setInventory] = useState(0);
  const dispatch = useDispatch();
  const sizeList = useSelector((state) => state.size);
  useEffect(() => {
    dispatch(listSize());
  }, [dispatch]);
  const check = () => {
    if (selectedColor === undefined) {
      toast.warning("Vui lòng chọn màu sắc !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
    if (selectedSize === undefined) {
      toast.warning("Vui lòng chọn kích cỡ !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
    return true;
  };
  const handleChangeColor = (item) => {
    setSelectedColor({
      version: item,
      color: item.color,
    });
    const filterSizes = product.productVersions.filter(
      (e) => e.color?.id === item.color?.id
    );
    if (!isEmpty(filterSizes)) {
      setSizes(filterSizes);
    }
  };
  const handleChangeSize = (item) => {
    setSelectedSize({
      version: item,
      size: item.size,
      product: product,
    });
  };
  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };
  useEffect(() => {
    if (selectedSize && selectedColor) {
      const dataVersion = selectedSize?.version;
      const version = {
        ...dataVersion,
        currentQuantity: quantity,
      };
      console.log(
        "🚀 ~ file: ProductView.jsx:78 ~ useEffect ~ version:",
        version
      );
      setInventory(dataVersion?.stockQuantity);
      setSelectedItem({ item: version, product: selectedSize?.product });
    }
  }, [selectedColor, selectedSize, quantity]);

  const handleBuy = () => {
    if (!isEmpty(selectedItem)) {
      console.log(
        "🚀 ~ file: ProductView.jsx:88 ~ handleBuy ~ selectedItem:",
        selectedItem
      );
      addToLocal("cart", selectedItem);
      const carts = getFromLocal("cart");
      emitter.emit("cartQuantityChange", carts);
      toast.success("Thêm vào giỏ hàng thành công");
    } else {
      check();
    }
  };

  const goToCart = () => {
    if (!isEmpty(selectedItem)) {
      addToLocal("cart", selectedItem);
      toast.success("Thêm vào giỏ hàng thành công");
      props.history.push("/cart");
    } else {
      check();
    }
  };
  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() =>
              setPreViewImg(`${ROOT_URL}/${product?.productImages[0]?.url}`)
            }
          >
            <img src={`${ROOT_URL}/${product?.productImages[0]?.url}`} alt="" />
          </div>
          <div
            className="product__images__list__item"
            onClick={() =>
              setPreViewImg(`${ROOT_URL}/${product?.productImages[1]?.url}`)
            }
          >
            <img src={`${ROOT_URL}/${product?.productImages[1]?.url}`} alt="" />
          </div>
          <div
            className="product__images__list__item"
            onClick={() =>
              setPreViewImg(`${ROOT_URL}/${product?.productImages[2]?.url}`)
            }
          >
            <img src={`${ROOT_URL}/${product?.productImages[2]?.url}`} alt="" />
          </div>
        </div>
        <div className="product__images__main">
          <img src={previewImg} alt="" />
        </div>
        <div
          className={`product-description ${descriptionExpand ? "expand" : ""}`}
        >
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="product-description__toggle">
            <Button
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product?.name}</h1>
        <div className="product__info__item">
          {product?.salePrice && product?.price ? (
            <>
              <span className="product__info__item__price">
                {product ? formatMoney(product?.salePrice) : ""}
              </span>
              <span className="product__info__item__price__old">
                <del>{product ? formatMoney(product?.price) : ""}</del>
              </span>
            </>
          ) : (
            <span className="product__info__item__price">
              {product ? formatMoney(product?.price) : ""}
            </span>
          )}
          <div className="product__info__item">
            <div className="product__info__item__title">
              Màu sắc :{selectedColor?.color.name}
            </div>
            <div className="product__info__item__list">
              {product?.productVersionsMap.map((item) => {
                return (
                  <>
                    <Button
                      style={{
                        backgroundColor: item?.color?.name,
                        border:
                          selectedColor?.color?.name === item.color?.name &&
                          selectedColor?.version?.id === item.id
                            ? "2px solid white"
                            : "none",
                      }}
                      type={
                        selectedColor?.color?.name === item.color?.name &&
                        selectedColor?.version?.id === item.id
                          ? "primary"
                          : "danger"
                      }
                      onClick={() => handleChangeColor(item)}
                    >
                      {item?.color?.name}
                    </Button>
                  </>
                );
              })}
            </div>
          </div>
          <div className="product__info__item">
            <div className="product__info__item__title">
              Kích cỡ:
              {selectedSize?.size.name}
            </div>
            <div className="product__info__item__list">
              {!isEmpty(filterListSizes)
                ? filterListSizes?.map((item, index) => {
                    return (
                      <>
                        <Button
                          key={index}
                          style={{
                            border:
                              selectedSize?.size?.name === item.size.name &&
                              selectedSize?.version?.id === item.id
                                ? "2px solid yellow"
                                : "none",
                          }}
                          type={
                            selectedSize?.size.name === item.size.name
                              ? "primary"
                              : "danger"
                          }
                          onClick={() => handleChangeSize(item)}
                        >
                          {item.size.name}
                          {selectedSize?.size.name === item.size?.name &&
                            selectedSize?.version?.id === item.id && (
                              <span>&#10004;</span>
                            )}
                        </Button>
                      </>
                    );
                  })
                : sizeList?.items?.map((item, index) => {
                    return (
                      <>
                        <Button type={"danger"} key={index}>
                          {item?.name}
                        </Button>
                      </>
                    );
                  })}
            </div>
          </div>
          <div className="product__info__item">
            <div className="product__info__item__title">Số lượng</div>
            <div className="product__info__item__quantity">
              <div
                className="product__info__item__quantity__btn"
                onClick={() => updateQuantity("minus")}
              >
                <i className="bx bx-minus"></i>
              </div>
              <div className="product__info__item__quantity__input">
                {quantity}
              </div>
              <div
                className="product__info__item__quantity__btn"
                onClick={() => updateQuantity("plus")}
              >
                <i className="bx bx-plus"></i>
              </div>
            </div>
          </div>
          <div className="product__info__item">
            <div className="product__info__item__title">
              Kho:
              {selectedColor && selectedSize ? inventory : "0"}
            </div>
          </div>
          <div className="product__info__item">
            <Button size="sm" onClick={handleBuy}>
              Thêm vào giỏ
            </Button>
            <Button size="sm" onClick={goToCart}>
              Mua ngay
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`product-description mobile ${
          descriptionExpand ? "expand" : ""
        }`}
      >
        <div className="product-description__title">Chi tiết sản phẩm</div>
        <div
          className="product-description__content"
          dangerouslySetInnerHTML={{ __html: product?.description }}
        ></div>
        <div className="product-description__toggle">
          <Button
            size="sm"
            onClick={() => setDescriptionExpand(!descriptionExpand)}
          >
            {descriptionExpand ? "Thu gọn" : "Xem thêm"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProductView);
