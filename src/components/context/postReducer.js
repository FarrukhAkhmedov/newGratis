export const INITIAL_STATE = {
    isLoading: false,
    userData:{
        userProfileInfo:{}
    },
    serverSideError:'',
    isAuth: false,
    isEmailValid: false
}

export const postReducer = (state, action) => {
    switch (action.type){
        case 'FETCH_START':{
            return {
                ...state,
                isLoading: true
            }
        }
        case 'FETCH_SUCCESS':{
            return {
                ...state,
                isLoading:false,
                isAuth: true,
                userData: {
                    userProfileInfo: action.payload
                }
            }
        }
        case 'FETCH_ERROR':{
            return {
                ...state,
                serverSideError: action.payload,
                isLoading: false
            }
        }
        case 'FETCH_IS_EMAIL_VALID':{
            return{
                ...state,
                isLoading:false,
                isEmailValid: true
            }
        }
        default:
            return {
                isLoading: false,
                userData:{
                    userProfileInfo:{}
                },
                serverSideError:'',
                isAuth: false,
                isEmailValid: false
            }
    }
}