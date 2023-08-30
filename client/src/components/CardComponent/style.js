import { styled } from "styled-components";
import { Card } from "antd";

export const WrapperCard = styled(Card)`
    position: relative;
    overflow: hidden;

`

export const WrapperNameProduct = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: rgb(56, 56, 61);
`

export const WrapperReportText = styled.div`
    font-size: 12px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0;
`
export const WrapperPriceText = styled.div`
    color: rgb(255, 66, 78);
    font-size: 16px;
    font-weight: 500;
`

export const WrapperDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font-size: 12px;
    font-weight: 500;
`
export const WrapperImage = styled.img`
    width: 68px;
    height: 14px;
    position: absolute;
    top: 0;
    left: 0;
    
`