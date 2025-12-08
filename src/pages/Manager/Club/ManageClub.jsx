import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router";

const ManageClub = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => (await axiosSecure.get("/manager/clubs")).data,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/manager/clubs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["clubs"]);
      toast.success("Club deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete club");
    },
  });

  const statusBadge = (status) => {
    if (status === "approved") {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
          Approved
        </span>
      );
    } else if (status === "rejected") {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
          Rejected
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
          Pending
        </span>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  const filteredClubs = clubs.filter((club) =>
    club.clubName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-5 md:p-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <h2 className="text-2xl font-extrabold text-neutral">Manage Clubs</h2>

        <input
          type="text"
          placeholder="Search clubs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 px-4 py-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-base-300 rounded-lg">
          <thead className="bg-base-200">
            <tr>
              <th className="p-3 text-left border-b">Club Name</th>
              <th className="p-3 text-left border-b">Category</th>
              <th className="p-3 text-left border-b">Location</th>
              <th className="p-3 text-left border-b">Fee</th>
              <th className="p-3 text-left border-b">Status</th>
              <th className="p-3 text-left border-b">Created At</th>
              <th className="p-3 text-left border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredClubs.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No clubs found
                </td>
              </tr>
            ) : (
              filteredClubs.map((club, index) => (
                <tr
                  key={club._id}
                  className={index % 2 === 0 ? "bg-base-100" : "bg-base-200"}
                >
                  <td className="p-3 border-b font-medium">{club.clubName}</td>
                  <td className="p-3 border-b">{club.category}</td>
                  <td className="p-3 border-b">{club.location}</td>
                  <td className="p-3 border-b">
                    {club.membershipFee === 0
                      ? "Free"
                      : `$${club.membershipFee}`}
                  </td>
                  <td className="p-3 border-b">{statusBadge(club.status)}</td>
                  <td className="p-3 border-b text-sm">
                    {new Date(club.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 border-b">
                    <div className="flex gap-3">
                      <Link
                        to={`/dashboard/manage-club/${club._id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FiEdit size={18} />
                      </Link>

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
                            deleteMutation.mutate(club._id);
                          }
                        }}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClub;