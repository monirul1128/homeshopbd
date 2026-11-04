import { reactLocalStorage } from "reactjs-localstorage";
import CryptoJS from "crypto-js";

const secretKey = "your-secret-key"; // Store securely (e.g., in an env variable)

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

const updateCartLocalStorage = ({ action, product }) => {
  const encryptedCart = reactLocalStorage.get("shopping-cart");
  const cart = encryptedCart ? decryptData(encryptedCart) : null;

  if (cart && cart.totalItems) {
    const isAvailableProduct = cart.items.find((it) => it._id == product._id);
    if (isAvailableProduct) {
      if (action == "add") {
        isAvailableProduct.itemTotal += isAvailableProduct.salePrice;
        isAvailableProduct.quantity++;
        cart.totalItems++;
        cart.cartTotal += isAvailableProduct.salePrice;
      } else if (action == "size") {
        isAvailableProduct.userSize = product.userSize;
        isAvailableProduct.userColor = product.userColor;
      } else if (action == "minus") {
        isAvailableProduct.itemTotal -= isAvailableProduct.salePrice;
        isAvailableProduct.quantity--;
        cart.cartTotal -= isAvailableProduct.salePrice;
        if (isAvailableProduct.quantity < 1) {
          cart.items = cart.items.filter((it) => it._id != product._id);
          cart.totalItems--;
        } else {
          cart.totalItems--;
        }
      } else if (action === "delete") {
        cart.items = cart.items.filter((it) => it._id != product._id);
        cart.totalItems -= isAvailableProduct.quantity;
        cart.cartTotal -= isAvailableProduct.quantity * isAvailableProduct.salePrice;
      }
      reactLocalStorage.set("shopping-cart", encryptData(cart));
    }
  }
};

export default updateCartLocalStorage;
