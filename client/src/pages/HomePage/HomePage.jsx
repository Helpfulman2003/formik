import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import slider4 from "../../assets/images/slider4.webp";
import slider5 from "../../assets/images/slider5.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAllTypeProduct, getProduct } from "../../services/ProductService";

import Loading from "../../components/LoadingComponet/Loading";
import { getAllType, getAllproduct } from "../../redux/productSlice";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const dispatch = useDispatch();
  const productSearch = useSelector((state) => state?.product?.search);
  const typeProduct = useSelector((state) => state?.product?.type);
  const [limit, setLimit] = useState(6);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/sign-in");
  //   }
  // }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllTypeProduct();
        dispatch(getAllType(res?.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const fetchProductAll = async (context) => {
    const search = context?.queryKey && context?.queryKey[1];
    const limit = context?.queryKey && context?.queryKey[2];
    const res = await getProduct(search, limit);
    return res;
  };

  const { isLoading, data, isPreviousData } = useQuery({
    queryKey: ["product", productSearch, limit],
    queryFn: fetchProductAll,
    keepPreviousData: true,
  });

  useEffect(() => {
    dispatch(getAllproduct(data?.data));
  }, [data, dispatch]);

  return (
    <>
      <Loading isLoading={isLoading}>
        <div style={{ padding: "0 120px" }}>
          <WrapperTypeProduct>
            {typeProduct?.map((arr) => {
              return <TypeProduct key={arr} name={arr} />;
            })}
          </WrapperTypeProduct>
        </div>
        <div
          id="container"
          style={{ padding: "0 120px", background: "#efefef" }}
        >
          <SliderComponent
            arrImage={[slider1, slider2, slider3, slider4, slider5]}
          />
          <Row gutter={[5, 5]} style={{ marginTop: "20px" }}>
            {data?.data &&
              data?.data?.map((item) => {
                return <CardComponent key={item._id} productItem={item} />;
              })}
          </Row>
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "10px" }}
          >
            <WrapperButtonMore
              disabled={
                data?.totalProducts === data?.data.length ||
                data.totalPages === 1
              }
              onClick={() => setLimit((prev) => prev + 6)}
            >
              <span>{isPreviousData ? "Loading" : "Xem thêm"}</span>
            </WrapperButtonMore>
          </div>
        </div>
      </Loading>
    </>
  );
}
