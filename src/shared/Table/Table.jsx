import { useState, useMemo } from "react";
import TableRow from "./TableRow";

const Table = ({ columns = [], data = [], onRowAction }) => {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [selectedRows, setSelectedRows] = useState([]);

  // Search/filter data
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      columns.some((col) => 
        String(row[col.key]).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return -1;
      if (a[sortConfig.key] > b[sortConfig.key]) return 1;
      return 0;
    });
    return sortConfig.direction === "desc" ? sorted.reverse() : sorted;
  }, [filteredData, sortConfig]);

  const toggleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === data.length) setSelectedRows([]);
    else setSelectedRows(data.map((row) => row.id));
  };

  const toggleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full p-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedRows.length === data.length}
                  onChange={toggleSelectAll}
                />
              </th>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="cursor-pointer"
                  onClick={() => toggleSort(col.key)}
                >
                  {col.label}{" "}
                  {sortConfig.key === col.key
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <TableRow
                key={row.id}
                row={row}
                columns={columns}
                onRowAction={onRowAction}
                isSelected={selectedRows.includes(row.id)}
                toggleSelectRow={toggleSelectRow}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;