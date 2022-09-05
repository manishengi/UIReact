import React, { useState } from "react";
import {
  CommonButton,
  CommonDropDown,
  CommonTextInput,
} from "../../components/common";
import InputFieldList from "./input-field.json";

export default function EntityGroupCreation() {
  const [inputFieldInfo, setInputFieldInfo] = useState(InputFieldList);

  const renderInputField = () => {
    return inputFieldInfo.map((item, index) => (
      <div key={index} className="div-input-create-client">
        <label>{item.label}</label>
        {item.type && item.type === "dropdown" ? (
          <CommonDropDown
            listItem={[
              { name: "Client 1", id: "1" },
              { name: "Client 2", id: "2" },
            ]}
            kItemName="name"
            kItemId="id"
            placeholder="--Select--"
            selectedItem={item.value}
            onSelectItem={(e) => onChangeTextInput(e, index)}
          />
        ) : (
          <CommonTextInput
            placeholdertext={item.lable}
            value={item.value}
            changetextinput={(e) => onChangeTextInput(e, index)}
            id={item.key}
          />
        )}
      </div>
    ));
  };

  const onChangeTextInput = (value, index) => {
    let arrInput = [...inputFieldInfo];
    let info = arrInput[index];
    info.value = value;
    setInputFieldInfo(arrInput);
  };

  return (
    <div className="div-create-client">
      <h4>Entity Group Creation</h4>
      <div className="div-create-client-inner">
        {renderInputField()}
        <CommonButton
          onClickedButton={() => {}}
          title="Submit"
          styles="btn-create-submit"
        />
      </div>
    </div>
  );
}
