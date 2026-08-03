"use client";

import { useEffect, useState } from "react";
import {
  createMenuItem,
  deleteMenuItem,
  fetchMenus,
  updateMenuItem,
} from "@/lib/api/menus";
import type { MenuItem } from "@/types/menu";

export default function MenuPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    available: true,
  });

  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);

  const loadMenus = async () => {
    const items = await fetchMenus();
    setMenus(items);
  };

  useEffect(() => {
    let isMounted = true;

    fetchMenus()
      .then((items) => {
        if (isMounted) {
          setMenus(items);
        }
      })
      .catch(() => {
        if (isMounted) {
          setMenus([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const totalMenus = menus.length;
  const availableMenus = menus.filter((menu) => menu.available).length;
  const unavailableMenus = menus.filter((menu) => !menu.available).length;
  const totalCategories = new Set(menus.map((menu) => menu.category)).size;

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
      available: true,
    });
  };

  const handleSubmit = async () => {
    try {
      await createMenuItem(formData);
      alert("Food Item Added Successfully!");
      resetForm();
      await loadMenus();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to add menu item.");
    }
  };

  const handleEdit = (menu: MenuItem) => {
    setEditingMenu(menu);
    setFormData({
      name: menu.name,
      category: menu.category,
      price: String(menu.price),
      description: menu.description,
      image: menu.image,
      available: menu.available,
    });
  };

  const handleUpdate = async () => {
    if (!editingMenu) {
      return;
    }

    try {
      await updateMenuItem(editingMenu._id, formData);
      alert("Menu Updated Successfully!");
      setEditingMenu(null);
      resetForm();
      await loadMenus();
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to update menu item."
      );
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteMenuItem(id);
      alert("Menu Deleted Successfully");
      await loadMenus();
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to delete menu item."
      );
    }
  };

  return (
    <div id="main-content" className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-4xl font-bold text-yellow-500">Menu Management</h1>

      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <div className="rounded-lg bg-blue-600 p-6">
          <h2 className="text-4xl font-bold">{totalMenus}</h2>
          <p>Total Items</p>
        </div>

        <div className="rounded-lg bg-green-600 p-6">
          <h2 className="text-4xl font-bold">{availableMenus}</h2>
          <p>Available</p>
        </div>

        <div className="rounded-lg bg-red-600 p-6">
          <h2 className="text-4xl font-bold">{unavailableMenus}</h2>
          <p>Unavailable</p>
        </div>

        <div className="rounded-lg bg-yellow-500 p-6 text-black">
          <h2 className="text-4xl font-bold">{totalCategories}</h2>
          <p>Categories</p>
        </div>
      </div>

      <div className="rounded-lg border border-yellow-500 bg-gray-900 p-8">
        <h2 className="mb-6 text-2xl font-bold text-yellow-400">Add Food Item</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <input
            type="text"
            placeholder="Food Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="rounded border border-gray-700 bg-gray-800 p-3"
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
            className="rounded border border-gray-700 bg-gray-800 p-3"
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value,
              })
            }
            className="rounded border border-gray-700 bg-gray-800 p-3"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) =>
              setFormData({
                ...formData,
                image: e.target.value,
              })
            }
            className="rounded border border-gray-700 bg-gray-800 p-3"
          />
        </div>
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          className="mt-6 w-full rounded border border-gray-700 bg-gray-800 p-3"
          rows={4}
        />

        <button
          onClick={editingMenu ? handleUpdate : handleSubmit}
          className="mt-6 rounded-lg bg-yellow-500 px-8 py-3 font-bold text-black hover:bg-yellow-600"
        >
          {editingMenu ? " Update Food " : "Add Food"}
        </button>

        <hr className="my-10 border-gray-700" />
        <h2 className="mb-6 text-3xl font-bold text-yellow-500">Menu Items</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700">
            <thead>
              <tr className="bg-yellow-500 text-black">
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Available</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {menus.map((menu) => (
                <tr
                  key={menu._id}
                  className="border-b border-gray-700 text-center"
                >
                  <td className="p-3">
                    <img
                      src={menu.image}
                      alt={menu.name}
                      className="mx-auto h-20 w-20 rounded object-cover"
                    />
                  </td>

                  <td>{menu.name}</td>
                  <td>{menu.category}</td>
                  <td>Rs. {menu.price}</td>
                  <td>{menu.available ? "✅ Yes" : "❌ No"}</td>

                  <td className="space-x-2">
                    <button
                      onClick={() => handleEdit(menu)}
                      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(menu._id)}
                      className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
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
    </div>
  );
}
