import React,{createContext,useReducer} from "react";
import AppReducer from './AppReducer';

const initialstate={
    transactions:[],
    user:{},
    active:true
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

    function userData(user){
        dispatch({
            type:'USER_DATA',
            payload:user
        })
    }

    function updateActive(flag){
        dispatch({
            type:"UPDATE_ACTIVE",
            payload:flag
        })
    }

    return(
        <GlobalContext.Provider value={{
            transactions:state.transactions,
            user:state.user,
            active:state.active,
            deleteTransaction,
            addTransaction,
            listTransaction,
            userData,
            updateActive
        }}>
            {children}
        </GlobalContext.Provider>
    )
}