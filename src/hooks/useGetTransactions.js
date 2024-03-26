

import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });

  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const getTransactions = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

          if (data.transactionType === "expense") {
            totalExpenses += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }

          console.log(totalExpenses, totalIncome);
        });

        setTransactions(docs);

        let balance = totalIncome - totalExpenses;
        setTransactionTotals({
          balance,
          expenses: totalExpenses,
          income: totalIncome,
        });
      });
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionTotals };
};

// import { useEffect, useState } from "react";
// import {
//   query,
//   collection,
//   where,
//   orderBy,
//   onSnapshot,
// } from "firebase/firestore";
// import { db } from "../config/firebase-config";
// import { useGetUserInfo } from "./useGetUserInfo";

// // Desc: Get transactions from Firestore
// export const useGetTransactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [transactionTotals, setTransactionTotals] = useState({
//     balance: 0.0,
//     income: 0.0,
//     expenses: 0.0,
//   });

//   // Get the transaction collection reference
//   const transactionCollectionRef = collection(db, "transactions");
//   const { userID } = useGetUserInfo();

//   // Get transactions from Firestore
//   const getTransactions = async () => {
//     let unsubscribe;

    
//     try {
//       const queryTransactions = query(
//         transactionCollectionRef,
//         where("userID", "==", userID),
//         orderBy("createdAt")
//       );
//          // Subscribe to the snapshot of the transactions
//          //onSnapshot is a listener that listens to the changes in the database
//       unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
//         let docs = [];
//         let totalIncome = 0;
//         let totalExpenses = 0;
        

//         // Loop through the snapshot and get the data
//         snapshot.forEach((doc) => {
//           const data = doc.data();
//           const id = doc.id;

//           docs.push({ ...data, id });

//           if (data.transactionType === "expense") {
//             totalExpenses += Number(data.transactionAmount);
//           } else {
//             totalIncome += Number(data.transactionAmount);
//           }

//           console.log(totalExpenses, totalIncome);
//         });

//         setTransactions(docs);

//         let balance = totalIncome - totalExpenses;
//         setTransactionTotals({
//           balance,
//           expenses: totalExpenses,
//           income: totalIncome,
//         });
//       });  
//     } 

//     // Catch any errors
//     catch (err) {
//       console.error(err);
//     }

//     // Unsubscribe from the snapshot when the component unmounts
//     return () => unsubscribe();
//   };

//   // Get transactions on component mount
//   useEffect(() => {
//     getTransactions();
//   }, []);

//   return { transactions, transactionTotals };
// };