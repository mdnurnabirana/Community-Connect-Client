import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import Container from "../../../shared/Container";

const MyPayments = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["my-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-payments");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const filteredPayments = payments.filter(
    (p) =>
      p.type?.toLowerCase().includes(search.toLowerCase()) ||
      p.clubName?.toLowerCase().includes(search.toLowerCase()) ||
      p.eventName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <title>CC - My Payment History</title>
      <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-5 md:p-7 mt-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral">
            Payment History
          </h1>

          <input
            type="text"
            placeholder="Search payments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {filteredPayments.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No payments found.</p>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border border-base-300 rounded-lg">
                <thead className="bg-base-200">
                  <tr>
                    <th className="p-3 text-left border-b">#</th>
                    <th className="p-3 text-left border-b">Amount</th>
                    <th className="p-3 text-left border-b">Type</th>
                    <th className="p-3 text-left border-b">Club / Event</th>
                    <th className="p-3 text-left border-b">Date</th>
                    <th className="p-3 text-left border-b">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPayments.map((p, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-base-100" : "bg-base-200"}
                    >
                      <td className="p-3 border-b">{i + 1}</td>
                      <td className="p-3 border-b font-medium">${p.amount}</td>
                      <td className="p-3 border-b capitalize">{p.type}</td>
                      <td className="p-3 border-b">
                        {p.clubName || p.eventName || "-"}
                      </td>
                      <td className="p-3 border-b text-sm">
                        {new Date(p.createdAt || p.date).toLocaleDateString()}
                      </td>
                      <td className="p-3 border-b">
                        <PaymentStatus status={p.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {filteredPayments.map((p, i) => (
                <div
                  key={i}
                  className="bg-base-200 border border-base-300 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-lg">${p.amount}</p>
                    <PaymentStatus status={p.status} />
                  </div>

                  <p className="text-sm text-gray-600 mb-1 capitalize">
                    Type: {p.type}
                  </p>

                  <p className="text-sm text-gray-600 mb-1">
                    {p.clubName || p.eventName || "-"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(p.createdAt || p.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

const PaymentStatus = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        status === "completed"
          ? "bg-green-100 text-green-700"
          : status === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status}
    </span>
  );
};

export default MyPayments;
