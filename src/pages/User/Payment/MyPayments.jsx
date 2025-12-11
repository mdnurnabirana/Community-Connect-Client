import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import Container from "../../../shared/Container";

const MyPayments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["my-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-payments");
      return res.data;
    },
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loading /></div>;

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6 mt-10">💳 Payment History</h1>

      {payments.length === 0 ? (
        <p className="text-gray-500 text-center mt-12">No payments yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-base-300 rounded-lg">
            <thead className="bg-base-200">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Club / Event</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-base-100" : "bg-base-200"}>
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">${p.amount}</td>
                  <td className="p-3 capitalize">{p.type}</td>
                  <td className="p-3">{p.clubName || p.eventName || "-"}</td>
                  <td className="p-3">{new Date(p.date).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className="px-3 py-1 rounded-lg text-sm bg-green-200 text-green-700">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
};

export default MyPayments;