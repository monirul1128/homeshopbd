import { reactLocalStorage } from "reactjs-localstorage";
import CryptoJS from "crypto-js";

const secretKey = "your-secret-key"; // Store this securely (e.g., in an env variable)

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

const setCartInLocalStorage = (product, selectSize) => {
  const items = {
    price: product?.productPrice,
    salePrice: product?.salePrice,
    originalPrice: product?.price,
    discount: 0,
    _id: product?._id,
    path: product?.path,
    createdAt: new Date().toString(),
    image: product.imageURLs[0],
    category: product?.category,
    quantity: 1,
    productTitle: product?.name,
    sku: "",
    userSize: selectSize || product.size[0] || "",
    size: product.size,
    productColor: product.productColor,
    userColor: product.productColor[0] || "",
    itemTotal: product?.salePrice,
  };

  const cartProduct = {
    items: [],
    isEmpty: false,
    totalItems: 1,
    totalUniqueItems: 1,
    cartTotal: product?.salePrice,
    _id: "",
  };

  const encryptedCart = reactLocalStorage.get("shopping-cart");
  const cart = encryptedCart ? decryptData(encryptedCart) : null;

  if (cart && cart.totalItems) {
    const isAvailableProduct = cart.items.find((it) => it._id == product._id);

    if (isAvailableProduct) {
      return true;
    } else {
      cart.items.push(items);
      cart.totalItems++;
      cart.totalUniqueItems++;
      cart.cartTotal += product.salePrice;
      reactLocalStorage.set("shopping-cart", encryptData(cart));
    }
  } else {
    cartProduct.items.push(items);
    reactLocalStorage.set("shopping-cart", encryptData(cartProduct));
  }
};

export default setCartInLocalStorage;
