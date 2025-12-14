import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";

const ManageEvent = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["manager-events"],
    queryFn: async () => (await axiosSecure.get("/manager/events")).data,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/events/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["manager-events"]);
      toast.success("Event deleted successfully!");
    },
    onError: () => toast.error("Failed to delete event"),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  const filteredEvents = events.filter(
    (event) =>
      event.title?.toLowerCase().includes(search.toLowerCase()) ||
      event.clubName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F43F5E",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) deleteMutation.mutate(id);
  };

  return (
    <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-5 md:p-7">
      <title>CC - Manage Event</title>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <h2 className="text-2xl font-extrabold text-neutral">Manage Events</h2>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 px-4 py-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-base-300 rounded-lg">
          <thead className="bg-base-200">
            <tr>
              <th className="p-3 text-left border-b">Event Title</th>
              <th className="p-3 text-left border-b">Club</th>
              <th className="p-3 text-left border-b">Date</th>
              <th className="p-3 text-left border-b">Location</th>
              <th className="p-3 text-left border-b">Fee</th>
              <th className="p-3 text-left border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No events found
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event, index) => (
                  <motion.tr
                    key={event._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={index % 2 === 0 ? "bg-base-100" : "bg-base-200"}
                  >
                    <td className="p-3 border-b font-medium">{event.title}</td>
                    <td className="p-3 border-b">{event.clubName}</td>
                    <td className="p-3 border-b">
                      {new Date(event.eventDate).toLocaleDateString()}
                    </td>
                    <td className="p-3 border-b">{event.location}</td>
                    <td className="p-3 border-b">
                      {event.isPaid ? `$${event.eventFee}` : "Free"}
                    </td>
                    <td className="p-3 border-b">
                      <div className="flex gap-3">
                        <Link
                          to={`/dashboard/event/${event._id}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FiEdit size={18} />
                        </Link>

                        <Link
                          to={`/dashboard/event-registration/${event._id}`}
                          className="text-primary hover:text-accent"
                        >
                          <FiEye size={18} />
                        </Link>

                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(event._id)}
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        <AnimatePresence>
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="border border-base-300 rounded-xl p-4 bg-base-200 shadow-sm"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold">{event.title}</h3>
                <span className="text-sm text-primary font-semibold">
                  {event.isPaid ? `$${event.eventFee}` : "Free"}
                </span>
              </div>

              <p>
                <span className="font-medium">Club:</span> {event.clubName}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(event.eventDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Location:</span> {event.location}
              </p>

              <div className="flex justify-end gap-4 mt-4">
                <Link
                  to={`/dashboard/event/${event._id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FiEdit size={20} />
                </Link>

                <Link
                  to={`/dashboard/event-registration/${event._id}`}
                  className="text-primary hover:text-accent"
                >
                  <FiEye size={20} />
                </Link>

                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(event._id)}
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ManageEvent;