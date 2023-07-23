import Helmet from "components/Helmet";
import React, { useEffect, useState } from "react";
import BannerUserPage from "./BannerUserPage";
import MenuListUserInfo from "./MenuListUserInfo";
import {
  List,
  Skeleton,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Checkbox,
} from "antd";
import { useDispatch } from "react-redux";
import {
  createAddress,
  detailAddress,
  listAddresses,
  setDefault,
  updateAddress,
} from "redux/actions/address.action";
import { useSelector } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
const loading = true;
const AddressUser = () => {
  const { TextArea } = Input;
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState();
  const [id, setId] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(listAddresses({ isMe: 1 }));
  }, [dispatch]);
  useEffect(() => {
    form.setFieldsValue({
      fullName: state?.item?.fullName,
      phone: state?.item?.phone,
      addressLine: state?.item?.addressLine,
      description: state?.item?.description,
      isDefault: state?.item.isDefault,
    });
  }, [form, state.item]);
  const showModal = () => {
    form.resetFields();
    setMode("CREATE");
    setVisible(true);
  };

  const showModalUpdate = (id) => {
    setId(id);
    setMode("UPDATE");
    setVisible(true);
    dispatch(detailAddress(id));
  };
  const showTitle = (mode) => {
    switch (mode) {
      case "CREATE":
        return "Tạo mới địa chỉ";
      case "UPDATE":
        return "Cập nhật địa chỉ";
      default:
        break;
    }
  };
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };
  const onFinish = (values) => {
    switch (mode) {
      case "CREATE":
        dispatch(
          createAddress(values, () =>
            dispatch(listAddresses({ page, isMe: 1 }))
          )
        );
        break;
      case "UPDATE":
        dispatch(
          updateAddress(id, values, () =>
            dispatch(listAddresses({ page, isMe: 1 }))
          )
        );
        break;
      default:
        break;
    }
    setVisible(false);
    form.resetFields();
  };

  const showLableButton = (mode) => {
    switch (mode) {
      case "CREATE":
        return "Tạo mới";
      case "UPDATE":
        return "Cập nhật";
      default:
        break;
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  console.log();
  return (
    <Helmet title="Thông tin người dùng - Địa chỉ">
      <div className="user">
        <BannerUserPage />
        <div className="user__content">
          <div className="row">
            <MenuListUserInfo />
            <div className="col l-8 m-8 c-12 user__content__address">
              <Space style={{ marginBottom: 20 }}>
                <Button type="primary" onClick={showModal}>
                  Tạo mới
                </Button>
              </Space>
              <List
                className="demo-loadmore-list"
                loading={!loading}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={state?.items}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        onClick={() =>
                          dispatch(
                            setDefault(item.id, () =>
                              dispatch(listAddresses({ page, isMe: 1 }))
                            )
                          )
                        }
                      >
                        Cài đặt mặc định
                      </Button>,
                      <EditOutlined
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => showModalUpdate(item.id)}
                      />,
                    ]}
                  >
                    <Skeleton
                      avatar
                      title={false}
                      loading={item.loading}
                      active
                    >
                      <List.Item.Meta
                        title={`${item.fullName} || ${item.phone} `}
                        description={`${item.addressLine}`}
                      />
                      {item.isDefault ? (
                        <Button type="primary" danger disabled>
                          Mặc định
                        </Button>
                      ) : null}
                    </Skeleton>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <>
        <Modal
          title={showTitle(mode)}
          visible={visible}
          onCancel={handleCancel}
          footer={false}
          width={800}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  label="Họ và tên"
                  name="fullName"
                  rules={[
                    { required: true, message: "Vui lòng nhập họ và tên" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  label="Địa chỉ cụ thể"
                  name="addressLine"
                  rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  label="Ghi chú"
                  name="description"
                >
                  <TextArea allowClear />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 12 }}
                  name="isDefault"
                  valuePropName="checked"
                  label="Thiết lập địa chỉ mặc định"
                >
                  <Checkbox style={{ paddingLeft: "5px" }}></Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
              <Button type="primary" htmlType="submit">
                {showLableButton(mode)}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    </Helmet>
  );
};

export default AddressUser;
