import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const [roleFilter, setRoleFilter] = useState('');
    const AxiosSecure = UseAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', roleFilter],
        queryFn: async () => {
            const res = await AxiosSecure.get('/users', {
                params: roleFilter ? { role: roleFilter } : {}
            });
            return res.data;
        }
    });

    const handleManageUser = user => {
        AxiosSecure.patch(`users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: "User role updated successfully"
                    });
                }
            });
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                AxiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The user has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    const handleRoleFilterChange = (event) => {
        const selectedRole = event.target.value;
        setRoleFilter(selectedRole);
    };

    // Filtered users based on role
    const filteredUsers = roleFilter
        ? users.filter(user => user.role === roleFilter)
        : users;

    return (
        <div className="min-h-screen py-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Manage All Users</h2>
            <div className="container mx-auto bg-white shadow-md rounded-lg p-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold mb-4 md:mb-0">Total Users: {filteredUsers.length}</h2>
                    <div className="flex items-center">
                        <label className="mr-2 font-semibold">Filter by Role:</label>
                        <select
                            value={roleFilter}
                            onChange={handleRoleFilterChange}
                            className="select select-bordered px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All</option>
                            <option value="user">User</option>
                            <option value="surveyor">Surveyor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white table-auto">
                        <thead className="bg-[#074B5C] text-white">
                            <tr>
                                <th className="py-2 px-4 text-left">#</th>
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Email</th>
                                <th className="py-2 px-4 text-left">Role</th>
                                <th className="py-2 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user._id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{user.name}</td>
                                    <td className="py-2 px-4">{user.email}</td>
                                    <td className="py-2 px-4">
                                        {user.role === 'admin' ? 'Admin' : (
                                            <button
                                                className="btn border-none text-white bg-[#074B5C] px-4 py-2 rounded-lg hover:bg-[#062f3c] transition-colors duration-300"
                                                onClick={() => handleManageUser(user)}
                                            >
                                                {user.role}
                                            </button>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        <button onClick={() => handleDeleteUser(user)}>
                                            <FaTrashAlt className="text-red-600 hover:text-red-800 transition-colors duration-300" />
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
};

export default AllUsers;
