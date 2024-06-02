import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthProvider";

const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const ghProvider = new GithubAuthProvider();



    const handleGoogleLogIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            Swal.fire({
                icon: "success",
                title: "Successfully Logged in",
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() => {
                navigate(location?.state? location.state : "/");
            }, 2000);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                text: "Failed to login",
              });
        }
    }

    const handleGithubLogIn = () => {
        signInWithPopup(auth, ghProvider)
            .then(result => {
                console.log(result)
                Swal.fire({
                    icon: "success",
                    title: "Successfully Logged in",
                    showConfirmButton: false,
                    timer: 1500
                  });
                setTimeout(() => {
                    navigate(location?.state ? location.state : "/")
                }, 2000);
            })
            .catch(error => {
                console.error(error)
            })
    }
    const handleLogIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        signIn(email, password)
            .then(result => {
                console.log(result)
                Swal.fire({
                    icon: "success",
                    title: "Successfully Logged in",
                    showConfirmButton: false,
                    timer: 1500
                  });
                setTimeout(() => {
                    navigate(location?.state ? location.state : "/")
                }, 2000);
            })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    icon: "error",
                    text: "User not found",
                  });
            })
    }
    return (
        <div>
            <div className="hero  min-h-screen" style={{ backgroundImage: `url("/login-pic.jpg")` }}>
                <div className="hero-content flex-col">
                    <h3 className="text-center text-3xl  font-extrabold text-white">Login Here </h3>
                    <div className="card shrink-0 w-full md:w-[400px] shadow-2xl shadow-black">
                        <form onSubmit={handleLogIn} className="card-body">
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
                                <button className="btn bg-[#e4bb55] text-[#0e191b] border-none">Login</button>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-center text-white">Or</span>
                                </label>
                                <button onClick={handleGoogleLogIn} className="btn bg-orange-600 border-none text-white"> <BsGoogle /> Sign in with Google </button>
                                <button onClick={handleGithubLogIn} className="btn bg-black border-none text-white"> <BsGithub /> Sign in with Github </button>
                            </div>
                            <p className="text-center text-white">Do not have an account?</p>
                            <Link to="/register"><p className="text-xl font-medium text-white underline text-center">Register</p></Link>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LogIn;