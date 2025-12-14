import { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";

const EventMember = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: registrations = [], isLoading } = useQuery({
    queryKey: ["event-registrations", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager/events/${id}/registrations`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  const filteredRegs = registrations.filter((reg) =>
    reg.userEmail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-5 md:p-7">
      <title>CC - Event Members</title>
      <h2 className="text-2xl font-extrabold text-neutral mb-6">
        Event Registrations
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by user email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 px-4 py-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-base-300 rounded-lg">
          <thead className="bg-base-200">
            <tr>
              <th className="p-3 text-left border-b">#</th>
              <th className="p-3 text-left border-b">User Email</th>
              <th className="p-3 text-left border-b">Status</th>
              <th className="p-3 text-left border-b">Registered At</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No registrations found
                </td>
              </tr>
            ) : (
              filteredRegs.map((reg, index) => (
                <tr
                  key={reg._id}
                  className={index % 2 === 0 ? "bg-base-100" : "bg-base-200"}
                >
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{reg.userEmail}</td>
                  <td className="p-3 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        reg.status === "registered"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {reg.status}
                    </span>
                  </td>
                  <td className="p-3 border-b text-sm">
                    {new Date(reg.registeredAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredRegs.length === 0 ? (
          <p className="text-center text-gray-500">No registrations found</p>
        ) : (
          filteredRegs.map((reg, index) => (
            <div
              key={reg._id}
              className="border border-base-300 rounded-xl p-4 bg-base-200 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-neutral">#{index + 1}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    reg.status === "registered"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {reg.status}
                </span>
              </div>

              <p className="mb-1">
                <span className="font-medium">User Email:</span> {reg.userEmail}
              </p>
              <p>
                <span className="font-medium">Registered At:</span>{" "}
                {new Date(reg.registeredAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventMember;