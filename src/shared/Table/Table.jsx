import TableRow from "./TableRow";

const Table = ({ columns = [], data = [], onRowAction }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Header */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>

            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}

            <th></th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              row={row}
              columns={columns}
              onRowAction={onRowAction}
            />
          ))}
        </tbody>

        {/* Footer */}
        <tfoot>
          <tr>
            <th></th>
            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
