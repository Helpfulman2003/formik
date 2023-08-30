import { orderConstant } from "./constant";

export const getBase64 = (file) =>
new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const convertPrice = (price) => {
  try {
    const result = price.toLocaleString().replaceAll(',', '.')
    return `${result} VND`
  } catch (error) {
    return null
  }
}

export const convertDataChart = (data, type) => {
  try {
      const object = {}
      Array.isArray(data) && data.forEach((opt) => {
          if(!object[opt[type]]) {
              object[opt[type]] = 1
          } else {
              object[opt[type]]+=1
          }
      })
      const results = Array.isArray(Object.keys(object)) && Object.keys(object).map((item) => {
          return {
              name: orderConstant.payment[item],
              value: object[item]
          }
      })
      return results
  }catch(e) {
      return []
  }
}
