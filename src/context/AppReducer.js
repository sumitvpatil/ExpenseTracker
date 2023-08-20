const AppReducer= (state,action)=>{
    switch(action.type){
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions:state.transactions.filter(transaction => transaction._id!==action.payload)
            }
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions:[action.payload,...state.transactions]
            }
        case 'LIST_TRANSACTION':
            return {
                ...state,
                transactions:action.payload
            }
        case 'USER_DATA':
            return {
                ...state,
                user:action.payload
            }
        case 'UPDATE_ACTIVE':
            return {
                ...state,
                active:action.payload
            }
        default:
            return state
    }
}

export default AppReducer;