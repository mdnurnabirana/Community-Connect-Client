import { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const ManageUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const dt = useRef(null);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosSecure.get("/users")).data,
  });

  const roleMutation = useMutation({
    mutationFn: ({ id, role }) =>
      axiosSecure.patch(`/users/${id}/role`, { role }),

    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("Role updated successfully!");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  const header = (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
      <h2 className="text-2xl font-extrabold text-neutral tracking-tight">
        Manage Users
      </h2>

      <InputText
        placeholder="Search users..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="w-full md:w-72 px-4 py-2 rounded-lg border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary transition"
      />
    </div>
  );

  const roleEditor = (row) => {
    const isSelf = row.email === user?.email;

    return (
      <select
        defaultValue={row.role}
        disabled={isSelf && row.role === "admin"}
        className="w-full max-w-[140px] px-3 py-2 rounded-lg bg-base-100 border border-base-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary transition"
        onChange={(e) =>
          roleMutation.mutate({ id: row._id, role: e.target.value })
        }
      >
        <option value="member">Member</option>
        <option value="manager" disabled={isSelf}>
          Manager
        </option>
        <option value="admin">Admin</option>
      </select>
    );
  };

  const dateTemplate = (row) => (
    <span className="text-sm font-medium text-neutral whitespace-nowrap">
      {new Date(row.createdAt).toLocaleString()}
    </span>
  );

  return (
    <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-5 md:p-7">
      <DataTable
        ref={dt}
        value={users}
        dataKey="_id"
        paginator
        rows={10}
        globalFilter={globalFilter}
        header={header}
        className="text-neutral"
        rowClassName={(_, i) =>
          i % 2 === 0 ? "bg-base-100" : "bg-base-200"
        }
        stripedRows
        showGridlines
      >
        <Column
          field="name"
          header="Name"
          sortable
          headerClassName="text-neutral font-bold px-5 py-4"
          bodyClassName="px-5 py-4 font-medium"
        />
        <Column
          field="email"
          header="Email"
          sortable
          headerClassName="text-neutral font-bold px-5 py-4"
          bodyClassName="px-5 py-4 text-sm break-all"
        />
        <Column
          header="Role"
          body={roleEditor}
          headerClassName="text-neutral font-bold px-5 py-4"
          bodyClassName="px-5 py-4"
        />
        <Column
          header="Created At"
          body={dateTemplate}
          sortable
          headerClassName="text-neutral font-bold px-5 py-4"
          bodyClassName="px-5 py-4 text-sm"
        />
      </DataTable>
    </div>
  );
};

export default ManageUser;