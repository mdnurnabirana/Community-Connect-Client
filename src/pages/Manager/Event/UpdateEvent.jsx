import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import DatePicker from "react-date-picker";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import toast from "react-hot-toast";

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [date, setDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const isPaid = useWatch({
    control,
    name: "isPaid",
  });

  // Fetch the event
  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => (await axiosSecure.get(`/events/${id}`)).data,
  });

  useEffect(() => {
    if (event) {
      reset({
        clubId: event.clubId,
        title: event.title,
        description: event.description,
        location: event.location,
        isPaid: event.isPaid ? "true" : "false",
        eventFee: event.eventFee || "",
        maxAttendees: event.maxAttendees || "",
      });
      setDate(new Date(event.eventDate));
    }
  }, [event, reset]);

  const updateMutation = useMutation({
    mutationFn: async (eventData) => {
      const res = await axiosSecure.patch(`/events/${id}`, eventData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Event updated successfully!");
      queryClient.invalidateQueries(["event", id]);
      navigate("/dashboard/manage-event");
    },
    onError: () => toast.error("Failed to update event"),
  });

  const onSubmit = async (data) => {
    if (!date) return toast.error("Event date is required");

    const updatedEvent = {
      clubId: data.clubId,
      title: data.title,
      description: data.description,
      location: data.location,
      eventDate: date,
      isPaid: data.isPaid === "true",
      eventFee: data.isPaid === "true" ? Number(data.eventFee) : 0,
      maxAttendees: data.maxAttendees ? Number(data.maxAttendees) : null,
    };

    updateMutation.mutate(updatedEvent);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 border border-base-300 rounded-2xl shadow-xl">
      <title>CC - Update Event</title>
      <h2 className="text-neutral text-3xl font-bold mb-6">
        Update Event
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-neutral">
        <div>
          <label className="block mb-1 font-medium">Club</label>
          <input
            type="text"
            value={event.clubName || "Club"}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Event Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Event Title"
            className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:ring-2 focus:ring-primary outline-none"
          />
          {errors.title && (
            <p className="text-error text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Event Description"
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:ring-2 focus:ring-primary outline-none resize-none"
          />
          {errors.description && (
            <p className="text-error text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Event Date</label>
          <DatePicker
            value={date}
            onChange={setDate}
            minDate={new Date()}
            className="w-full border rounded-lg px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            placeholder="Event Location"
            className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:ring-2 focus:ring-primary outline-none"
          />
          {errors.location && (
            <p className="text-error text-sm">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Is Paid Event?</label>
          <select
            {...register("isPaid", { required: true })}
            className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="false">Free Event</option>
            <option value="true">Paid Event</option>
          </select>
        </div>

        {isPaid === "true" && (
          <div>
            <label className="block mb-1 font-medium">Event Fee</label>
            <input
              type="number"
              {...register("eventFee", { required: "Event Fee is required" })}
              placeholder="Event Fee"
              className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.eventFee && (
              <p className="text-error text-sm">{errors.eventFee.message}</p>
            )}
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium">Max Attendees (Optional)</label>
          <input
            type="number"
            {...register("maxAttendees")}
            placeholder="Optional"
            className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={updateMutation.isLoading}
          className="w-full py-3.5 bg-primary text-white rounded-lg font-semibold shadow-md flex justify-center items-center"
        >
          {updateMutation.isLoading ? "Updating..." : "Update Event"}
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;