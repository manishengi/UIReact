import React from "react";
import { useNavigate } from "react-router";
import { CommonButton } from "../../components/common";
import { RoutePath } from "../../routes/route-path";

export default function EntityGroupManagement() {
  const navigation = useNavigate();

  const renderUpdateDeleteBtn = () => {
    return (
      <div>
        <CommonButton
          styles="btn-create-client"
          title="Update"
          // onClickedButton={() => navigation(RoutePath.entityGroupCreation)}
        />
        <CommonButton
          styles="btn-create-client"
          title="Delete"
          // onClickedButton={() => navigation(RoutePath.entityGroupCreation)}
        />
      </div>
    );
  };

  return (
    <div>
      <h4>Entity Group Management</h4>
      <CommonButton
        styles="btn-create-client"
        title="Group Creation"
        onClickedButton={() => navigation(RoutePath.entityGroupCreation)}
      />
      {renderUpdateDeleteBtn()}
    </div>
  );
}
