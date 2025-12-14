import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";

const Payments = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payments");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loading />
      </div>
    );
  }

  const filteredPayments = payments.filter((p) => {
    const query = search.toLowerCase();
    return (
      p.userEmail?.toLowerCase().includes(query) ||
      p.clubName?.toLowerCase().includes(query) ||
      p.type?.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <title>Admin - Payment History</title>
      <div className="p-4 md:p-6 lg:p-8 bg-base-100 rounded-xl shadow border border-base-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold">
            All Payments / Transactions
          </h2>

          <input
            type="text"
            placeholder="Search by user, club or type"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-2 rounded-lg border border-base-300 
          focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="md:hidden flex flex-col gap-4">
          {filteredPayments.length === 0 ? (
            <p className="text-center text-gray-500 py-6">
              No transactions found
            </p>
          ) : (
            filteredPayments.map((p, i) => (
              <div
                key={i}
                className="p-4 border border-base-300 rounded-lg bg-base-100 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg">#{i + 1}</span>
                  <span className="text-sm font-medium capitalize">
                    {p.type}
                  </span>
                </div>

                <p className="text-sm">
                  <span className="font-semibold">User:</span> {p.userEmail}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">Amount:</span> ${p.amount}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">Club:</span>{" "}
                  {p.clubName || "-"}
                </p>

                <p className="text-xs text-gray-500 mt-3">
                  {new Date(p.date).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="hidden md:block overflow-x-auto mt-4">
          <table className="w-full border border-base-300 rounded-lg">
            <thead className="bg-base-200 sticky top-0 z-10">
              <tr>
                <th className="p-3 text-left border-b">#</th>
                <th className="p-3 text-left border-b">User Email</th>
                <th className="p-3 text-left border-b">Amount</th>
                <th className="p-3 text-left border-b">Type</th>
                <th className="p-3 text-left border-b">Club</th>
                <th className="p-3 text-left border-b">Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-base-100" : "bg-base-200"}
                  >
                    <td className="p-3 border-b">{i + 1}</td>
                    <td className="p-3 border-b">{p.userEmail}</td>
                    <td className="p-3 border-b">${p.amount}</td>
                    <td className="p-3 border-b capitalize">{p.type}</td>
                    <td className="p-3 border-b">{p.clubName || "-"}</td>
                    <td className="p-3 border-b">
                      {new Date(p.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Payments;