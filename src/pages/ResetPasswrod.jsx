import { Grid } from "@mui/material";
import { Button, Form, Input, Space } from "antd";
import React, { useState } from "react";
import FormResetPassword from "./FormResetPassword";

const ResetPassword = ({ open, setOpen }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGenOtp, setGenOtp] = useState(false);
  const [form] = Form.useForm();

  const onFinish = () => {
    setIsSuccess(true);
  };

  return (
    <div className="page-forgot">
      <Grid container spacing={4}>
        <Grid item lg={8} md={8} xs={8} className="content-left">
          <div className="content">
            <div className="logo-greenship">
              <img
                className="img-logo-greenship"
                src="/assets/images/auth/logo_greenship.png"
                alt="logo_greenship"
              />
            </div>
            <div className="preview-login">
              <img
                className="img-preview-login"
                src="/assets/images/auth/preview_login.png"
                alt="preview_login"
              />
            </div>
          </div>
        </Grid>
        <Grid item lg={4} md={4} xs={4} className="content-right">
          {!isGenOtp && !isSuccess ? (
            <>
              <div className="title-login">Nhận mã OTP</div>
              <div className="description-login">
                Nhập địa chỉ email bạn đã sử dụng khi đăng ký tài khoản. Chúng
                tôi sẽ gửi mã OTP về địa chỉ email đó của bạn.
              </div>
              <Form
                form={form}
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish}
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Space>
                    <Button htmlType="submit">Nhận Mã OTP</Button>
                    <Button htmlType="reset">Hủy bỏ</Button>
                  </Space>
                </Form.Item>
              </Form>
            </>
          ) : (
            <FormResetPassword isSuccess={isSuccess} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ResetPassword;
