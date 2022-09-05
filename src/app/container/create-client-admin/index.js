import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ApiClient } from "../../api/client";
import { CommonButton, CommonSpinner } from "../../components/common";
import CommonTextInput from "../../components/common/input";
import { inputData, adminEntityInput, adminUserInput } from "./input-data";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import { RoutePath } from "../../routes/route-path";
import AlertMessage from "../../components/common/alert-message-box";

export default function CreateClientAdmin() {
  const [listInputInfo, setListInputInfo] = useState(inputData);
  const [listInputAdminUser, setListInputAdminUser] = useState(adminUserInput);
  const [listInputAdminEntity, setListInputAdminEntity] =
    useState(adminEntityInput);
  const [isInputError, setIsInputError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //use selector
  const { loginInfo } = useSelector((state) => state.rLogin);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccessAlert, setIsSuccessAlert] = useState(true);

  //navigation
  const navigation = useNavigate();

  const renderInputField = () => {
    return listInputInfo.map((item, index) => (
      <div key={index} className="div-input-create-client">
        <label className="lbl-create-title">{item.lable}</label>
        <CommonTextInput
          placeholdertext={item.lable}
          value={item.value}
          changetextinput={(e) => onChangeTextInput(e, index, 1)}
          id={item.key}
          isPassword={item.key === "password" ? true : false}
        />
        {isInputError && item.isRequire && item.value.length <= 0 && (
          <p className="input-error-msg">{`${item.errMsg}`}</p>
        )}
      </div>
    ));
  };

  const renderAdminUserInputField = () => {
    return listInputAdminUser.map((item, index) => (
      <div key={index} className="div-input-create-client">
        <label className="lbl-create-title">{item.lable}</label>
        <CommonTextInput
          placeholdertext={item.lable}
          value={item.value}
          changetextinput={(e) => onChangeTextInput(e, index, 2)}
          id={item.key}
          isPassword={item.key === "password" ? true : false}
        />
        {isInputError && item.isRequire && item.value.length <= 0 && (
          <p className="input-error-msg">{`${item.errMsg}`}</p>
        )}
      </div>
    ));
  };

  const renderAdminEntityInputField = () => {
    return listInputAdminEntity.map((item, index) => (
      <div key={index} className="div-input-create-client">
        <label className="lbl-create-title">{item.lable}</label>
        {item.type && item.type === "switch" ? (
          <div>
            <input
              type="checkbox"
              onChange={(e) => onChangeTextInput(!item.value, index, 3)}
            />
            <label>Allow</label>
          </div>
        ) : (
          <CommonTextInput
            placeholdertext={item.lable}
            value={item.value}
            changetextinput={(e) => onChangeTextInput(e, index, 3)}
            id={item.key}
            isPassword={item.key === "password" ? true : false}
          />
        )}
        {isInputError && item.isRequire && item.value.length <= 0 && (
          <p className="input-error-msg">{`${item.errMsg}`}</p>
        )}
      </div>
    ));
  };

  const onChangeTextInput = (value, index, listType) => {
    let arrInput = [];
    if (listType === 1) {
      arrInput = [...listInputInfo];
    } else if (listType === 2) {
      arrInput = [...listInputAdminUser];
    } else if (listType === 3) {
      arrInput = [...listInputAdminEntity];
    }
    let info = arrInput[index];
    info.value = value;
    if (listType === 1) {
      setListInputInfo(arrInput);
    } else if (listType === 2) {
      setListInputAdminUser(arrInput);
    } else if (listType === 3) {
      setListInputAdminEntity(arrInput);
    }
  };

  const btnSubmitClicked = () => {
    if (!isLoading) {
      let dictRequBody = {};
      let isValideInput = true;
      listInputInfo.forEach((item) => {
        dictRequBody[item.key] = item.value;
        if (item.isRequire && item.value.length <= 0) {
          isValideInput = false;
        }
      });

      let dictAdminUser = {};
      listInputAdminUser.forEach((item) => {
        dictAdminUser[item.key] = item.value;
        if (item.isRequire && item.value.length <= 0) {
          isValideInput = false;
        }
      });

      dictRequBody["adminUser"] = dictAdminUser;

      let dictAdminEntity = {};
      listInputAdminEntity.forEach((item) => {
        dictAdminEntity[item.key] = item.value;
        if (item.isRequire && item.value.length <= 0) {
          isValideInput = false;
        }
      });

      dictRequBody["adminEntity"] = dictAdminEntity;

      if (!isValideInput) {
        setIsInputError(true);
        return;
      }
      setIsInputError(false);
      setIsLoading(true);
      ApiClient()
        .apiCallForAddNewClient(dictRequBody, loginInfo.token.idToken)
        .then((res) => {
          setIsLoading(false);
          setIsSuccessAlert(true);
          setAlertMessage("Client Created Successfully");
          setTimeout(() => {
            navigation(RoutePath.dashboard);
          }, 4000);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  };

  const renderHeaderTitle = (strTitle) => {
    return <h4>{strTitle}</h4>;
  };

  const renderAlertMessage = () => {
    return (
      <AlertMessage
        isSuccess={isSuccessAlert}
        message={alertMessage}
        onHideAlert={() => setAlertMessage("")}
        styles="login-alert-box"
      />
    );
  };

  return (
    <div>
      <h3>Create New Client</h3>
      <div className="div-create-client-inner">
        <Row>
          <Col xxl={4} lg={4} sm={12}>
            {renderHeaderTitle("User Info")}
            {renderInputField()}
          </Col>
          <Col xxl={4} lg={4} sm={12}>
            {renderHeaderTitle("Admin User Info")}
            {renderAdminUserInputField()}
          </Col>
          <Col xxl={4} lg={4} sm={12}>
            {renderHeaderTitle("Admin Entity Info")}
            {renderAdminEntityInputField()}
          </Col>
        </Row>
        {renderAlertMessage()}
        {!isLoading && (
          <CommonButton
            onClickedButton={btnSubmitClicked}
            title="Submit"
            styles="btn-create-submit"
          />
        )}
        {isLoading && (
          <CommonSpinner styles="btn-spinner" isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
