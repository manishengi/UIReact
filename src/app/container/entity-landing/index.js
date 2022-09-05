import React, { useState, lazy } from "react";
import { useNavigate } from "react-router";
import { CommonButton, CommonDropDown } from "../../components/common";
import { RoutePath } from "../../routes/route-path";
import HeaderBtnList from "./entity-header-btn.json";

/**
 * components
 * @returns
 */
const EntityListTable = lazy(() =>
  import("../../components/entity-landing/entity-table")
);

function EntryLanding() {
  const [selectedAsset, setSelectedAsset] = useState("--ALL--");
  const [selectedArea, setSelectedArea] = useState("--ALL--");
  const [selectedGGS, setSelectedGGS] = useState("--ALL--");

  const navigation = useNavigate();

  const renderAssetDropdown = () => {
    return (
      <div>
        <label>Asset</label>
        <CommonDropDown
          listItem={[
            { name: "mumbai", id: "1" },
            { name: "gujarat", id: "2" },
          ]}
          kItemName="name"
          kItemId="id"
          placeholder="--ALL--"
          selectedItem={selectedAsset}
          onSelectItem={(e) => setSelectedAsset(e)}
        />
      </div>
    );
  };

  const renderAreaDropdown = () => {
    return (
      <div>
        <label>Area</label>
        <CommonDropDown
          listItem={[
            { name: "Ahmedabad", id: "1" },
            { name: "Gandhinagar", id: "2" },
          ]}
          kItemName="name"
          kItemId="id"
          placeholder="--ALL--"
          selectedItem={selectedArea}
          onSelectItem={(e) => setSelectedArea(e)}
        />
      </div>
    );
  };

  const renderGGSDropdown = () => {
    return (
      <div>
        <label>GGS</label>
        <CommonDropDown
          listItem={[
            { name: "Kudasan", id: "1" },
            { name: "Sargasan", id: "2" },
            { name: "Sector-10", id: "3" },
          ]}
          kItemName="name"
          kItemId="id"
          placeholder="--ALL--"
          selectedItem={selectedGGS}
          onSelectItem={(e) => setSelectedGGS(e)}
        />
      </div>
    );
  };

  const renderLocationDropdown = () => {
    return (
      <div className="div-dropdown">
        {renderAssetDropdown()}
        {renderAreaDropdown()}
        {renderGGSDropdown()}
        <CommonButton title="Go" styles="btn-go" />
      </div>
    );
  };

  const renderHeaderButton = () => {
    return (
      <div className="div-header-entity">
        {HeaderBtnList.map((item) => (
          <CommonButton title={item.name} styles="btn-header-entity" />
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderHeaderButton()}
      <h4>Entity Management</h4>
      <CommonButton
        title="Create Entity"
        onClickedButton={() => navigation(RoutePath.entityGroupCreation)}
      />
      {renderLocationDropdown()}
      <EntityListTable />
    </div>
  );
}

export default EntryLanding;
