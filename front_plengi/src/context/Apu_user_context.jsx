
import { createContext, useContext, useState } from "react";
import { 
    getApusRequest,
    getApuRequest,
    createApuRequest,
    deleteApuRequest,
    updateApuRequest,

 } from "../api/apu_user";

const ApuContext = createContext()

export const useApu = () => {
    const context = useContext(ApuContext)

    if (!context) {
        throw new Error("useAuth debe estar dentro de AuthProvider")
    }

    return context;
}

// eslint-disable-next-line react/prop-types
export function ApuProvider({ children }){

    const [ apus, setApus ] = useState([])

    //obtner todos
    const getApus = async() => {
        try {
            const res = await getApusRequest()
            setApus(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    //create
    const createApu = async (apu) => {
        const cantidadNumerica = parseFloat(apu.val_unitario);
        const newApu = { ...apu, val_unitario: cantidadNumerica };
    
        const res = await createApuRequest(newApu);
        console.log(res);
      };

    //elimina una tarea
    const deleteApu = async (id) => {
        try {
            const res = await deleteApuRequest(id)
            if (res.status === 204) setApus(apus.filter(apu => apu._id !== id))
        } catch (error) {
            console.log(error);
        }

    };

    //llamar una sola tarea
    const getApu = async (id) => {
        try {
            const res = await getApuRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    //actualiza una tarea
    const updateApu = async (id, apu) => {
        try {
            await updateApuRequest(id, apu)
        } catch (error) {
            console.log(error);
        }

    };
      
    return(
        <ApuContext.Provider 
            value={{
                apus,
                getApus,
                getApu,
                createApu,
                deleteApu,
                updateApu,
            }}
        >
            {children}
        </ApuContext.Provider>
    )
}