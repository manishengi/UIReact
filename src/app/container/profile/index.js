import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionLogout } from "../../store/reducer/login-reducer";

function Profile() {
  const { loginInfo, isLogin } = useSelector((state) => state.rLogin);
  const dispatch = useDispatch();

  function btnLogoutClicked() {
    dispatch(actionLogout());
    window.location.reload();
  }

  const renderLoginInfo = () => {
    if (isLogin) {
      return (
        <div>
          <p>{`${loginInfo.user.firstName} ${loginInfo.user.lastName}`}</p>
          <p>{`${loginInfo.user.email}`}</p>
          <p>{`${loginInfo.user.type}`}</p>
          <button onClick={btnLogoutClicked}>Logout</button>
        </div>
      );
    }
  };

  return (
    <div className="div-profile">
      <h1>Profile</h1>
      {renderLoginInfo()}
    </div>
  );
}

export default Profile;
