import initializeFirebase from "../Pages/Login/Firebase/firebase.init";
import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";


//initialize firebase app
initializeFirebase()

const useFirebase = () => {
    const [user, setUser] = useState({});
    const auth = getAuth();
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState('');

    //for new registration -----------------------
    const registerUser = (email, password, location, history) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || "/";
                setTimeout(function () {
                    history.replace(destination)
                }, 1000);
                setAuthError("")
            })
            .catch((error) => {
                const errorMessage = error.message;
                if (errorMessage == 'Firebase: Error (auth/email-already-in-use).') {
                    setAuthError('This email already in use')
                } else {
                    setAuthError(errorMessage)
                }

                // ..
            })
            .finally(() => setLoading(false));
    }

    //for login user -------------------
    const loginUser = (email, password, location, history) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                setTimeout(function () {
                    history.replace(destination)
                }, 1000);
                setAuthError("")
            })
            .catch((error) => {
                const errorMessage = error.message;
                if (errorMessage == 'Firebase: Error (auth/user-not-found).') {
                    setAuthError("The email that you've entered is incorrect.")
                }
                else if (errorMessage == 'Firebase: Error (auth/wrong-password).') {
                    setAuthError("The password that you've entered is incorrect.")
                }
                else {
                    setAuthError(errorMessage)
                }
            })
            .finally(() => setLoading(false));
    }

    //observe user login or logout ------------------
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
            setLoading(false)
        });
        return () => unsubscribed;
    }, [])

    //user logout -----------------
    const logout = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            })
            .finally(() => setLoading(false));
    }



    return {
        user,
        registerUser,
        loginUser,
        loading,
        authError,
        logout
    }
};

export default useFirebase;