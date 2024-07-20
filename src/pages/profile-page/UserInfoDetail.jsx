// @ts-nocheck
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DialogsUpdateUser from "./DialogsUpdateUser";
import { Button } from "antd";
import { getProfile } from "redux/actions/auth.actions";
import { useDispatch } from "react-redux";
import { getProfileService } from "service/auth.service";

const UserInfoDetail = (props) => {
  const { changeInfo, setChangeInfo } = props;
  const [user, setUser] = useState({});
  const [mode, setMode] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [changeInfo]);
  const [visible, setVisible] = useState(false);
  const handleShowModal = () => {
    setVisible(!visible);
    setMode("UPDATE");
  };
  return (
    <>
      <div className="user__content__info__top">
        <h4 className="h4">Chi tiết tài khoản</h4>
        <Button size="sm" onClick={handleShowModal}>
          Chỉnh sửa thông tin
        </Button>
      </div>
      <div className="user__content__info__form">
        <div className="user__content__info__form__group">
          <label htmlFor="">Họ và tên</label>
          <input
            type="text"
            placeholder=""
            defaultValue={user?.fullname}
            required
          />
        </div>
        <div className="user__content__info__form__group">
          <label htmlFor="">Số điện thoại</label>
          <input
            type="tel"
            placeholder=""
            defaultValue={user?.phone}
            required
          />
        </div>
        <div className="user__content__info__form__group">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder=""
            defaultValue={user?.email}
            required
          />
        </div>
        <div className="user__content__info__form__group">
          <label htmlFor="">Giới tính</label>
          <select name="select" id="" value={+user?.gender} disabled>
            <option value="" disabled>
              Giới tính
            </option>
            <option value={0}>Nam</option>
            <option value={1}>Nữ</option>
          </select>
        </div>
      </div>

      {visible && (
        <DialogsUpdateUser
          visible={visible}
          setVisible={setVisible}
          mode={mode}
          user={user}
          setUser={setUser}
          changeInfo={changeInfo}
          setChangeInfo={setChangeInfo}
        />
      )}
    </>
  );
};

export default UserInfoDetail;
