import { Skeleton, Space, Spin } from "antd";
import Helmet from "components/Helmet";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { detailUserAction } from "redux/actions/auth.actions";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutInfo from "./CheckoutInfo";
import CheckoutMethod from "./CheckoutMethod";
import { ArrayMethodPayment } from "./checkkout-constants";
import CheckoutResult from "./CheckoutResult";

const CheckoutRoot = () => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState();
  const [addressUser, setAddressUser] = useState();
  const [methods, setMethods] = useState();
  const [itemCarts, setItemCarts] = useState();
  const [isLoading, setIsLoading] = useState();
  const [id, setId] = useState();
  const authState = useSelector((state) => {
    return state.auth;
  });
  useEffect(() => {
    setTimeout(() => {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
      setItemCarts(JSON.parse(localStorage.getItem("cart")));
      setMethods(ArrayMethodPayment);
      setId(currentUser?.id);
      setIsLoading(false);
    }, 900);
  }, [currentUser?.id]);
  useEffect(() => {
    if (id) {
      dispatch(detailUserAction(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    const addressDefault = authState?.item?.addresses.find(
      (e) => e.isDefault === true
    );
    if (addressDefault) {
      setAddressUser(addressDefault);
    }
  }, [addressUser, authState?.item?.addresses]);

  if (isLoading) {
    return (
      <div>
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }
  return (
    <Helmet title="Thanh toán">
      <div className="checkout grid">
        <div className="row wide">
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            {!isLoading ? (
              <>
                <CheckoutInfo
                  address={addressUser}
                  itemCarts={itemCarts}
                  methods={methods}
                />
              </>
            ) : (
              <Skeleton active />
            )}
          </Space>
        </div>
      </div>
    </Helmet>
  );
};

export default CheckoutRoot;
