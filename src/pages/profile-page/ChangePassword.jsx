import { Button, Form, Input } from "antd";
import Helmet from "components/Helmet";
import { BASE_URL } from "constant/config";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { changePassword, getProfile, logout } from "redux/actions/auth.actions";
import BannerUserPage from "./BannerUserPage";
import MenuListUserInfo from "./MenuListUserInfo";

const ChangePassword = () => {
  const [changeInfo, setChangeInfo] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [changeInfo]);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      password: user?.password,
    });
  }, [form, user]);

  const resetForm = () => {
    form.resetFields();
  };
  const onFinish = (values) => {
    const { oldPassword, password: newPassword } = values;
    dispatch(
      changePassword(
        {
          email: user?.email,
          oldPassword,
          password: newPassword,
        },
        () => {
          dispatch(getProfile(() => setChangeInfo(!changeInfo)));
          resetForm();
          toast.success("Thay đổi mật khẩu thành công");

          // Log the user out and notify them to log in again
          dispatch(logout());
          toast.info("Mật khẩu đã thay đổi. Vui lòng đăng nhập lại.");
          // Redirect to login page or reload
          setTimeout(() => {
            window.location.href = "/login"; // or another appropriate login URL
          }, 2000);
        }
      )
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Helmet title="Đổi mật khẩu">
      <div className="user">
        <BannerUserPage />
        <div className="user__content user__content__password">
          <div className="row">
            <MenuListUserInfo />
            <div className="col l-8 m-8 c-12 user__content__info">
              <div className="user__content__info__top">
                <h4>Đổi mật khẩu</h4>
              </div>
              <div className="user__content__info__form">
                <Form
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  form={form}
                >
                  <Form.Item
                    label="Mật khẩu cũ"
                    name="oldPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="Mật khẩu mới"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Lưu
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default ChangePassword;
