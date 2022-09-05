import moment from "moment";
import React from "react";
import { Table } from "react-bootstrap";
import { CommonSpinner } from "../../common";
import TableColumnList from "./column-list.json";

export default function ExistingUserDetails(_props) {
  const { listClients, isLoading } = _props;

  /**
   * columns display
   * @returns
   */
  const renderTableColumns = () => {
    return TableColumnList.map((item, index) => (
      <th style={{ fontSize: "10px" }} key={index}>
        {item}
      </th>
    ));
  };

  const renderTableRow = () => {
    return listClients.map((item, index) => (
      <tr key={index}>
        <td>
          <input type={"checkbox"} />
        </td>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.address}</td>
        <td>{moment(item.createdByDate).format("DD MMM, YYYY")}</td>
        <td>
          {item.modifiedByDate !== null
            ? moment(item.modifiedByDate).format("DD MMM, YYYY")
            : "-"}
        </td>
        <td>{item.logo}</td>
        <td>{item.banner}</td>
        <td>{`${item.isActive}`}</td>
      </tr>
    ));
  };

  /**
   * main
   */
  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>{renderTableColumns()}</tr>
        </thead>
        <tbody>{renderTableRow()}</tbody>
      </Table>
      {isLoading && (
        <CommonSpinner styles="client-loader" isLoading={isLoading} />
      )}
    </div>
  );
}
