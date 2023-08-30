import { styled } from "styled-components";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  justify-content: flex-start;
  height: 44px;
`;
export const WrapperButtonMore = styled.button`
    outline: none;
    color: #fff;
    border: none;
    /* border: 1px solid #0000005c; */
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;


  & span {
    display: block;
    width: 100%;
    height: 100%;
    padding: 8px 16px;
  }

  &:before,
  &:after {
    position: absolute;
    content: '';
    height: 0%;
    width: 1px;
    background: #499ae6;
    transition: all 0.5s ease;
  }

  &:before {
    right: 0;
    top: 0;
  }

  &:after {
    left: 0;
    bottom: 0;
  }

  &:hover {
    color: #499ae6;
    background: transparent;
  }

  &:hover:before {
    height: 100%;
  }

  &:hover:after {
    height: 100%;
  }

  & span:before,
  & span:after {
    position: absolute;
    content: '';
    background: #499ae6;
    transition: all 0.5s ease;
  }

  & span:before {
    left: 0;
    top: 0;
    width: 0%;
    height: 1px;
  }

  & span:after {
    right: 0;
    bottom: 0;
    width: 0%;
    height: 1px;
  }

  & span:hover:before {
    width: 100%;
  }

  & span:hover:after {
    width: 100%;
  }

`;
