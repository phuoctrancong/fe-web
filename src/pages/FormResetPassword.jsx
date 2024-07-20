import React, { useState } from "react";

import { Button, Form, Input, Modal, Space, Typography } from "antd";
import { Grid } from "@mui/material";
import { NavLink } from "react-router-dom";

const FormResetPassword = ({ isSuccess }) => {
  const [form] = Form.useForm();
  const [isConfirm, setIsConfirm] = useState(false);
  const onFinish = (values) => {
    setIsConfirm(true);
  };
  return isSuccess && !isConfirm ? (
    <>
      <div className="title-login">Quên mật khẩu</div>
      <div className="description-login">
        Nhập địa chỉ email bạn đã sử dụng khi đăng ký tài khoản. Chúng tôi sẽ
        gửi mật khẩu mới về địa chỉ email đó của bạn.
      </div>
      <div className="content-right__form">
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="otp" label="Mã OTP" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu mới"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button htmlType="submit">Xác nhận</Button>
              <Button htmlType="reset">Hủy bỏ</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  ) : (
    <Grid>
      {/* <img src="/assets/images/auth/forgot_success.png" alt="forgot_success" /> */}
      <div className="title-login" style={{ marginTop: 10 }}>
        Đặt lại mật khẩu thành công!
      </div>
      <div className="description-login">
        Chúng tôi đã gửi mật khẩu mới của bạn qua địa chỉ email{" "}
        <span style={{ fontWeight: 500 }}>{"aaa"}</span>. Vui lòng kiểm địa chỉ
        email của bạn!
      </div>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 1 }}
      >
        <Typography>Bạn chưa nhận được email?</Typography>
        <NavLink style={{ color: "#000", marginLeft: 5 }}>Gửi lại</NavLink>
      </Grid>
    </Grid>
  );
};

export default FormResetPassword;
