import initializeFirebase from "../Pages/Login/Firebase/firebase.init";
import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";


//initialize firebase app
initializeFirebase()

const useFirebase = () => {
    const [user, setUser] = useState({});
    const auth = getAuth();
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [authError, setAuthError] = useState('');

    //google provide
    const googleProvider = new GoogleAuthProvider();

    //for new registration -----------------------
    const registerUser = (email, password, location, history, name) => {
        setAuthError("")
        setLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError("")
                const newUser = { email, displayName: name, photoURL: "https://i.ibb.co/10GRhV8/240-F-358907879-Vdu96g-F4-XVhj-CZx-N2k-CG0-THTs-SQi8-Ih-T.jpg" }
                setUser(newUser);

                //send user details in database

                saveUser(email, name, "POST")

                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: "https://i.ibb.co/10GRhV8/240-F-358907879-Vdu96g-F4-XVhj-CZx-N2k-CG0-THTs-SQi8-Ih-T.jpg"
                }).then(() => {

                }).catch((error) => {

                });

                const destination = location?.state?.from || "/";
                setTimeout(function () {
                    history.replace(destination)
                }, 1000);

            })
            .catch((error) => {
                const errorMessage = error.message;
                if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
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
                setAuthError("")
                const destination = location?.state?.from || '/';
                setTimeout(function () {
                    history.replace(destination)
                }, 1000);
            })
            .catch((error) => {
                const errorMessage = error.message;
                if (errorMessage === 'Firebase: Error (auth/user-not-found).') {
                    setAuthError("The email that you've entered is incorrect.")
                }
                else if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
                    setAuthError("The password that you've entered is incorrect.")
                }
                else {
                    setAuthError(errorMessage)
                }
            })
            .finally(() => setLoading(false));
    }
    //Figure out admin validation;

    useEffect(() => {
        fetch(`https://sheltered-brushlands-89706.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user.email])



    //for sign in using google 
    const signInWithGoogle = (location, history) => {
        setLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {

                saveUser(result.user.email, result.user.displayName, "PUT")

                const destination = location?.state?.from || '/';
                setTimeout(function () {
                    history.push(destination)
                }, 1000);
                setAuthError("")
            }).catch((error) => {
                const errorMessage = error.message;
                setAuthError(errorMessage)
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
    //send user information in database
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName }
        fetch('https://sheltered-brushlands-89706.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }



    return {
        user,
        registerUser,
        loginUser,
        admin,
        loading,
        signInWithGoogle,
        authError,
        logout
    }
};

export default useFirebase;