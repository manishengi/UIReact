import CryptoJS from "crypto-js";

/**
 * check is production or development
 */
const utilIsProduction = process.env.NODE_ENV === "production";

/**
 * encrypt string
 * 1. message
 * 2. key
 * @param {*} message
 * @param {*} key
 * @returns
 */
const utilEncryptString = (message, key) => {
  var ciphertext = CryptoJS.AES.encrypt(message, key).toString();
  return ciphertext;
};

/**
 * decrypt string
 * 1. message
 * 2. key
 * @param {*} message
 * @param {*} key
 * @returns
 */
const utilDecryptString = (message, key) => {
  var bytes = CryptoJS.AES.decrypt(message, key);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

export { utilIsProduction, utilEncryptString, utilDecryptString };
