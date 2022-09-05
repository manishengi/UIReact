import React from "react";
import { Table } from "react-bootstrap";
import ColumnsList from "./live-monitory-columns.json";

export default function LiveMonitoryTable(props) {
  const renderTableColumns = () => {
    return ColumnsList.map((item, index) => (
      <th style={{ fontSize: "10px" }} key={index}>
        {item}
      </th>
    ));
  };

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>{renderTableColumns()}</tr>
        </thead>
      </Table>
    </div>
  );
}
