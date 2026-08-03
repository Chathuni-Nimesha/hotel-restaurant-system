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
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [dateFilter, setDateFilter] = useState("");


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

  // Dashboard Statistics
  const totalReservations = reservations.length;

  const pendingReservations = reservations.filter(
    (reservation: any) => reservation.status === "Pending"
  ).length;

  const confirmedReservations = reservations.filter(
    (reservation: any) => reservation.status === "Confirmed"
  ).length;
  
  const cancelledReservations = reservations.filter(
    (reservation: any) => reservation.status === "Cancelled"
  ).length;

  const completedReservations = reservations.filter(
    (reservation: any) => reservation.status === "Completed"
  ).length;

  const filteredReservations = reservations.filter((reservation: any) => {
    const matchesSearch =
      reservation.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

       reservation.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

       reservation.phone
        .includes(searchTerm);

    const matchesStatus =
      statusFilter === "All" ||
      reservation.status === statusFilter;

    const matchesDate =
      dateFilter === "" ||
      reservation.date === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;

   
  });

  const sortedReservations = [...filteredReservations].sort((a: any, b: any) => {
    if (sortOrder === "Newest") {
       return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();

      
  });



  return (
  <div id="main-content" className="min-h-screen bg-black text-white p-10">
    <h1 className="text-4xl font-bold mb-8 text-yellow-500">
      Reservation Dashboard
    </h1>
    <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-600 p-6 rounded-lg">
          <h2 className="text-3xl font-bold">{totalReservations}</h2>
          <p>Total Reservations</p>
        </div>

        <div className="bg-yellow-500 text-black p-6 rounded-lg">
          <h2 className="text-3xl font-bold">{pendingReservations}</h2>
          <p>Pending</p>
        </div>

        <div className="bg-green-600 p-6 rounded-lg">
          <h2 className="text-3xl font-bold">{confirmedReservations}</h2>
          <p>Confirmed</p>
        </div>

        <div className="bg-red-600 p-6 rounded-lg">
          <h2 className="text-3xl font-bold">{cancelledReservations}</h2>
          <p>Cancelled</p>
        </div>

        <div className="bg-indigo-600 p-6 rounded-lg">
          <h2 className="text-3xl font-bold">{completedReservations}</h2>
          <p>Completed</p>
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
          
          <div>
            <label className="block mb-1">Status</label>

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              >
                <option value="Pending"> 🟡 Pending</option>
                <option value="Confirmed"> 🟢 Confirmed</option>
                <option value="Cancelled"> 🔴 Cancelled</option>
                <option value="Completed"> 🔵 Completed</option>
            </select>


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
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder=" 🔍 Search by Name, Email or Phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 rounded bg-gray-800 border border-gray-600 text-white"
          />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-52 p-3 rounded bg-gray-800 border border-gray-600 text-white"
          />

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-52 p-3 rounded bg-gray-800 border border-gray-600 text-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending"> 🟡 Pending</option>
              <option value="Confirmed"> 🟢 Confirmed</option>
              <option value="Cancelled"> 🔴 Cancelled</option>
              <option value="Completed"> 🔵 Completed</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-48 p-3 rounded bg-gray-800 border border-gray-600 text-white"

            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>

            </select>
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
          {sortedReservations.map((reservation: any) => (
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
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      reservation.status === "Confirmed"
                        ? "bg-green-600"
                        : reservation.status === "Cancelled"
                        ? "bg-red-600"
                        :reservation.status === "Completed"
                        ? "bg-blue-600"
                        : "bg-yellow-500 text-black"
                    }`}
                >
                  {reservation.status}

                </span>
              </td>

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