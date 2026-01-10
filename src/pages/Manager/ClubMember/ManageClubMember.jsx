import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import { useParams } from "react-router";
import { MdBlock } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

const ManageClubMember = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["club-members", id],
    queryFn: async () => (await axiosSecure.get(`/club-members/${id}`)).data,
  });

  const expireMutation = useMutation({
    mutationFn: (memberId) => axiosSecure.patch(`/expire-member/${memberId}`),
    onSuccess: () => {
      toast.success("Member expired");
      queryClient.invalidateQueries(["club-members", id]);
    },
    onError: () => {
      toast.error("Failed to expire member");
    },
  });

  const handleExpire = (memberId) => {
    expireMutation.mutate(memberId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  const filteredMembers = members.filter((m) =>
    m.userEmail?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-4 md:p-6">
      <title>CC - Manage Club Member</title>

      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-neutral text-2xl font-extrabold">
          Club Members
        </h2>

        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-neutral w-full md:w-72 px-4 py-2 rounded-lg border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-base-300 rounded-lg">
          <thead className="bg-base-200 text-neutral">
            <tr>
              <th className="p-3 text-left border-b">Email</th>
              <th className="p-3 text-left border-b">Status</th>
              <th className="p-3 text-left border-b">Joined</th>
              <th className="p-3 text-left border-b">Expires</th>
              <th className="p-3 text-left border-b">Action</th>
            </tr>
          </thead>

          <tbody className="text-neutral">
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-neutral/90">
                  No members found
                </td>
              </tr>
            ) : (
              <AnimatePresence>
                {filteredMembers.map((m, index) => (
                  <motion.tr
                    key={m._id}
                    className={
                      index % 2 === 0
                        ? "bg-base-100"
                        : "bg-base-200"
                    }
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.25, delay: index * 0.05 }}
                  >
                    <td className="p-3 border-b font-medium">
                      {m.userEmail}
                    </td>

                    <td className="p-3 border-b">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${
                          m.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {m.status === "active" ? (
                          <FaCheckCircle />
                        ) : (
                          <MdBlock />
                        )}
                        {m.status}
                      </span>
                    </td>

                    <td className="p-3 border-b text-sm">
                      {new Date(m.joinedAt).toLocaleDateString()}
                    </td>

                    <td className="p-3 border-b text-sm">
                      {m.expiresAt
                        ? new Date(m.expiresAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="p-3 border-b">
                      {m.status === "active" ? (
                        <button
                          onClick={() => handleExpire(m._id)}
                          className="btn btn-xs btn-error flex items-center gap-1"
                        >
                          <MdBlock />
                          Expire
                        </button>
                      ) : (
                        <span className="text-xs text-error italic">
                          Already expired
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClubMember;