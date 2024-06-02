import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthProvider";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {createUser, user} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        if (password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password should be atleast 6 characters",
              });
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password must have an Uppercase letter",
              });
            return;
        }
        else if (!/[a-z]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password must have an Lowercase letter",
              });
            return;
        }
        else if (!/[!@#$%^&*()_+\-={};':"|,.<>?]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password must have an special character",
              });
            return;
        }
        else if (!/\d/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password must have annumeric character",
              });
            return;
        }
        // create user
        createUser(email,password)
        .then(result => {
            console.log(result.user)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully Registered",
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() => {
                navigate("/")
            }, 2000);
        })
        .catch(error => {
            console.error(error)
            if(user){
                Swal.fire({
                    icon: "error",
                    text: "Already Registered, please login",
                  });
            }
           
        })
       
   }

    return (
        <div>
        <div className="hero  min-h-screen" style={{ backgroundImage: `url("/login-pic.jpg")` }}>
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
                            <button className="btn bg-[#e4bb55] text-[#0e191b] border-none">Register</button>
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