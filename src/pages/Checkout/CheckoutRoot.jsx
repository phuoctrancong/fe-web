// @ts-nocheck

import { Skeleton, Space } from "antd";
import Helmet from "components/Helmet";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { detailUserAction } from "redux/actions/auth.actions";
import CheckoutInfo from "./CheckoutInfo";
import { ArrayMethodPayment } from "./checkkout-constants";

const CheckoutRoot = () => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState();
  const [addressUser, setAddressUser] = useState();
  const [methods, setMethods] = useState();
  const [itemCarts, setItemCarts] = useState();
  const [isLoading, setIsLoading] = useState();
  const [id, setId] = useState();
  const stateAddress = useSelector((state) => {
    return state.address;
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
    const addressDefault = stateAddress?.items?.find(
      (e) => e.isDefault === true
    );
    if (addressDefault) {
      setAddressUser(addressDefault);
    }
  }, [addressUser, stateAddress?.items]);

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
