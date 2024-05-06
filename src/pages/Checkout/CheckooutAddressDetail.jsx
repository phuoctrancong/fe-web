import React, { useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import { listAddresses, setDefault } from "redux/actions/address.action";
import { useDispatch } from "react-redux";

const CheckoutAddressDetail = ({ listAddress, onClick }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleSetDefaultAddress = (id) => {
    setLoading(true);
    dispatch(setDefault(id, () => dispatch(listAddresses({ page, isMe: 1 }))));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const columns = [
    {
      title: "Tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "addressLine",
      key: "addressLine",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => {
        const { id, isDefault } = record;
        return (
          <Space size="middle">
            <Button
              loading={isDefault ? false : loading}
              disabled={isDefault ? isDefault : false}
              onClick={() => handleSetDefaultAddress(id)}
            >
              {isDefault ? "Mặc định" : " Cài đặt mặc định"}
            </Button>
          </Space>
        );
      },
    },
  ];
  return <Table columns={columns} dataSource={listAddress} />;
};
export default CheckoutAddressDetail;
