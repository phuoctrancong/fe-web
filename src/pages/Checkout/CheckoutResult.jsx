import { Card, Divider } from "antd";
import React from "react";

const CheckoutResult = () => {
  return (
    <div>
      <Card
        style={{ marginBottom: "24px" }}
        title={<h2>Địa chỉ giao hàng</h2>}
      ></Card>
      <Divider />
    </div>
  );
};

export default CheckoutResult;
