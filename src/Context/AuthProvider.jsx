import {  createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {  createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";






export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = UseAxiosPublic()

    const createUser = (email, password, name, image) => {
        setLoading(true);
        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return updateProfile(user, {
                    displayName: name,
                    photoURL: image
                }).then(() => {
                    return user;
                });
            })
            .catch((error) => {
                setLoading(false);
                throw error;
            });
    };

    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                    const res = await axiosPublic.post('/jwt', userInfo);
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                    }
                
            } else {
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });
    
        return () => {
            unSubscribe();
        };
    }, [axiosPublic]);
    

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes ={
    children:PropTypes.node
}
export default AuthProvider;