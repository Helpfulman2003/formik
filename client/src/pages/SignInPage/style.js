import { styled } from "styled-components";

export const WrapperContainerLeft = styled.div`
    flex: 1;
    padding: 40px 45px 24px;
`;

export const WrapperContainerRight = styled.div`
  width: 300px;
  background: linear-gradient(
    136deg,
    rgb(240, 248, 255) -1%,
    rgb(219, 238, 255) 85%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const WrapperLabel = styled.h4`
  margin: 0px 0px 5px;
  color: rgb(11, 116, 229);
  font-size: 17px;
  font-weight: 500;
`;

export const WrapperTextLight = styled.span`
    color: rgb(13, 92, 182);
    font-size: 13px;
    cursor: pointer;
`