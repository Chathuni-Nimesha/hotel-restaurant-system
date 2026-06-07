"use client";

import { useEffect, useState } from "react";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);

  const fetchReservations = async () => {
    const response = await fetch(
      "http://localhost:5000/api/reservations"
    );

    const data = await response.json();

    setReservations(data.reservations);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const deleteReservation = async (id: string) => {
  const response = await fetch(
    `http://localhost:5000/api/reservations/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (data.success) {
    fetchReservations();
  }
};

  return (
  <div className="min-h-screen bg-black text-white p-10">
    <h1 className="text-4xl font-bold mb-8 text-yellow-500">
      Reservation Dashboard
    </h1>
    <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-yellow-500 text-black p-6 rounded">
            <h2 className="text-xl font-bold">
                {reservations.length}
            </h2>
            <p>Total Reservations</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded">
            <h2 className="text-xl font-bold">
                Available 
            </h2>
            <p>Active Booking</p>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded">
            <h2 className="text-xl font-bold">
                Grand Royal
            </h2>
            <p>Restaurant Dashboard</p>
        </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-yellow-500 text-black">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Date</th>
            <th className="p-3">Time</th>
            <th className="p-3">Dining Area</th>
            <th className="p-3">Guests</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((reservation: any) => (
            <tr
              key={reservation._id}
              className="border-b border-gray-700 text-center hover:bg-gray-900"
            >
              <td className="p-3">{reservation.fullName}</td>
              <td className="p-3">{reservation.email}</td>
              <td className="p-3">{reservation.phone}</td>
              <td className="p-3">{reservation.date}</td>
              <td className="p-3">{reservation.time}</td>
              <td className="p-3">{reservation.diningArea}</td>
              <td className="p-3">{reservation.guests}</td>

              <td className="p-3 space-x-2">
                <button
                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow "
                   >
                    Edit
                    </button>

                    <button
                   onClick={() =>{
                    if (confirm("Are you sure you want to delete this reservation?")){
                        deleteReservation(reservation._id);
                    }
                   }}
                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 shadow "
                >
                    Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}