import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";

const EventMember = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

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

  return (
    <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-5 md:p-7">
      <h2 className="text-2xl font-extrabold text-neutral mb-6">
        Event Registrations
      </h2>

      <div className="overflow-x-auto">
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
            {registrations.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No registrations yet
                </td>
              </tr>
            ) : (
              registrations.map((reg, index) => (
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
    </div>
  );
};

export default EventMember;