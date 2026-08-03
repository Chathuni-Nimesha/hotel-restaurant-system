"use client";

import { useState } from "react";
import { DatePicker } from "@/components/ui/DatePicker";
import { TimePicker } from "@/components/ui/TimePicker";
import { getTodayIsoDate } from "@/lib/format";

const diningAreas = [
  "Indoor Dining",
  "Rooftop Terrace",
  "Private VIP Room",
  "Garden Dining",
];

const Reservation = () => {
  const [selectedArea, setSelectedArea] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    diningArea: "",
    specialRequests: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "guests"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async () => {    try {
      const response = await fetch(
        "http://localhost:5000/api/reservations",
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formData,
              diningArea: selectedArea,
            }),
            }
      );

      const data = await response.json();

      if (data.success) {
        alert("Reservation Created Successfully!");

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: 1,
          diningArea: "",
          specialRequests: "",
        });

        setSelectedArea("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

      };

  return (
    <section
      id="reservation"
      className="landing-section bg-gradient-to-b from-black via-[#111] to-black text-white"
    >
      <div className="section-container max-w-[1400px]">
        <div className="section-divider landing-section-divider" aria-hidden="true" />

        <header className="section-heading-gap text-center">
          <h2 className="mb-4 text-5xl font-bold text-yellow-500 md:text-6xl">
            Reserve Your Table
          </h2>
          <p className="text-lg text-gray-300">
            Experience luxury dining at Grand Royal.
          </p>
        </header>

        <div className="grid gap-8 text-center lg:grid-cols-2 lg:gap-10">
          

          {/* Reservation Form */}
          
          <div className=" bg-[#111] rounded-3xl border border-gray-800 p-10 shadow-[0_0_40px_rgba(234,179,0.08)]">

            <h2 className="text-3xl font-bold mb-8">
              Reservation Details
            </h2>

            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <DatePicker
                id="reservation-date"
                name="date"
                label="Date"
                value={formData.date}
                min={getTodayIsoDate()}
                onChange={handleChange}
                required
              />

              <TimePicker
                id="reservation-time"
                name="time"
                label="Time"
                value={formData.time}
                onChange={handleChange}
                onTimeSelect={(time) =>
                  setFormData((current) => ({ ...current, time }))
                }
                required
              />

              <div className="w-full text-left">
                <label
                  htmlFor="reservation-guests"
                  className="mb-1 block text-sm font-medium text-gray-200"
                >
                  Guests
                </label>
                <select
                  id="reservation-guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-700 bg-[#0a0a0a] p-4 text-white transition focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500/30"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={6}>6 Guests</option>
                  <option value={8}>8 Guests</option>
                </select>
              </div>
            </div>

            <h3 className="mb-6 text-xl font-bold text-yellow-500">
              Select Dining Area
            </h3>

            <div className="mb-10 grid gap-4 md:grid-cols-2">
              {diningAreas.map((area) => (
                <button
                  key={area}
                  type="button"
                  aria-pressed={selectedArea === area}
                  onClick={() => setSelectedArea(area)}
                  className={`rounded-xl border p-4 transition ${
                    selectedArea === area
                      ? "border-yellow-500 bg-yellow-500 text-black"
                      : "border-gray-700 bg-[#0a0a0a] text-white hover:border-yellow-500"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
            <h3 className="text-xl font-bold text-yellow-500 mb-6">
              Guest Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="bg-[#0a0a0a] border border-gray-700 p-4 rounded-xl"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="bg-[#0a0a0a] border border-gray-700 p-4 rounded-xl"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="bg-[#0a0a0a] border border-gray-700 p-4 rounded-xl md:col-span-2"
              />

            </div>

            <textarea
              rows={5}
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Special Requests"
              className="w-full bg-[#0a0a0a] border border-gray-700 p-4 rounded-xl mb-8"
            />

            <button
              onClick={handleSubmit}
              className="
                w-full
                bg-yellow-500
                text-black
                font-bold
                py-4
                rounded-xl
                hover:bg-yellow-400
                transition
              "
            >
              Reserve Table
            </button>

          </div>

          {/* Availability Panel */}
          <div className="bg-[#111] rounded-3xl border border-gray-800 p-10 shadow-[0_0_40px_rgba(234,179,8,0.08)]">

            <h2 className="text-3xl font-bold text-yellow-500 mb-8">
              Available Tables
            </h2>

            <div className="space-y-6">

              <div className="border border-gray-700 rounded-xl p-5">
                <h3 className="font-bold text-lg">
                  Window Table
                </h3>

                <p className="text-gray-400">
                  Capacity: 2 Guests
                </p>

                <p className="text-green-500 mt-2">
                  Available
                </p>
              </div>

              <div className="border border-gray-700 rounded-xl p-5">
                <h3 className="font-bold text-lg">
                  Family Table
                </h3>

                <p className="text-gray-400">
                  Capacity: 6 Guests
                </p>

                <p className="text-yellow-500 mt-2">
                  2 Tables Left
                </p>
              </div>

              <div className="border border-gray-700 rounded-xl p-5">
                <h3 className="font-bold text-lg">
                  VIP Dining Room
                </h3>

                <p className="text-gray-400">
                  Capacity: 8 Guests
                </p>

                <p className="text-green-500 mt-2">
                  Available
                </p>
              </div>

              <div className="border border-gray-700 rounded-xl p-5">
                <h3 className="font-bold text-lg">
                  Rooftop Terrace
                </h3>

                <p className="text-gray-400">
                  Capacity: 4 Guests
                </p>

                <p className="text-green-500 mt-2">
                  Available
                </p>
              </div>

            </div>

            <div className="mt-10 border-t border-gray-800 pt-8">

              <h3 className="text-xl font-bold text-yellow-500 mb-5">
                Premium Benefits
              </h3>

              <div className="space-y-4 text-gray-300">

                 <p>✓ Instant Confirmation</p>

                 <p>✓ Priority VIP Seating</p>

                 <p>✓ Complimentary Welcome Drink</p>

                 <p>✓ Personalized Dining Experience</p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Reservation;