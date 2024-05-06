import { SettingOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Modal,
  Row,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import { formatMoney } from "common/common";
import { getFromLocal } from "common/local-storage";
import { BASE_URL } from "constant/config";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { listAddresses, setDefault } from "redux/actions/address.action";
import { createOrders } from "redux/actions/order.actions";
import emitter from "utils/eventEmitter";
import { MethodPayment } from "./checkkout-constants";
import "./result-success.css";
import Swal from "sweetalert2";
import CheckoutAddressDetail from "./CheckooutAddressDetail";
const { TabPane } = Tabs;
const CheckoutInfo = (props) => {
  const { itemCarts, methods, address } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [tab, setTab] = useState();
  const [total, setTotal] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState(0);
  const stateAddress = useSelector((state) => {
    return state.address;
  });

  useEffect(() => {
    dispatch(listAddresses({ isMe: 1 }));
  }, []);
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
  const handleCancel = () => {
    setVisible(false);
  };
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
          src={`${BASE_URL}/${record?.productImages[0]?.id}`}
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
  const alertSuccess = () => {
    let timerInterval;
    Swal.fire({
      title: "Bạn đã đặt hàng thành công đơn hàng!",
      html: "Thông báo sẽ đóng sau <b></b> milliseconds.",
      timer: 2000,
      icon: "success",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };
  const handleCheckout = () => {
    const params = {
      shippingAddressId: address.id,
      paymentMethod: parseInt(tab),
      products: carts?.map((e) => ({
        productVersionId: e.item?.id,
        productId: e.product?.id,
        quantity: e.item?.currentQuantity,
      })),
    };
    dispatch(
      createOrders(params, () => {
        setStatus(1);
        localStorage.removeItem("cart");
        const cartsNews = getFromLocal("cart");
        emitter.emit("cartQuantityChange", carts);
        emitter.emit("cartQuantityChange", cartsNews);
        alertSuccess();
        // toast.success("Đặt hàng thành công");
        history.push("/");
      })
    );
    // setOpenModal(true);
  };
  const handleSetDefaultAddress = (params) => {
    const { id, page } = params;
    dispatch(setDefault(id, () => dispatch(listAddresses({ page, isMe: 1 }))));
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
              <Button onClick={() => setVisible(true)}>
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
                      <Tag color="#f50">Thanh toán bằng thẻ tín dụng</Tag>
                    ) : (
                      <Tag color="#f50">Thanh toán khi nhận hàng</Tag>
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
        Swal.fire("Good job!", "You clicked the button!", "success")
      )}
      <Modal
        title="Danh sách địa chỉ"
        visible={visible}
        onCancel={handleCancel}
        footer={false}
        width={800}
      >
        <CheckoutAddressDetail
          listAddress={stateAddress?.items || []}
          onClick={handleSetDefaultAddress}
        />
      </Modal>
    </>
  );
};

export default CheckoutInfo;
