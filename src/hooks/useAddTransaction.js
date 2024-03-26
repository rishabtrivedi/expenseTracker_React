import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";



export const useAddTransaction = () => {
    
    const transactionCollectionRef = collection(db, "transactions");

    const { userID } = useGetUserInfo(); // it will return userID, name, profilePhoto, isAuth from local storage

    const addTransaction = async ({
        description,
        transactionAmount,
        transactionType
    }) => {
        
        
        await addDoc(transactionCollectionRef, {
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp(),
       
        });
    };

    return { addTransaction };

};