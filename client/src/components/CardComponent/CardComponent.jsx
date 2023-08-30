import React from "react";
import {
  WrapperCard,
  WrapperDiscountText,
  WrapperImage,
  WrapperNameProduct,
  WrapperPriceText,
  WrapperReportText,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import { Col } from "antd";
import { WrapperStyleTextSell } from "../ProductDetailComponent/style";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";
export default function CardComponent(props) {
  const { productItem } = props;
  const navigate = useNavigate();

  const handleDetailProduct = (id) => {
    navigate(`/product-detail/${id}`);
  };
  return (
    <Col>
      <WrapperCard
        hoverable
        bodyStyle={{ padding: 10 }}
        style={{ width: '200px' }}
        cover={
          <img
          className="img"
            alt="example"
            style={{height: '200px'}}
            src={productItem?.image}
          />
        }
        disabled={productItem?.countInStock === 0}
        onClick={() =>
          productItem?.countInStock !== 0 &&
          handleDetailProduct(productItem?._id)
        }
      >
        <WrapperImage src={logo} alt="" />
        <WrapperNameProduct>{productItem?.name}</WrapperNameProduct>
        <WrapperReportText>
          <span>
            <span>{productItem?.rating}</span>
            <StarFilled
              style={{
                fontSize: "12px",
                color: "rgb(253, 216, 54)",
                marginRight: "4px",
              }}
            />
          </span>
          <WrapperStyleTextSell>
            {" "}
            | Đã bán {productItem?.selled || 1000}+
          </WrapperStyleTextSell>
        </WrapperReportText>
        <WrapperPriceText>
          <span style={{ marginRight: "8px" }}>
            {convertPrice(productItem?.price)}
          </span>
          <WrapperDiscountText>
            {productItem?.discount || 5}%
          </WrapperDiscountText>
        </WrapperPriceText>
      </WrapperCard>
    </Col>
  );
}
