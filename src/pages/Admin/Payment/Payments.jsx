import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";

const Payments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payments");
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
        All Payments / Transactions
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-base-300 rounded-lg">
          <thead className="bg-base-200">
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
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No payments recorded
                </td>
              </tr>
            ) : (
              payments.map((p, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-base-100" : "bg-base-200"}>
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
  );
};

export default Payments;