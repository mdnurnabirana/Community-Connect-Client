import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { motion } from "motion/react";

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
    const styles = {
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      pending: "bg-yellow-100 text-yellow-700",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          styles[status] || styles.pending
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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
    <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-4 md:p-6">
      <title>CC - Manage Club</title>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-extrabold text-neutral">Manage Clubs</h2>

        <input
          type="text"
          placeholder="Search clubs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-neutral w-full md:w-72 px-4 py-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
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
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No clubs found
                </td>
              </tr>
            ) : (
              filteredClubs.map((club, index) => (
                <motion.tr
                  key={club._id}
                  className={index % 2 === 0 ? "bg-base-100" : "bg-base-200"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="p-3 border-b font-medium">{club.clubName}</td>
                  <td className="p-3 border-b">{club.category}</td>
                  <td className="p-3 border-b">{club.location}</td>
                  <td className="p-3 border-b">
                    {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
                  </td>
                  <td className="p-3 border-b">{statusBadge(club.status)}</td>
                  <td className="p-3 border-b text-sm">
                    {new Date(club.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b">
                    <div className="flex gap-4">
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
                          if (result.isConfirmed) deleteMutation.mutate(club._id);
                        }}
                      >
                        <FiTrash2 size={18} />
                      </button>

                      <Link
                        to={`/dashboard/manageclubuser/${club._id}`}
                        className="text-primary hover:text-accent"
                      >
                        <FiEye size={18} />
                      </Link>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredClubs.length === 0 ? (
          <p className="text-center text-gray-500">No clubs found</p>
        ) : (
          filteredClubs.map((club, index) => (
            <motion.div
              key={club._id}
              className="bg-base-100 border border-base-300 rounded-lg p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <h3 className="font-bold text-lg">{club.clubName}</h3>
              <p className="text-sm text-neutral/70">{club.category}</p>

              <div className="mt-3 space-y-1 text-sm">
                <p>
                  <strong>Location:</strong> {club.location}
                </p>
                <p>
                  <strong>Fee:</strong>{" "}
                  {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
                </p>
                <p>
                  <strong>Status:</strong> {statusBadge(club.status)}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(club.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-6 mt-4">
                <Link
                  to={`/dashboard/manage-club/${club._id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FiEdit size={20} />
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
                      confirmButtonText: "Delete",
                    });
                    if (result.isConfirmed) deleteMutation.mutate(club._id);
                  }}
                >
                  <FiTrash2 size={20} />
                </button>

                <Link
                  to={`/dashboard/manageclubuser/${club._id}`}
                  className="text-primary hover:text-accent"
                >
                  <FiEye size={20} />
                </Link>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageClub;