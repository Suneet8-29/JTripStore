const INIT_STATE = {
    isSignedIn: null,
    userName: null,
    photoURL: null
}

const authReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN_CHECK':
            return { ...state, isSignedIn: true, userName: action.payload.displayName, photoURL : action.payload.photoURL }
        case 'SIGN_IN':
            return { ...state, isSignedIn: true, userName: action.payload.displayName, photoURL : action.payload.photoURL }
        case 'SIGN_OUT':
            return { ...state, isSignedIn: false, userName: null, photoURL : null }
        default :
            return state;
        
    }
}

export default authReducer;