import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Row,
  Table,
  Tabs,
  Tooltip,
} from "antd";
import { formatMoney } from "common/common";
import ResultSuccess from "components/ResultSuccess";
import { ROOT_URL } from "constant/config";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { MethodPayment } from "./checkkout-constants";
import "./result-success.css";
const { TabPane } = Tabs;
const CheckoutInfo = (props) => {
  const { itemCarts, methods, address } = props;
  const [tab, setTab] = useState();

  const [total, setTotal] = useState();
  const [openModal, setOpenModal] = useState(false);
  const carts = useMemo(() => {
    if (!isEmpty(itemCarts?.carts)) {
      const newCarts = itemCarts.carts.map((e) => {
        const price =
          e.product.salePrice > 0 ? e.product.salePrice : e.product.price;
        return {
          item: {
            ...e.item,
            total: e.item.currentQuantity * price,
          },
          product: {
            ...e.product,
          },
        };
      });
      return newCarts;
    }
    return [];
  }, [itemCarts?.carts]);
  const totalSum = useMemo(() => {
    if (!isEmpty(carts)) {
      return carts.reduce((sum, item) => sum + item.item.total, 0);
    }
    return 0;
  }, [carts]);

  useEffect(() => {
    setTotal(totalSum);
  }, [totalSum]);
  const columns = [
    {
      title: "Ảnh sản phẩm",
      dataIndex: "product",
      render: (record) => (
        <img
          width={100}
          src={`${ROOT_URL}/${record?.productImages[0]?.url}`}
          alt=""
        />
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: ["product", "name"],
    },
    {
      title: "Đơn giá",
      dataIndex: "product",
      render: (record) =>
        record?.salePrice
          ? formatMoney(record?.salePrice)
          : formatMoney(record?.price),
    },
    {
      title: "Số lượng",
      dataIndex: ["item", "currentQuantity"],
    },
    {
      title: "Thành tiền",
      dataIndex: "item",
      render: (record) => formatMoney(record?.total),
    },
  ];
  const changeTab = (activeKey) => {
    const { value, checked } = activeKey.target;
    setTab(checked ? value : "");
  };
  const handleCheckout = () => {
    const param = {
      shippingAddressId: address.id,
      paymentMethod: parseInt(tab),
      products: carts?.map((e) => ({
        productVersionId: e.item?.id,
        productId: e.product?.id,
        quantity: e.item?.currentQuantity,
      })),
    };
    // setOpenModal(true);
  };

  return (
    <>
      {!openModal ? (
        <>
          <Card
            style={{ marginBottom: "24px", alignContent: "center" }}
            title={<h3>Địa chỉ giao hàng</h3>}
          >
            <h3>
              {address?.fullName} || {address?.phone}
            </h3>
            <p>{address?.addressLine}</p>
            <Tooltip placement="top" title={"Thay đổi địa chỉ"}>
              <Button>
                <SettingOutlined key="setting" />
              </Button>
            </Tooltip>
          </Card>
          <Divider />
          <Table columns={columns} dataSource={carts} pagination={false} />
          <Tabs defaultActiveKey="2">
            {methods?.map((e) => {
              return (
                <TabPane tab={e.label} key={e.key}>
                  {e.methodCode === MethodPayment.CARD ? (
                    <>
                      <Card
                        style={{ marginBottom: "24px", alignContent: "center" }}
                      >
                        <Checkbox
                          value={e.methodCode}
                          checked={tab === e.methodCode}
                          onChange={changeTab}
                        >
                          {<h3>{e.label}</h3>}
                        </Checkbox>
                        <p> {e.children}</p>
                      </Card>
                    </>
                  ) : (
                    <>
                      <Card
                        style={{ marginBottom: "24px", alignContent: "center" }}
                      >
                        <Checkbox
                          value={e.methodCode}
                          checked={tab === e.methodCode}
                          onChange={changeTab}
                        >
                          {<h3>{e.label}</h3>}
                        </Checkbox>
                        <p> {e.children}</p>
                      </Card>
                    </>
                  )}
                </TabPane>
              );
            })}
          </Tabs>

          <Divider />
          <Divider />
          <Row gutter={[16, 16]}>
            <Col span={16} offset={16}>
              <Card bordered={false}>
                <Row gutter={1} style={{ alignItems: "center" }}>
                  <Col span={6}>
                    <h3>Phương thức thanh toán:</h3>
                  </Col>
                  <Col span={8}>
                    {tab === MethodPayment.CARD ? (
                      <Button disabled>Thanh toán bằng thẻ tín dụng</Button>
                    ) : (
                      <Button disabled>Thanh toán khi nhận hàng</Button>
                    )}
                  </Col>
                </Row>
                <Row
                  gutter={[4, 4]}
                  style={{ alignItems: "center", marginTop: "20px" }}
                >
                  <Col span={6}>
                    <h3>Tổng tiền hàng:</h3>
                  </Col>
                  <Col span={8}>{formatMoney(total)}</Col>
                </Row>
                <Row
                  gutter={[4, 4]}
                  style={{ alignItems: "center", marginTop: "20px" }}
                >
                  <Col span={6}>
                    <h3>Phí vận chuyển:</h3>
                  </Col>
                  <Col span={8}></Col>
                </Row>
                <Row
                  gutter={[4, 4]}
                  style={{ alignItems: "center", marginTop: "20px" }}
                >
                  <Col span={6}>
                    <h3>Tổng tiền thanh toán:</h3>
                  </Col>
                  <Col span={8}>{formatMoney(total)}</Col>
                </Row>
                <Row gutter={[4, 4]}>
                  <Col span={8} offset={4}>
                    <Button
                      size="large"
                      type="primary"
                      style={{ width: "100%", marginTop: "25px" }}
                      onClick={handleCheckout}
                    >
                      Đặt hàng
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <ResultSuccess />
      )}
    </>
  );
};

export default CheckoutInfo;
