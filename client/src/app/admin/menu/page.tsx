"use client";


import { useEffect, useState } from "react";

export default function MenuPage() {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        description: "",
        image: "",
        available: true,
    });

    const [menus, setMenus] = useState<any[]>([]);
    const [editingMenu, setEditingMenu] = useState<any>(null);

    const fetchMenus = async () => {
        const response = await fetch(
            "http://localhost:5000/api/menus"
        );

        const data = await response.json();
        setMenus(data.menus);
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    // Dashboard Statistics
    const totalMenus = menus.length;

    const availableMenus = menus.filter(
        (menu: any) => menu.available
    ).length;

    const unavailableMenus = menus.filter(
        (menu: any) => !menu.available
    ).length;

    const totalCategories = new Set(
        menus.map((menu: { category: string }) => menu.category)
    ).size;

    const handleSubmit = async () => {
        const response = await fetch(
            "http://localhost:5000/api/menus",
            {
                method: "POST" ,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),

            }
        );

        const data = await response.json();

        if (data.success){
            alert("Food Item Added Successfully!");

            setFormData({
                name: "",
                category: "",
                price: "",
                description: "",
                image: "",
                available: true,
            });

            fetchMenus ();
        }
    }

    const handleEdit = (menu: any) => {
        setEditingMenu(menu);

        setFormData({
            name: menu.name,
            category: menu.category,
            price: menu.price,
            description: menu.description,
            image: menu.image,
            available: menu.available,
        });
    };

    const handleUpdate = async () => {
        const response = await fetch(
            `http://localhost:5000/api/menus/${editingMenu._id}`,
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
            alert("Menu Updated Successfully!");

            setEditingMenu(null);

            setFormData({
                name: "",
                category: "",
                price: "",
                description: "",
                image: "",
                available: true,
            });

            fetchMenus();
        }
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this menu item?"
        );

        if (!confirmDelete) return;

        const response = await fetch(
            `http://localhost:5000/api/menus/${id}`,
            {
                method: "DELETE",
            }
        );

        const data = await response.json();

        if (data.success){
            alert("Menu Deleted Successfully");
            fetchMenus();
        }
    };

    return (
        <div id="main-content" className="min-h-screen bg-black text-white p-10">
            <h1 className="text-4xl font-bold text-yellow-500 mb-8">
                Menu Management
            </h1>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-600 p-6 rounded-lg">
                    <h2 className="text-4xl font-bold">
                        {totalMenus}
                    </h2>
                    <p>Total Menu Items</p>
                </div>
                
                <div className="bg-green-600 p-6 rounded-lg">
                    <h2 className="text-4xl font-bold">
                        {availableMenus}
                    </h2>
                    <p>Available</p>
                </div>

                <div className="bg-red-600 p-6 rounded-lg">
                    <h2 className="text-4xl font-bold">
                        {unavailableMenus}
                    </h2>
                    <p>Unavailable</p>
                </div>

                <div className="bg-yellow-500 text-black p-6 rounded-lg">
                    <h2 className="text-4xl font-bold">
                        {totalCategories}
                    </h2>
                    <p>Total Categories</p>
                </div>

            </div>
            <div className="bg-gray-900 p-8 rounded-lg border-yellow-500">
                <h2 className="text-2xl font-bold mb-6 text-yellow-400">
                    Add Food Item
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
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
                       className="p-3 rounded bg-gray-800 border border-gray-700"
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
                       className="p-3 rounded bg-gray-800 border border-gray-700"
                    />
                    <input 
                       type="number"
                       placeholder="Price"
                       value={formData.price}
                       onChange={(e) =>
                         setFormData({
                            ...formData,
                            price: e.target.value
                         })

                       }
                       className="p-3 rounded bg-gray-800 border border-gray-700"
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
                       className="p-3 rounded bg-gray-800 border border-gray-700"
                    />
                </div>
                    <textarea
                       placeholder="Description"
                       value={formData.description}
                       onChange={(e) =>
                         setFormData({
                            ...formData,
                            description: e.target.value
                         })
                       }
                       className="w-full mt-6 p-3 rounded bg-gray-800 border border-gray-700"
                       rows={4}
                    />

                    <button
                    onClick={
                        editingMenu
                            ? handleUpdate
                            : handleSubmit
                    }
                      className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-lg"
                    >
                        {editingMenu ? " Update Food " : "Add Food"}

                    </button>

                    <hr className="my-10 border-gray-700" />
                    <h2 className="text-3xl font-bold text-yellow-500 mb-6">
                        Menu Items
                    </h2>

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
                                {menus.map((menu: any) =>(
                                    <tr
                                      key={menu._id}
                                      className="border-b border-gray-700 text-center"
                                    >
                                        <td className="p-3">
                                            <img 
                                               src={menu.image}
                                               alt={menu.name}
                                               className="w-20 h-20 object-cover rounded mx-auto"
                                            />
                                        </td>

                                        <td>{menu.name}</td>
                                        <td>{menu.category}</td>
                                        <td>Rs. {menu.price}</td>
                                        <td>
                                            {menu.available ? "✅ Yes" : "❌ No"}
                                        </td>

                                        <td className="space-x-2">
                                            <button
                                               onClick={() => handleEdit(menu)}
                                               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                               onClick={() => handleDelete(menu._id)}
                                               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
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

