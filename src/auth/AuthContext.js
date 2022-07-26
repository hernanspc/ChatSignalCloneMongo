import React, { createContext, useCallback, useState } from 'react';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
    photoUrl: null,
};


export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(initialState)

    const login = async (email, password) => {
        const resp = await fetchSinToken('login', { email, password }, 'POST');
        if (resp.ok) {
            try {
                await AsyncStorage.setItem('@token', resp.token)
            } catch (e) {
                console.log('funcion login: ', error.message)
            }
            const { usuario } = resp;

            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email,
                photoUrl: usuario.photoUrl
            });

        }

        return resp.ok;

    }

    const register = async (nombre, email, password) => {
        const resp = await fetchSinToken('login/new', { nombre, email, password }, 'POST');
        if (resp.ok) {
            try {
                await AsyncStorage.setItem('@token', resp.token);
            } catch (e) {
                console.log('register: ', error.message)
            }

            const { usuario } = resp;
            console.log('res ', usuario.photoUrl)
            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email,
                photoUrl: usuario.photoUrl
            });

            return true;
        }

        return resp.msg;

    }

    const verificaToken = useCallback(async () => {

        const token = await AsyncStorage.getItem('@token');
        // Si token no existe
        if (!token) {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
                photoUrl: null,
            })

            return false;
        }

        const resp = await fetchConToken('login/renew');
        // console.log('fetchConToken ', resp)
        if (resp.ok) {
            try {
                await AsyncStorage.setItem('@token', resp?.token)
            } catch (e) {
                // saving error
            }
            // AsyncStorage.setItem('@token', resp.token);
            const { usuario } = resp;

            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email,
                photoUrl: usuario.photoUrl,
            });

            return true;
        } else {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
                photoUrl: null,
            });

            return false;
        }

    }, [])

    const logout = async () => {
        await AsyncStorage.removeItem('@token');
        setAuth({
            checking: false,
            logged: false,
            photoUrl: null
        });
    }

    const leerStorage = async () => {
        const data = await AsyncStorage.getItem('@token');
        console.log('data ', data)
    }


    const cambiarFotoPerfil = async (_id, photoUrl) => {
        const resp = await fetchSinToken('user/cambiarFotoPerfil', { _id, photoUrl }, 'POST');
        if (resp.ok) {
            try {
                await AsyncStorage.setItem('@token', resp.token)
            } catch (e) {
                console.log('funcion login: ', error.message)
            }
            const { usuario } = resp;
            console.log('usuario ', usuario)
            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email,
                photoUrl: usuario.photoUrl
            });

        }

        return resp.ok;

    }


    return (
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verificaToken,
            logout,
            leerStorage,
            cambiarFotoPerfil
        }}>
            {children}
        </AuthContext.Provider>
    )
}

