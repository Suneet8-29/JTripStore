import firebase from '../firebase'

export const signIn = () => async (dispatch) => {
    
    var provider = new firebase.auth.GoogleAuthProvider();
    var result= await firebase.auth().signInWithPopup(provider)
        // This gives you a Google Access Token. You can use it to access the Google API.
    //var token = result.credential.accessToken;
        // The signed-in user info.
    var user = result.user;
    console.log(user.displayName);
    dispatch({
        type: 'SIGN_IN',
        payload: {
            displayName : user.displayName,
            photoURL : user.photoURL
        }
    })
 
}

export const signInCheck = (user) => {
    return {
        type: 'SIGN_IN_CHECK',
        payload: {
            displayName : user.displayName,
            photoURL : user.photoURL
        }
    }
}
export const signOut = () => dispatch => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    
    dispatch({
        type:'SIGN_OUT'
    })
    
}