import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import { motion } from "motion/react";

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

  const handleStatusSelect = async (club, newStatus) => {
    if (club.status === newStatus) return;

    const result = await Swal.fire({
      title: "Change Club Status?",
      text: `Set status to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    });

    if (result.isConfirmed) {
      statusMutation.mutate({ id: club._id, status: newStatus });
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
    <>
      <title>Admin - Club Management</title>
      <motion.div
        className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-5 md:p-7"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-5">
          <h2 className="text-2xl font-extrabold text-neutral">All Clubs</h2>
          <input
            type="text"
            placeholder="Search clubs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border border-base-300 rounded-lg">
            <thead className="bg-base-200">
              <tr>
                <th className="p-3 text-left border-b">Club</th>
                <th className="p-3 text-left border-b">Manager</th>
                <th className="p-3 text-left border-b">Members</th>
                <th className="p-3 text-left border-b">Events</th>
                <th className="p-3 text-left border-b">Fee</th>
                <th className="p-3 text-left border-b">Status</th>
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
                  <motion.tr
                    key={club._id}
                    className={index % 2 === 0 ? "bg-base-100" : "bg-base-200"}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                  >
                    <td className="p-3 border-b font-medium">{club.clubName}</td>
                    <td className="p-3 border-b">{club.managerEmail}</td>
                    <td className="p-3 border-b font-semibold">{club.membersCount}</td>
                    <td className="p-3 border-b font-semibold">{club.eventsCount}</td>
                    <td className="p-3 border-b">
                      {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
                    </td>
                    <td className="p-3 border-b">
                      <select
                        value={club.status}
                        onChange={(e) => handleStatusSelect(club, e.target.value)}
                        className="px-3 py-2 rounded border border-base-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden flex flex-col gap-4">
          {filteredClubs.map((club, index) => (
            <motion.div
              key={club._id}
              className="p-4 rounded-xl border border-base-300 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            >
              <p className="font-semibold">{club.clubName}</p>
              <p className="text-sm">Manager: {club.managerEmail}</p>
              <p className="text-sm">Members: {club.membersCount}</p>
              <p className="text-sm">Events: {club.eventsCount}</p>
              <p className="text-sm">
                Fee: {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
              </p>

              <select
                value={club.status}
                onChange={(e) => handleStatusSelect(club, e.target.value)}
                className="mt-3 w-full px-3 py-2 rounded border border-base-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default ManageClubAdmin;