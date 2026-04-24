"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut 
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const syncUserToDb = async (firebaseUser, additionalData = {}) => {
        try {
            const response = await fetch("/api/user/sync", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName || additionalData.displayName || "Golfer",
                    photoUrl: firebaseUser.photoURL,
                    ...additionalData
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            }
        } catch (error) {
            console.error("Error syncing user to DB:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                await syncUserToDb(firebaseUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signup = async (email, password, displayName) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await syncUserToDb(res.user, { displayName });
        return res;
    };

    const login = async (email, password) => {
        const res = await signInWithEmailAndPassword(auth, email, password);
        await syncUserToDb(res.user);
        return res;
    };

    const googleLogin = async () => {
        const res = await signInWithPopup(auth, googleProvider);
        await syncUserToDb(res.user);
        return res;
    };

    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, signup, login, googleLogin, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
