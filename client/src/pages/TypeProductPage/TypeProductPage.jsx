import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavBarComponent/NavbarComponent";
import { Col, Pagination, Row } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import { WrapperNavbar } from "./style";
import { useLocation } from "react-router-dom";
import { getProductType } from "../../services/ProductService";
import Loading from "../../components/LoadingComponet/Loading";
import { useSelector } from "react-redux";

export default function TypeProductPage() {
  const location = useLocation();
  const searchProduct = useSelector((state) => state?.product?.search);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPage: 1,
  });

  const fetchProductType = async (type, page, limit) => {
    setLoading(true);
    const res = await getProductType(type, page, limit);
    setProducts(res?.data);
    setPagination({ ...pagination, totalPage: res?.totalProducts });
    setLoading(false);
  };

  const onChange = (current, pageSize) => {
    setPagination({ ...pagination, page: current });
  };

  useEffect(() => {
    fetchProductType(location?.state, pagination.page, pagination.limit);
  }, [location?.state, pagination.page, pagination.limit]);

  return (
    <Loading isLoading={loading}>
      <Row
        style={{
          padding: "0 120px",
          background: "#efefef",
          flexWrap: "nowrap",
          paddingTop: "20px",
          height: "100%",
        }}
      >
        <WrapperNavbar span={4}>
          <NavbarComponent />
        </WrapperNavbar>

        <Col span={20}>
          <Row gutter={[5, 5]}>
            {products
              ?.filter((product) => {
                if (!searchProduct) {
                  return true;
                } else if (
                  product?.name
                    .toLowerCase()
                    .includes(searchProduct.toLowerCase())
                ) {
                  return true;
                }
                return false;
              })
              ?.map((data) => {
                return <CardComponent key={data} data={data} />;
              })}
          </Row>
          <Pagination
            current={pagination.page}
            total={pagination.totalPage}
            showSizeChanger={false}
            onChange={onChange}
            style={{ textAlign: "center", marginTop: "10px" }}
          />
        </Col>
      </Row>
    </Loading>
  );
}
