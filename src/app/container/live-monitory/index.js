import React, { useState } from "react";
import { CommonButton, CommonDropDown } from "../../components/common";
import LiveMonitoryTable from "../../components/live-monitory/monitiry-table";

function LiveMonitory() {
  const [selectedAsset, setSelectedAsset] = useState("--ALL--");
  const [selectedArea, setSelectedArea] = useState("--ALL--");
  const [selectedGGS, setSelectedGGS] = useState("--ALL--");

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
  return (
    <div>
      <h1>Live Monitory</h1>
      {renderLocationDropdown()}
      <LiveMonitoryTable />
    </div>
  );
}

export default LiveMonitory;
