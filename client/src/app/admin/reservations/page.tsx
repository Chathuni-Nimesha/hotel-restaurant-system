"use client";

import { useEffect, useState } from "react";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [editingReservation, setEditingReservation] = useState<any>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    guests: "",
    status: "",
    
  });

  const [searchTerm, setSearchTerm] = useState("");


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

  const handleEdit = (reservation: any) => {
    setEditingReservation(reservation);

    setFormData({
      fullName: reservation.fullName,
      email: reservation.email,
      phone: reservation.phone,
      guests: reservation.guests,
      status: reservation.status,
    });

  };

  const handleSave = async () => {
    const response = await fetch(
      `http://localhost:5000/api/reservations/${editingReservation._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
      
    );

    const data = await response.json();

    if (data.success) {
      alert("Reservation updated Successfully");
      setEditingReservation(null);
      fetchReservations();
    }
  };

  const filteredReservations = reservations.filter((reservation: any) =>
    reservation.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||

    reservation.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||

    reservation.phone
      .includes(searchTerm)
  );


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

    {editingReservation && (
      <div className="bg-gray-900 border border-yellow-500 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">
          Edit Reservation
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData,
                  fullName: e.target.value,
                })
              }
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              
              />
          </div>
          
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              
            />
          </div>
          <div>
            <label className="block mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1">Guests</label>
            <input
              type="number"
              value={formData.guests}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  guests: e.target.value,
                })
              }
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              
            />
          </div>
        </div>

        {/*Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            >
              Save Changes

            </button>

            <button
              onClick={() => setEditingReservation(null)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
              >
                Cancel
              </button>
        </div>
          
      </div>
    )}

    <div className="overflow-x-auto">
      <div className="mb-6">
        <input
          type="text"
          placeholder=" 🔍 Search by Name, Email or Phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
          />
      </div>

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
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredReservations.map((reservation: any) => (
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
              <td className="p-3">{reservation.status}</td>

              <td className="p-3 space-x-2">
                <button
                onClick={() =>handleEdit(reservation)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
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