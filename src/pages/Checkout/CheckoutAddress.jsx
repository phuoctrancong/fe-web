import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Divider } from "antd";
import React from "react";
const CheckoutAddress = (props) => {
  const { address } = props;
  return (
    <div>
      <Card
        style={{ marginBottom: "24px" }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
        title={<h2>Địa chỉ giao hàng</h2>}
      >
        <h3>
          {address?.fullName} || {address?.phone}
        </h3>
        <p>{address?.addressLine}</p>
      </Card>
      <Divider />
    </div>
  );
};

export default CheckoutAddress;
