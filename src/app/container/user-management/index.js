/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ApiClient } from "../../api";
import { CommonButton, CommonDropDown } from "../../components/common";
import TopButtonSuperAdmin from "../../components/super-admin/common-top-button";
import { UserManagementPresenter } from "./user-mng-presenter";

const ExistingAdminDetails = lazy(() =>
  import("../../components/user-management/existing-admin-details")
);

export default function UserManagement() {
  //state declaration
  const [selectedClient, setSelectedClient] = useState("--Select--");
  const [listClients, setListClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listUser, setListUser] = useState([]);

  //navigation
  const navigate = useNavigate();

  //use selector
  const { loginInfo } = useSelector((state) => state.rLogin);

  useEffect(() => {
    apiCallForGetClientList();
  }, []);

  useEffect(() => {
    if (
      Object.keys(selectedClient).length > 0 &&
      selectedClient !== "--Select--"
    ) {
      apiCallForGetClientDetails();
    }
  }, [selectedClient]);

  /**
   * Get client details base on client id
   */
  const apiCallForGetClientDetails = () => {
    setIsLoading(true);
    ApiClient()
      .apiCallForGetClientDetails(selectedClient.id, loginInfo.token.idToken)
      .then((response) => {
        setIsLoading(false);
        const userList =
          response.client &&
          response.client.users &&
          response.client.users !== null
            ? response.client.users
            : [];
        setListUser(userList);
      })
      .catch((err) => {
        setIsLoading(false);
        setListUser([]);
      });
  };

  /**
   * get client list
   */
  const apiCallForGetClientList = () => {
    ApiClient()
      .apiCallForGetClientList(loginInfo.token.idToken)
      .then((res) => {
        setIsLoading(false);
        if (res.length > 0) {
          setSelectedClient(res[0]);
          const listData = UserManagementPresenter().listOfClientDropdown(res);
          setListClients((preview) => (preview = listData));
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const renderTopButton = () => {
    return <TopButtonSuperAdmin navigate={navigate} />;
  };

  /**
   * client list show in dropdown
   * @returns
   */
  const renderClientDropdown = () => {
    if (listClients.length > 0) {
      return (
        <CommonDropDown
          listItem={listClients}
          kItemName="name"
          kItemId="id"
          placeholder="--Select--"
          selectedItem={selectedClient}
          onSelectItem={(e) => {
            setSelectedClient(e);
          }}
        />
      );
    }
  };

  /**
   * main
   */
  return (
    <div>
      <h4>Existing Client Admin Details</h4>
      <div>
        {renderTopButton()}
        <p>select Client Name</p>
        {renderClientDropdown()}
      </div>
      <div>
        <CommonButton styles="btn-create-client" title="Reset Password" />
        <CommonButton styles="btn-create-client" title="Delete" />
        <CommonButton styles="btn-create-client" title="Create New Admin" />
      </div>
      <ExistingAdminDetails listUser={listUser} isLoading={isLoading} />
    </div>
  );
}
