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
      <div className="flex justify-center items-center min-h-[60vh]">
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
    <>
      <title>Admin - User Management</title>
      <div className="p-4 md:p-6 lg:p-8 bg-base-100 rounded-xl shadow border border-base-200">
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold">Manage Users</h2>

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 px-3 py-2 rounded-lg border border-base-300 
          focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="md:hidden flex flex-col gap-4">
          {filteredUsers.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No users found</p>
          ) : (
            filteredUsers.map((row) => {
              const isSelf = row.email === user?.email;

              return (
                <div
                  key={row._id}
                  className="p-4 border border-base-300 rounded-lg shadow-sm bg-base-100"
                >
                  <p className="font-semibold text-lg">{row.name}</p>
                  <p className="text-sm text-gray-600 break-all">{row.email}</p>

                  <div className="mt-3">
                    <label className="text-sm font-medium block mb-1">
                      Role
                    </label>
                    <select
                      defaultValue={row.role}
                      disabled={isSelf && row.role === "admin"}
                      className="w-full px-3 py-2 rounded-lg border border-base-300 text-sm 
                    focus:outline-none focus:ring-2 focus:ring-primary"
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
                  </div>

                  <p className="text-xs mt-3 text-gray-500">
                    {new Date(row.createdAt).toLocaleString()}
                  </p>
                </div>
              );
            })
          )}
        </div>

        <div className="hidden md:block overflow-x-auto mt-4">
          <table className="w-full border border-base-300 rounded-lg">
            <thead className="bg-base-200 sticky top-0 z-10">
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
                      <td className="p-3 border-b font-medium">{row.name}</td>

                      <td className="p-3 border-b text-sm break-all">
                        {row.email}
                      </td>

                      <td className="p-3 border-b">
                        <select
                          defaultValue={row.role}
                          disabled={isSelf && row.role === "admin"}
                          className="w-full max-w-[150px] px-3 py-2 rounded-lg border border-base-300 text-sm 
                        focus:outline-none focus:ring-2 focus:ring-primary"
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
    </>
  );
};

export default ManageUser;