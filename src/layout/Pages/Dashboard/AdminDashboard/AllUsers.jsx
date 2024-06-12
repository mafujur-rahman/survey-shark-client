import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {
    const AxiosSecure = UseAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await AxiosSecure.get('/users');
            return res.data;
        }
    })

    const handleManageUser = user =>{
        AxiosSecure.patch(`users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    icon: "success"
                });
            }
        })
    }

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
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });

    }

    return (
        <div>
            <h2 className="text-3xl font-bold mt-5 text-center">Manage All Users</h2>
            <div className="mx-auto container bg-white p-8 mt-10">
                <h2 className="text-2xl font-semibold my-4">Total Users: {users.length}</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead className="bg-[#074B5C] text-white">
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                       {
                                        user.role === 'admin' ? 'Admin' :  <button className="btn border-none text-white bg-[#074B5C]" onClick={() => handleManageUser(user)}>
                                        {user.role}
                                        </button>
                                       }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user)}>
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;