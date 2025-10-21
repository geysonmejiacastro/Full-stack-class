import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>URL</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

const TableBody = ({ linkData = [], removeLink }) => {
  const rows = linkData.map((row, index) => (
    <tr key={index}>
      <td>{row.name}</td>
      <td>
        <a href={row.URL} target="_blank" rel="noreferrer">
          {row.URL}
        </a>
      </td>
      <td>
        <button onClick={() => removeLink(index)}>Delete</button>
      </td>
    </tr>
  ));
  return <tbody>{rows}</tbody>;
};

function Table({ linkData, removeLink }) {
  return (
    <table>
      <TableHeader />
      <TableBody linkData={linkData} removeLink={removeLink} />
    </table>
  );
}

export default Table;
