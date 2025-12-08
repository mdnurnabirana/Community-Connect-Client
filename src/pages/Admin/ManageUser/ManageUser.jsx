import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const ManageUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

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

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-5 md:p-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <h2 className="text-2xl font-extrabold text-neutral">
          Manage Users
        </h2>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 px-4 py-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-base-300 rounded-lg">
          <thead className="bg-base-200">
            <tr>
              <th className="p-3 text-left border-b">Name</th>
              <th className="p-3 text-left border-b">Email</th>
              <th className="p-3 text-left border-b">Role</th>
              <th className="p-3 text-left border-b">Created At</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((row, index) => {
                const isSelf = row.email === user?.email;

                return (
                  <tr
                    key={row._id}
                    className={
                      index % 2 === 0 ? "bg-base-100" : "bg-base-200"
                    }
                  >
                    <td className="p-3 border-b font-medium">
                      {row.name}
                    </td>
                    <td className="p-3 border-b text-sm break-all">
                      {row.email}
                    </td>
                    <td className="p-3 border-b">
                      <select
                        defaultValue={row.role}
                        disabled={isSelf && row.role === "admin"}
                        className="w-full max-w-[140px] px-3 py-2 rounded-lg bg-base-100 border border-base-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                        onChange={(e) =>
                          roleMutation.mutate({
                            id: row._id,
                            role: e.target.value,
                          })
                        }
                      >
                        <option value="member">Member</option>
                        <option value="manager" disabled={isSelf}>
                          Manager
                        </option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="p-3 border-b text-sm">
                      {new Date(row.createdAt).toLocaleString()}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;