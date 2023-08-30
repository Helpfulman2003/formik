import React, { useState } from "react";
import { Badge, Col, Popover } from "antd";
import logoTiki from '../../assets/images/logoTiki.png'
import {
  WrapperHeader,
  WrapperTextHeader,
  WapperHeaderAccount,
  WrapperTextHeaderSmall,
  WrapperContentPopup,
} from "../style";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import CaretDownOutlined from "@ant-design/icons/CaretDownOutlined";
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined";
import InputComponent from "../InputComponet/InputComponent";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../services/UserService";
import { resetUser } from "../../redux/userSlice";
import Loading from "../LoadingComponet/Loading";
import {  searchProduct } from "../../redux/productSlice";

export default function Header(props) {
  const { isHiddenSearch = false, isHiddenCart = false } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const order = useSelector(state => state?.order?.orderItems)
  // let axiosJWT = createAxios(user, dispatch, updateUser)
  console.log('order', order);
  const handleLogout = async () => {
    setLoading(true);
    await logOut();
    dispatch(resetUser());
    setLoading(false);
    navigate("/sign-in");
  };

  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate("/profile-user")}>
        Thông tin người dùng
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => navigate("/my-order")}>
        Đơn hàng của tôi
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate("/system/admin")}>
          Quản lí hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleSearchProduct = (value) => {
    dispatch(searchProduct(value));
  };

  return (
    <div style={{ width: "100%", background: "rgb(26, 148, 255)" }}>
      <WrapperHeader
        style={{
          justifyContent:
            isHiddenCart && isHiddenSearch ? "space-between" : "unset",
        }}
      >
        <Col span={5}>
          <Link to="/">
            <WrapperTextHeader><img src={logoTiki} alt="" width='72px' height='72px' /></WrapperTextHeader>
          </Link>
        </Col>

        {!isHiddenSearch && (
          <Col span={13}>
            <InputComponent
              prefix={<SearchOutlined />}
              placeholder="Input search text"
              enterButton="Search"
              onSearch={handleSearchProduct}
            />
          </Col>
        )}

        <Col span={6} style={{ display: "flex", gap: "20px" }}>
          <Loading isLoading={loading}>
            <WapperHeaderAccount>
              {user?.avatar ? (
                <img
                  src={user?.avatar}
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}
              {user?.name ? (
                <Popover placement="bottom" content={content} open={isOpenPopup}>
                  <div style={{ cursor: "pointer" }} onClick={() => setIsOpenPopup((prev) => !prev)}>{user.name}</div>
                </Popover>
              ) : (
                <div style={{ cursor: "pointer" }}>
                  <WapperHeaderAccount onClick={handleNavigateLogin}>
                    Đăng nhập/Đăng ký
                  </WapperHeaderAccount>
                  <div>
                    <span>Tài khoản</span>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WapperHeaderAccount>
          </Loading>
          {!isHiddenCart && (
            <div onClick={() => {navigate('/order')}} style={{cursor: 'pointer'}}>
              <Badge count={order.length} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: "#fff" }}
                />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
}
