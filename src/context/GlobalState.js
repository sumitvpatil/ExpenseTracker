import React,{createContext,useReducer} from "react";
import AppReducer from './AppReducer';

const initialstate={
    transactions:[
    ]
}

export const GlobalContext = createContext(initialstate);

export const GlobalProvider = ({children})=>{
    const [state,dispatch] = useReducer(AppReducer,initialstate);

    function deleteTransaction(id){
        dispatch({
            type:'DELETE_TRANSACTION',
            payload:id
        })
    }

    function addTransaction(transaction){
        dispatch({
            type:'ADD_TRANSACTION',
            payload: transaction
        })
    }

    function listTransaction(transactions){
        dispatch({
            type:'LIST_TRANSACTION',
            payload:transactions
        })
    }

    return(
        <GlobalContext.Provider value={{
            transactions:state.transactions,
            deleteTransaction,
            addTransaction,
            listTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )
}