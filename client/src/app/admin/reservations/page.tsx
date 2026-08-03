"use client";

import { useEffect, useState } from "react";
import {
  deleteReservationRecord,
  fetchReservations,
  updateReservationRecord,
  type ReservationRecord,
} from "@/lib/api/reservations";
import { getTodayIsoDate } from "@/lib/format";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);
  const [editingReservation, setEditingReservation] =
    useState<ReservationRecord | null>(null);

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

  const loadReservations = async () => {
    const items = await fetchReservations();
    setReservations(items);
  };

  useEffect(() => {
    let isMounted = true;

    fetchReservations()
      .then((items) => {
        if (isMounted) {
          setReservations(items);
        }
      })
      .catch(() => {
        if (isMounted) {
          setReservations([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const deleteReservation = async (id: string) => {
    await deleteReservationRecord(id);
    await loadReservations();
  };

  const handleEdit = (reservation: ReservationRecord) => {
    setEditingReservation(reservation);

    setFormData({
      fullName: reservation.fullName,
      email: reservation.email,
      phone: reservation.phone,
      guests: String(reservation.guests),
      status: reservation.status,
    });
  };

  const handleSave = async () => {
    if (!editingReservation) {
      return;
    }

    await updateReservationRecord(editingReservation._id, formData);
    alert("Reservation updated Successfully");
    setEditingReservation(null);
    await loadReservations();
  };

  const totalReservations = reservations.length;
  const todaysReservations = reservations.filter(
    (reservation) => reservation.date === getTodayIsoDate()
  ).length;
  const pendingReservations = reservations.filter(
    (reservation) => reservation.status === "Pending"
  ).length;
  const confirmedReservations = reservations.filter(
    (reservation) => reservation.status === "Confirmed"
  ).length;
  const cancelledReservations = reservations.filter(
    (reservation) => reservation.status === "Cancelled"
  ).length;

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === "All" || reservation.status === statusFilter;

    const matchesDate = dateFilter === "" || reservation.date === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const sortedReservations = [...filteredReservations].sort((a, b) => {
    if (sortOrder === "Newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div id="main-content" className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-4xl font-bold text-yellow-500">
        Reservation Dashboard
      </h1>
      <div className="mb-8 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-lg bg-blue-600 p-6">
          <h2 className="text-3xl font-bold">{totalReservations}</h2>
          <p>Total</p>
        </div>

        <div className="rounded-lg bg-indigo-600 p-6">
          <h2 className="text-3xl font-bold">{todaysReservations}</h2>
          <p>Today&apos;s Reservations</p>
        </div>

        <div className="rounded-lg bg-yellow-500 p-6 text-black">
          <h2 className="text-3xl font-bold">{pendingReservations}</h2>
          <p>Pending</p>
        </div>

        <div className="rounded-lg bg-green-600 p-6">
          <h2 className="text-3xl font-bold">{confirmedReservations}</h2>
          <p>Confirmed</p>
        </div>

        <div className="rounded-lg bg-red-600 p-6">
          <h2 className="text-3xl font-bold">{cancelledReservations}</h2>
          <p>Cancelled</p>
        </div>
      </div>

      {editingReservation && (
        <div className="mb-8 rounded-lg border border-yellow-500 bg-gray-900 p-6">
          <h2 className="mb-4 text-2xl font-bold text-yellow-500">
            Edit Reservation
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full rounded border border-gray-600 bg-gray-800 p-2"
              />
            </div>

            <div>
              <label className="mb-1 block">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded border border-gray-600 bg-gray-800 p-2"
              />
            </div>
            <div>
              <label className="mb-1 block">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full rounded border border-gray-600 bg-gray-800 p-2"
              />
            </div>

            <div>
              <label className="mb-1 block">Guests</label>
              <input
                type="number"
                value={formData.guests}
                onChange={(e) =>
                  setFormData({ ...formData, guests: e.target.value })
                }
                className="w-full rounded border border-gray-600 bg-gray-800 p-2"
              />
            </div>

            <div>
              <label className="mb-1 block">Status</label>

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full rounded border border-gray-600 bg-gray-800 p-2"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleSave}
              className="rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700"
            >
              Save Changes
            </button>

            <button
              onClick={() => setEditingReservation(null)}
              className="rounded bg-red-600 px-6 py-2 text-white hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row">
          <input
            type="text"
            placeholder="Search by Name, Email or Phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded border border-gray-600 bg-gray-800 p-3 text-white"
          />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full rounded border border-gray-600 bg-gray-800 p-3 text-white lg:w-52"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded border border-gray-600 bg-gray-800 p-3 text-white lg:w-52"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full rounded border border-gray-600 bg-gray-800 p-3 text-white lg:w-48"
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>

        <table className="w-full overflow-hidden rounded-lg border border-gray-700">
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
            {sortedReservations.map((reservation) => (
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
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      reservation.status === "Confirmed"
                        ? "bg-green-600"
                        : reservation.status === "Cancelled"
                          ? "bg-red-600"
                          : reservation.status === "Completed"
                            ? "bg-blue-600"
                            : "bg-yellow-500 text-black"
                    }`}
                  >
                    {reservation.status}
                  </span>
                </td>

                <td className="space-x-2 p-3">
                  <button
                    onClick={() => handleEdit(reservation)}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to delete this reservation?"
                        )
                      ) {
                        void deleteReservation(reservation._id);
                      }
                    }}
                    className="rounded bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600"
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
