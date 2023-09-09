import React, { useState } from "react";
import logo from "../assets/images/Logo.png";
import facebook from "../assets/images/facebook.svg";
import google from "../assets/images/google.svg";
import linkedin from "../assets/images/linkedin.svg";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, login, register } from "../redux/actions/auth.actions";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Checkbox, Form, Input, Select, Spin } from "antd";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Login = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [changeUser, setChangeUser] = useState(false);
  const [loginForm, setLoginFrom] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const onSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      email: email,
      password: password,
    };
    dispatch(
      login(userInfo, () => {
        toast.success("Đăng nhập thành công");
        dispatch(
          getProfile(() => {
            setChangeUser(!changeUser);
          })
        );
      })
    );
  };
  const handleRegister = (values) => {
    const params = {
      ...values,
      gender: +values.gender,
    };
    dispatch(
      register(params, () => {
        setLoading(false);
        toast.success("Đăng ký thành công!Bây giờ hãy đăng nhập vào hệ thống.");
      })
    );
    form.resetFields();
  };
  // @ts-ignore
  if (state.auth?.token) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <div
        className={`login__colored-container ${
          loginForm
            ? "login__colored-container--left"
            : "login__colored-container--right"
        }`}
      ></div>
      <div
        className={`login__welcome-back ${
          loginForm
            ? "login__welcome-back--active"
            : "login__welcome-back--inactive"
        }`}
      >
        <div className="login__welcome-back__logo-container">
          <img
            className="login__welcome-back__logo-container--image"
            src={logo}
            alt="Npc"
          />
          Fashion Shop
        </div>
        <div className="login__welcome-back__main-container">
          <div className="login__welcome-back__main-container__text-container">
            <span className="login__welcome-back__main-container__text-container--title">
              Chào mừng bạn trở lại!
            </span>
            <span className="login__welcome-back__main-container__text-container--secondary">
              Để tiếp tục tải nghiệm vui lòng bạn đăng nhập tài khoản
            </span>
          </div>
          <div
            onClick={() => {
              setLoginFrom(!loginForm);
            }}
            className="login__welcome-back__main-container__button-container"
          >
            Đăng nhập
          </div>
        </div>
      </div>
      <div
        className={`login__create-container ${
          loginForm
            ? "login__create-container--active"
            : "login__create-container--inactive"
        }`}
      >
        Đăng kí tài khoản
        <div className="login__create-container__social-container">
          <img
            className="login__create-container__social-container--facebook-icon"
            src={facebook}
            alt=""
          />
          <img
            className="login__create-container__social-container--google-icon"
            src={google}
            alt=""
          />
          <img
            className="login__create-container__social-container--linkedin-icon"
            src={linkedin}
            alt=""
          />
        </div>
        <span className="login__create-container--info-text">
          hoặc sử dụng tài khoản khác
        </span>
        <div className="login__create-container__form-container">
          {loading ? (
            <Spin size="large" />
          ) : (
            <Form
              {...formItemLayout}
              name="register"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{
                maxWidth: 600,
              }}
              onFinish={handleRegister}
            >
              <Form.Item
                name="fullname"
                label="Họ và tên"
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập họ và tên!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  // addonBefore={}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa chọn giới tính!",
                  },
                ]}
              >
                <Select placeholder="Chọn giới tính">
                  <Option value="0">Nam</Option>
                  <Option value="1">Nữ</Option>
                  <Option value="2">Khác</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Bạn chưa đồng ý điều khoản!")
                          ),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  Tôi đã đọc <a href="">điều khoản</a>
                </Checkbox>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
      <div
        className={`login__login-container ${
          !loginForm
            ? "login__login-container--active"
            : "login__login-container--inactive"
        }`}
      >
        <div className="login__login-container__logo-container">
          <img
            className="login__login-container__logo-container--image"
            src={logo}
            alt="NPC"
          />
          Fashion Shop
        </div>
        <div className="login__login-container__main-container">
          <div className="login__login-container__main-container__social-container">
            <img
              className="login__login-container__main-container__social-container--facebook-icon"
              src={facebook}
              alt=""
            />
            <img
              className="login__login-container__main-container__social-container--google-icon"
              src={google}
              alt=""
            />
            <img
              className="login__login-container__main-container__social-container--linkedin-icon"
              src={linkedin}
              alt=""
            />
          </div>
          <span className="login__login-container__main-container--info-text">
            sử dụng email để đăng nhập
          </span>
          <div className="login__login-container__main-container__form-container">
            <form
              className="login__login-container__main-container__form-container__form"
              onSubmit={onSubmit}
            >
              <div className="login__login-container__main-container__form-container__form--wrapper">
                <input
                  className="login__login-container__main-container__form-container__form--wrapper--email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login__login-container__main-container__form-container__form--wrapper">
                <input
                  className="login__login-container__main-container__form-container__form--wrapper--password"
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="login__login-container__main-container__form-container__form--wrapper--show"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  <i
                    className={
                      isShowPassword ? "bx bx-show" : "bx bx-low-vision"
                    }
                  ></i>
                </span>
              </div>

              <button className="login__login-container__main-container__form-container__form--submit">
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className={`login__hello-container ${
          !loginForm
            ? "login__hello-container--active"
            : "login__hello-container--inactive"
        }`}
      >
        <div className="login__welcome-back__main-container__text-container">
          <span className="login__welcome-back__main-container__text-container--title">
            Chào mừng bạn đến với thế giới của YOLO !
          </span>
          <span className="login__welcome-back__main-container__text-container--secondary">
            Điền thông tin chi tiết của bạn , và bắt đầu trải nghiệm sản phẩm
            của chúng tôi!
          </span>
        </div>
        <div
          onClick={() => {
            setLoginFrom(!loginForm);
          }}
          className="login__welcome-back__main-container__button-container"
        >
          Đăng kí
        </div>
      </div>
    </div>
  );
};

export default Login;
