import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const dt = useRef(null);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users"); 
      return result.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  const createdAtBodyTemplate = (row) => (
    <span className="text-neutral">{new Date(row.createdAt).toLocaleString()}</span>
  );

  const actionBodyTemplate = (row) => (
    <button
      className="bg-primary hover:bg-primary/80 text-white px-3 py-1 rounded text-sm"
      onClick={() => console.log("User details:", row)}
    >
      Details
    </button>
  );

  const roleBodyTemplate = (row) => {
    const roleColors = {
      admin: "bg-primary",
      user: "bg-secondary",
      manager: "bg-accent",
    };
    const colorClass = roleColors[row.role?.toLowerCase()] || "bg-base-300";
    return (
      <span className={`${colorClass} text-neutral px-2 py-1 rounded text-sm`}>
        {row.role}
      </span>
    );
  };

  const header = (
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-2xl font-bold text-neutral">Manage Users</h2>
      <span className="p-input-icon-left">
        <i className="pi pi-search text-neutral" />
        <InputText
          type="search"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search users..."
          className="p-2 rounded border border-base-300 bg-base-100 text-neutral"
        />
      </span>
    </div>
  );

  return (
    <div className="p-4 bg-base-100 rounded-lg shadow-xl">
      <DataTable
        ref={dt}
        value={users}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
        globalFilter={globalFilter}
        header={header}
        responsiveLayout="scroll"
        className="text-neutral"
        rowClassName={(rowData) =>
          rowData.role?.toLowerCase() === "admin" ? "bg-base-200" : "bg-base-300"
        }
      >
        <Column field="name" header="Name" sortable className="px-4 py-2"></Column>
        <Column field="email" header="Email" sortable className="px-4 py-2"></Column>
        <Column field="role" header="Role" body={roleBodyTemplate} sortable className="px-4 py-2"></Column>
        <Column field="createdAt" header="Created At" body={createdAtBodyTemplate} sortable className="px-4 py-2"></Column>
        <Column body={actionBodyTemplate} header="Actions" className="px-4 py-2"></Column>
      </DataTable>
    </div>
  );
};

export default ManageUser;