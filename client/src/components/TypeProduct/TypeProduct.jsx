import React from "react";
import { useNavigate } from "react-router-dom";

export default function TypeProduct(props) {
  const navigate = useNavigate()
  const { name } = props;
  return (
    <div style={{padding: '0 10px', cursor: 'pointer'}} onClick={() => {navigate(`/product/${name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, {state: name})}}>
      {name}
  </div>
  )
}
