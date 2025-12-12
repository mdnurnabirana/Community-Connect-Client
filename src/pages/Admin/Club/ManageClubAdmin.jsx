import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import toast from "react-hot-toast";

const ManageClubAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["admin-clubs"],
    queryFn: async () => (await axiosSecure.get("/admin/clubs")).data,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/admin/clubs/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-clubs"]);
      toast.success("Status updated!");
    },
    onError: () => toast.error("Failed to update status"),
  });

  const fetchStats = async () => {
    toast.success("Stats button clicked");
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

  const handleStatusChange = async (id, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to mark this club as ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}!`,
    });

    if (result.isConfirmed) {
      statusMutation.mutate({ id, status });
    }
  };

  return (
    <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-5 md:p-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <h2 className="text-2xl font-extrabold text-neutral">All Clubs</h2>
        <input
          type="text"
          placeholder="Search clubs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 px-4 py-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Desktop / Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-base-300 rounded-lg">
          <thead className="bg-base-200">
            <tr>
              <th className="p-3 text-left border-b">Club Name</th>
              <th className="p-3 text-left border-b">Manager Email</th>
              <th className="p-3 text-left border-b">Status</th>
              <th className="p-3 text-left border-b">Fee</th>
              <th className="p-3 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClubs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No clubs found
                </td>
              </tr>
            ) : (
              filteredClubs.map((club, index) => (
                <tr key={club._id} className={index % 2 === 0 ? "bg-base-100" : "bg-base-200"}>
                  <td className="p-3 border-b font-medium">{club.clubName}</td>
                  <td className="p-3 border-b">{club.managerEmail}</td>
                  <td className="p-3 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        club.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : club.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {club.status}
                    </span>
                  </td>
                  <td className="p-3 border-b">{club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}</td>
                  <td className="p-3 border-b text-center">
                    <div className="flex gap-2 justify-center flex-wrap">
                      {club.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(club._id, "approved")}
                            className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(club._id, "rejected")}
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => fetchStats()}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                      >
                        View Stats
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredClubs.length === 0 ? (
          <p className="text-center text-gray-500 py-6">No clubs found</p>
        ) : (
          filteredClubs.map((club) => (
            <div key={club._id} className="p-4 rounded-xl border border-base-300 shadow-sm">
              <p className="font-semibold">{club.clubName}</p>
              <p className="text-sm text-neutral mt-1">Manager: {club.managerEmail}</p>
              <p className="text-sm mt-1">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    club.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : club.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {club.status}
                </span>
              </p>
              <p className="text-sm mt-1">
                Fee: {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
              </p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {club.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(club._id, "approved")}
                      className="px-3 py-1 bg-green-500 text-white rounded text-sm flex-1"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(club._id, "rejected")}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm flex-1"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => fetchStats()}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm flex-1"
                >
                  View Stats
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageClubAdmin;