import React, { useState, lazy, useEffect, Fragment } from "react";
import { apiCallForAuthentication } from "../../../api";
import { useDispatch } from "react-redux";
import { actionUpdateLoginStatus } from "../../../store/reducer/login-reducer";
import {
  CommonButton,
  CommonSpinner,
  CommonTextInput,
} from "../../../components/common";
import { checkFieldValidation } from "./login-presenter";
import { loadCaptchaEnginge, LoadCanvasTemplate } from "react-simple-captcha";

//alert declration
const AlertMessage = lazy(() =>
  import("../../../components/common/alert-message-box")
);

function Login() {
  /**
   * state delcaration
   */
  const [txtEmail, setTxtEmail] = useState(
    "trushit.chauhan+devadmin@gmail.com"
  );
  const [txtPassword, setTxtPassword] = useState("Trushit@12345");
  const [txtCaptcha, setTxtCaptcha] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    /**
     * captch init
     * pass number character in captcha
     * background color
     * text color
     */
    loadCaptchaEnginge(6, "#000", "#fff");
  }, []);

  /**
   * dispatch
   */
  const dispatch = useDispatch();

  /**
   * call this function when clicked on login button or submit button
   */
  const btnSubmitClicked = () => {
    /**
     * first we check field validation using checkFieldValidation function
     * api call for login
     */
    const errorMessage = checkFieldValidation(
      txtEmail,
      txtPassword,
      txtCaptcha
    );
    if (errorMessage.length <= 0) {
      setIsLoader(true);
      let dict = {
        email: txtEmail,
        password: txtPassword,
      };
      apiCallForAuthentication(dict)
        .then((res) => {
          setIsLoader(false);
          dispatch(actionUpdateLoginStatus(res));
        })
        .catch((err) => {
          setIsLoader(false);
          setAlertMessage(err);
        });
    } else {
      /**
       * show aler message
       */
      setAlertMessage(errorMessage);
    }
  };

  /**
   * text input
   * @returns
   */
  const renderTextInputFields = () => {
    return (
      <Fragment>
        <CommonTextInput
          value={txtEmail}
          changetextinput={(e) => setTxtEmail(e)}
          txtid="txtEmail"
          placeholdertext="email"
          styles="input-field"
        />
        <CommonTextInput
          value={txtPassword}
          changetextinput={(e) => setTxtPassword(e)}
          txtid="txtPassword"
          placeholdertext="password"
          isPassword={true}
          styles="input-field"
        />
      </Fragment>
    );
  };

  /**
   * alert message
   * @returns
   */
  const renderAlertMessage = () => {
    return (
      <AlertMessage
        isSuccess={false}
        message={alertMessage}
        onHideAlert={() => setAlertMessage("")}
        styles="login-alert-box"
      />
    );
  };

  const renderLoginForgotButton = () => {
    return (
      <Fragment>
        {!isLoader && (
          <CommonButton
            styles="btn-login"
            onClickedButton={btnSubmitClicked}
            title="Submit"
          />
        )}
        {/* forgot password */}
        {!isLoader && (
          <CommonButton
            styles="login-forgot-password"
            onClickedButton={btnSubmitClicked}
            title="Forgot Password"
          />
        )}
      </Fragment>
    );
  };

  const renderCaptch = () => {
    return (
      <div className="div-captcha">
        <LoadCanvasTemplate />
      </div>
    );
  };

  /**
   * render main view
   */
  return (
    <div className="div-main-login">
      <div className="div-login">
        <h1 className="txt-login">Login</h1>
        {/* text input email and password */}
        {renderTextInputFields()}
        {/* captch */}
        {renderCaptch()}
        <CommonTextInput
          value={txtCaptcha}
          changetextinput={(e) => setTxtCaptcha(e)}
          txtid="setTxtCaptcha"
          placeholdertext="enter captch"
          isPassword={false}
          styles="input-field"
          numberCharacter={6}
        />
        {/* loader */}
        {isLoader && (
          <CommonSpinner styles="login-spinner" isLoading={isLoader} />
        )}
        {/* alert message */}
        {renderAlertMessage()}
        {/* login button */}
        {renderLoginForgotButton()}
      </div>
    </div>
  );
}

export default Login;
