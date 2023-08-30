import { Input } from "antd";
import { styled } from "styled-components";

export const WrapperInputStyle = styled(Input)`
    margin-bottom: 10px;
    &:focus {
        background: rgb(232, 240, 252);
    }
`