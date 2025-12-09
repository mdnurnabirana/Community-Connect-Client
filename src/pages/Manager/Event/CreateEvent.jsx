import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import DatePicker from "react-date-picker";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import Loading from "../../../shared/Loading";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const CreateEvent = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const isPaid = useWatch({ control, name: "isPaid" });
  const [date, setDate] = useState(new Date());

  const { data: clubs = [], isLoading: clubLoading } = useQuery({
    queryKey: ["manager-approved-clubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/manager-approved/clubs");
      return res.data;
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (eventData) => axiosSecure.post("/events", eventData),
    onSuccess: () => {
      toast.success("Event created successfully!");
      reset();
      setDate(new Date());
    },
    onError: () => toast.error("Failed to create event"),
  });

  console.log("Current user:", user?.email);
console.log("Raw clubs from API:", clubs);

  const onSubmit = async (data) => {
    if (!date) return toast.error("Please select a date");
    const eventInfo = {
      clubId: data.clubId,
      title: data.title,
      description: data.description,
      eventDate: date,
      location: data.location,
      isPaid: data.isPaid === "true",
      eventFee: data.isPaid === "true" ? Number(data.eventFee) : 0,
      maxAttendees: data.maxAttendees ? Number(data.maxAttendees) : null,
    };

    await mutateAsync(eventInfo);
  };

  if (clubLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <section className="min-h-screen py-10">
      <div className="max-w-3xl mx-auto bg-base-100 border border-base-300 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Create New Event
        </h2>

        {clubs.length === 0 ? (
          <p className="text-center text-neutral">
            You don’t have any approved clubs yet.
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Select Club */}
            <div className="relative">
              <select
                {...register("clubId", { required: true })}
                className="w-full appearance-none px-4 py-3 pr-12 rounded-lg bg-base-100 border border-base-300 focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="">Select Your Club</option>
                {clubs.map((club) => (
                  <option key={club._id} value={club._id}>
                    {club.clubName}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral">
                ▼
              </span>
              {errors.clubId && (
                <p className="text-error text-sm">Club is required</p>
              )}
            </div>

            {/* Title */}
            <input
              {...register("title", { required: true })}
              placeholder="Event Title"
              className="w-full px-4 py-3 rounded-lg bg-base-100 border border-base-300 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.title && (
              <p className="text-error text-sm">Title is required</p>
            )}

            {/* Description */}
            <textarea
              {...register("description", { required: true })}
              placeholder="Event Description"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-base-100 border border-base-300 focus:ring-2 focus:ring-primary outline-none resize-none"
            />
            {errors.description && (
              <p className="text-error text-sm">Description is required</p>
            )}

            {/* Event Date */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Event Date</label>
              <div className="custom-date-picker">
                <DatePicker
                  value={date}
                  onChange={setDate}
                  minDate={new Date()}
                  clearIcon={null}
                  calendarIcon={null}
                />
              </div>
            </div>

            {/* Location */}
            <input
              {...register("location", { required: true })}
              placeholder="Event Location"
              className="w-full px-4 py-3 rounded-lg bg-base-100 border border-base-300 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.location && (
              <p className="text-error text-sm">Location is required</p>
            )}

            {/* Is Paid */}
            <div className="relative">
              <select
                {...register("isPaid", { required: true })}
                className="w-full appearance-none px-4 py-3 pr-12 rounded-lg bg-base-100 border border-base-300 focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="false">Free Event</option>
                <option value="true">Paid Event</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral">
                ▼
              </span>
            </div>

            {/* Event Fee */}
            {isPaid === "true" && (
              <input
                type="number"
                {...register("eventFee", { required: true })}
                placeholder="Event Fee"
                className="w-full px-4 py-3 rounded-lg bg-base-100 border border-base-300 focus:ring-2 focus:ring-primary outline-none"
              />
            )}

            {/* Max Attendees */}
            <input
              type="number"
              {...register("maxAttendees")}
              placeholder="Max Attendees (Optional)"
              className="w-full px-4 py-3 rounded-lg bg-base-100 border border-base-300 focus:ring-2 focus:ring-primary outline-none"
            />

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 rounded-lg bg-primary text-white font-semibold shadow-md hover:bg-primary/80 transition flex items-center justify-center"
            >
              {isPending ? (
                <Loading height={30} width={30} color="#F43F5E" />
              ) : (
                "Create Event"
              )}
            </button>
          </form>
        )}
      </div>

      <style>
        {`
          .custom-date-picker .react-date-picker__wrapper {
            border: 1px solid #e5e7eb;
            border-radius: 0.75rem;
            padding: 10px 12px;
            background-color: #fff;
          }

          .custom-date-picker .react-date-picker__inputGroup input {
            outline: none;
          }

          .react-calendar {
            border-radius: 0.75rem;
            border: none;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          }

          .react-calendar__tile--active {
            background: #f43f5e !important;
            color: white !important;
            border-radius: 8px;
          }
        `}
      </style>
    </section>
  );
};

export default CreateEvent;