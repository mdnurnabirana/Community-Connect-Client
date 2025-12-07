const TableRow = ({ row, columns, onRowAction }) => {
  return (
    <tr>
      {/* Checkbox */}
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>

      {/* Dynamic cells */}
      {columns.map((col, index) => (
        <td key={index}>
          {col.render ? col.render(row) : row[col.key]}
        </td>
      ))}

      {/* Action button */}
      <th>
        <button
          className="btn btn-ghost btn-xs"
          onClick={() => onRowAction?.(row)}
        >
          details
        </button>
      </th>
    </tr>
  );
};

export default TableRow;