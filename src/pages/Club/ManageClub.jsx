import { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading";
import toast from "react-hot-toast";

const ManageClub = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const dt = useRef(null);
  const [globalFilter, setGlobalFilter] = useState("");

  // Fetch clubs
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => (await axiosSecure.get("/clubs")).data,
  });

  // Delete club mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/clubs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["clubs"]);
      toast.success("Club deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete club");
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
        Manage Clubs
      </h2>

      <InputText
        placeholder="Search clubs..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="w-full md:w-72 px-4 py-2 rounded-lg border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary transition"
      />
    </div>
  );

  // Actions column (Edit & Delete)
  const actionBodyTemplate = (row) => (
    <div className="flex gap-3">
      <button
        className="text-blue-500 hover:text-blue-700"
        onClick={() => toast("Edit functionality not implemented yet")}
      >
        <FiEdit size={18} />
      </button>

      <button
        className="text-red-500 hover:text-red-700"
        onClick={async () => {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#F43F5E",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it!",
          });

          if (result.isConfirmed) {
            deleteMutation.mutate(row._id);
          }
        }}
      >
        <FiTrash2 size={18} />
      </button>
    </div>
  );

  const dateTemplate = (row) => (
    <span className="text-sm font-medium text-neutral whitespace-nowrap">
      {new Date(row.createdAt).toLocaleString()}
    </span>
  );

  return (
    <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-5 md:p-7">
      <DataTable
        ref={dt}
        value={clubs}
        dataKey="_id"
        paginator
        rows={10}
        globalFilter={globalFilter}
        header={header}
        className="text-neutral"
        rowClassName={(_, i) => (i % 2 === 0 ? "bg-base-100" : "bg-base-200")}
        stripedRows
        showGridlines
      >
        <Column
          field="clubName"
          header="Club Name"
          sortable
          headerClassName="text-neutral font-bold px-5 py-4"
          bodyClassName="px-5 py-4 font-medium"
        />
        <Column
          field="category"
          header="Category"
          sortable
          headerClassName="text-neutral font-bold px-5 py-4"
          bodyClassName="px-5 py-4 text-sm"
        />
        <Column
          field="location"
          header="Location"
          sortable
          headerClassName="text-neutral font-bold px-5 py-4"
          bodyClassName="px-5 py-4 text-sm"
        />
        <Column
          field="membershipFee"
          header="Fee"
          sortable
          headerClassName="text-neutral font-bold px-5 py-4"
          bodyClassName="px-5 py-4 text-sm"
          body={(row) => (row.membershipFee === 0 ? "Free" : `$${row.membershipFee}`)}
        />
        <Column
          header="Created At"
          body={dateTemplate}
          sortable
          headerClassName="text-neutral font-bold px-5 py-4"
          bodyClassName="px-5 py-4 text-sm"
        />
        <Column
          header="Actions"
          body={actionBodyTemplate}
          headerClassName="text-neutral font-bold px-5 py-4"
          bodyClassName="px-5 py-4"
        />
      </DataTable>
    </div>
  );
};

export default ManageClub;