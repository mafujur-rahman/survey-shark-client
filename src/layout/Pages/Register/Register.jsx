import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthProvider";
import { useContext } from "react";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const AxiosPublic = UseAxiosPublic();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.image.value;
        const password = form.password.value;
        const role = 'user';

        try {
            // Validate password
            if (password.length < 6) {
                throw new Error("Password should be at least 6 characters");
            } else if (!/[A-Z]/.test(password)) {
                throw new Error("Password must have an uppercase letter");
            } else if (!/[a-z]/.test(password)) {
                throw new Error("Password must have a lowercase letter");
            } else if (!/[!@#$%^&*()_+\-={};':"|,.<>?]/.test(password)) {
                throw new Error("Password must have a special character");
            } else if (!/\d/.test(password)) {
                throw new Error("Password must have a numeric character");
            }


            createUser(email, password, name, image)
                .then(user => {
                    console.log("New user:", user);
                    const userInfo = {
                        name,
                        email,
                        role,
                        image
                    };
                    AxiosPublic.post('/users', userInfo)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.insertedId) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Successfully Registered",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                            navigate('/');
                        })

                })


        } catch (error) {
            console.error('Error:', error.message);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
        }
    }

    return (
        <div>
            <div className="hero  min-h-screen" style={{ backgroundImage: `url("/login-pic.png")` }}>
                <div className="hero-content flex-col">
                    <h3 className="text-center text-3xl font-extrabold text-white">Register Here</h3>
                    <div className="card shrink-0 w-full md:w-[400px] shadow-2xl shadow-black">
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Full Name</span>
                                </label>
                                <input type="text" placeholder="Enter full your name" className="input input-bordered" name="name" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" name="email" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Photo Url</span>
                                </label>
                                <input type="text" placeholder="photo url" className="input input-bordered" name="image" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Password</span>
                                </label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} placeholder="Create new password" name="password" className="input input-bordered w-full" required />
                                    <span className="absolute top-4 right-3" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ? <AiFillEyeInvisible /> : <AiFillEye />
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#074B5c] text-white border-none">Register</button>
                            </div>
                            <p className="text-center text-white">Already have an account?</p>
                            <Link to="/log-in"><p className="text-xl font-medium text-white underline text-center">Log in</p></Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
