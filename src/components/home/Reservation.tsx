"use client";
import { useState } from "react";

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
    specialRequests: "",
  });

  const handleChange =(
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
  
  const handleSubmit = async () => {
    try {
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
    
    <section className="min-h-screen bg-gradient-to-b from-black via-[#111] to-black text-white py-32">
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Heading */}
        <div className="h-16"></div>
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-500 mb-4">
            Reserve Your Table
          </h1>


          <p className="text-gray-300 text-lg mb-12">
            Experience luxury dining at Grand Royal.
          </p>
        </div>
        

        <div className="grid lg:grid-cols-2 gap-10 text-center ">
          

          {/* Reservation Form */}
          
          <div className=" bg-[#111] rounded-3xl border border-gray-800 p-10 shadow-[0_0_40px_rgba(234,179,0.08)]">

            <h2 className="text-3xl font-bold mb-8">
              Reservation Details
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="bg-[#0a0a0a] border border-gray-700 p-4 rounded-xl"
              />

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="bg-[#0a0a0a] border border-gray-700 p-4 rounded-xl"
              />
                
              

              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="bg-[#0a0a0a] border border-gray-700 p-4 rounded-xl"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={4}>4 Guests</option>
                <option value={6}>6 Guests</option>
                <option value={8}>8 Guests</option>
              </select>

            </div>

            <h3 className="text-xl font-bold text-yellow-500 mb-6">
              Select Dining Area
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-10">

              
                <button
                  type="button"
                  onClick={() => setSelectedArea("Indoor Dining")}
                  className={`p-4 rounded-xl border transition
                    ${
                      selectedArea === "Indoor Dining"
                        ? "bg-yellow-500 text-black border-yellow-500"
                        : "bg-[#0a0a0a] text-white border-gray-700 hover:border-yellow-500"
                    }`}
                   
                >
                  Indoor Dining
                </button>

                <button 
                type="button"
                onClick={() => setSelectedArea("Rooftop Terrace")}
                className={`p-4 rounded-xl border transition
                  ${
                    selectedArea === "Rooftop Terrace"
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : "bg-[#0a0a0a] text-white border-gray-700 hover:border-yellow-500"
                  }`}
                >
                  Rooftop Terrace

                </button>
                <button
                  type="button"
                  onClick={() => setSelectedArea("Private VIP Room")}
                  className={`p-4 rounded-xl border transition
                    ${
                      selectedArea === "Private VIP Room"
                        ? "bg-yellow-500 text-black border-yellow-500"
                        : "bg-[#0a0a0a] text-white border-gray-700 hover:border-yellow-500"
                    }`}
                >
                  Private VIP Room
                </button>
                <button
                 type="button"
                 onClick={() => setSelectedArea("Garden Dining")}
                 className={`p-4 rounded-xl border transition
                   ${
                      selectedArea === "Garden Dining"
                        ? "bg-yellow-500 text-black border-yellow-500"
                        : "bg-[#0a0a0a] text-white border-gray-700 hover:border-yellow-500"

                   }`}
                >
                  Garden Dining

                </button>

          

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