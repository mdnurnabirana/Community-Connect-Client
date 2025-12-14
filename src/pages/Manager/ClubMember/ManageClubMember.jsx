import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import { useParams } from "react-router";
import { MdBlock } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const ManageClubMember = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

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

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <title>CC - Manage Club Member</title>
      <h2 className="text-2xl font-bold mb-6">Club Members</h2>

      {members.length === 0 ? (
        <p className="text-gray-500 text-center">No members found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Expires</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {members.map((m) => (
                <tr key={m._id}>
                  <td>{m.userEmail}</td>

                  {/* Status Badge */}
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 w-fit ${
                        m.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {m.status === "active" ? (
                        <FaCheckCircle className="text-sm" />
                      ) : (
                        <MdBlock className="text-sm" />
                      )}
                      {m.status}
                    </span>
                  </td>

                  <td>{new Date(m.joinedAt).toLocaleDateString()}</td>

                  <td>
                    {m.expiresAt
                      ? new Date(m.expiresAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {/* Action Column */}
                  <td>
                    {m.status === "active" ? (
                      <button
                        onClick={() => handleExpire(m._id)}
                        className="btn btn-xs btn-error flex items-center gap-1"
                      >
                        <MdBlock className="text-sm" />
                        Expire
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        Already expired
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageClubMember;