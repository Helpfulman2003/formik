import { Row } from 'antd'
import styled from 'styled-components'

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgb(26, 148, 255);
    align-items: center;
    flex-wrap: nowrap;
    gap: 10px;
`
export const WrapperTextHeader = styled.span`
    /* font-size: 18px;
    color: #fff;
    font-weight: bold;
    text-align: left; */
`
export const WapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    gap: 10px;
    font-size: 12px;
`
export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(27, 148, 255);
    }
`