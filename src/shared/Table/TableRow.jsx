const TableRow = ({ row, columns, onRowAction, isSelected, toggleSelectRow }) => {
  return (
    <tr className={isSelected ? "bg-gray-100" : ""}>
      <th>
        <input
          type="checkbox"
          className="checkbox"
          checked={isSelected}
          onChange={() => toggleSelectRow(row.id)}
        />
      </th>
      {columns.map((col, index) => (
        <td key={index}>
          {col.render ? col.render(row) : row[col.key]}
        </td>
      ))}
      <th>
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => onRowAction?.(row)}
        >
          Details
        </button>
      </th>
    </tr>
  );
};

export default TableRow;