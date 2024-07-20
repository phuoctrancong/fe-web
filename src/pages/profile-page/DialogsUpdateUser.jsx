import React, { useEffect, useState } from "react";
import { Form, Modal, Input, Row, Col, Button, Select } from "antd";
import { useDispatch } from "react-redux";
import { updateUser } from "redux/actions/auth.actions";
import { toast } from "react-toastify";
const DialogsUpdateUser = ({ visible, setVisible, mode, user, setUser }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      fullname: user?.fullname,
      phone: user?.phone,
      email: user?.email,
      gender: user?.gender,
    });
  }, [form, user]);
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const showTitle = (mode) => {
    switch (mode) {
      case "CREATE":
        return "Tạo mới người dùng";
      case "UPDATE":
        return "Cập nhật người dùng";
      default:
        break;
    }
  };
  const onFinish = (values) => {
    switch (mode) {
      case "CREATE":
        // dispatch(
        //   createAddress(values, () =>
        //     dispatch(listAddresses({ page, isMe: 1 }))
        //   )
        // );
        break;
      case "UPDATE":
        dispatch(
          updateUser(
            { fullname: values?.fullname, gender: values?.gender },
            () => {
              const updatedUser = {
                ...user,
                fullname: values?.fullname,
                gender: +values?.gender,
              };
              localStorage.setItem("user", JSON.stringify(updatedUser));
              setUser(updatedUser);
              toast.success("Cập nhật thông tin người dùng thành công");
            }
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

  return (
    <div>
      <>
        <Modal
          title={showTitle(mode)}
          visible={visible}
          onCancel={handleCancel}
          footer={false}
          width={600}
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
              <Col span={24}>
                <Form.Item
                  label="Họ và tên"
                  name="fullname"
                  rules={[
                    { required: true, message: "Vui lòng nhập họ và tên" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Email" name="email">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="gender" label="Giới tính">
                  <Select
                    defaultValue={user.gender === 0 ? "Name" : "Nữ"}
                    style={{ width: 120 }}
                    options={[
                      { value: 0, label: "Nam" },
                      { value: 1, label: "Nữ" },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#4267b2" }}
              >
                {showLableButton(mode)}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    </div>
  );
};

export default DialogsUpdateUser;
