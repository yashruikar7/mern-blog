import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () =>{

        // GoogleAuthProvider: This is a class from Firebase Authentication that provides Google Sign-In functionality.

        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })

        //by above line it will not always ask to login 

//         signInWithPopup(auth, provider):
        // This function is provided by Firebase Authentication.
        // It initiates the Google Sign-In process using a popup window.

//         auth:
        // This is the Firebase Authentication instance that you've initialized in your application.
        // It represents the connection to Firebase Authentication services and is used to manage authentication operations.

//         The signInWithPopup function resolves with a result object that contains user information and credentials if the sign-in is successful.
// This result object is assigned to the variable resultsFromGoogle.

            try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    //user indicates the sign in  user
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
                })
            const data = await res.json()
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    } 
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>
  )
}


// 1. Firebase Setup (getAuth(app) and GoogleAuthProvider):
// getAuth(app):

// This function initializes and returns the Firebase Authentication instance associated with the app. It is used to manage the user's authentication state and perform various authentication tasks, such as logging in or logging out.
// app is the Firebase app instance, which must have been initialized earlier in your project setup.
// GoogleAuthProvider():

// This class from Firebase Authentication enables Google Sign-In. It creates a new provider object to be used for signing in with Google.
// provider.setCustomParameters({ prompt: 'select_account' }):

// This method sets custom parameters for the sign-in request. The prompt: 'select_account' parameter prompts the user to select a Google account when signing in, instead of automatically logging them in with the previously used account.
// 2. Google Sign-In (signInWithPopup):
// signInWithPopup(auth, provider):

// This function opens a popup window and starts the Google authentication process. The user selects their Google account, and Firebase handles the OAuth process in the background.
// Once the user successfully signs in, Firebase returns an object (resultsFromGoogle) that contains information about the authenticated user.
// This resultsFromGoogle object includes user details such as their displayName, email, and photoURL.
// auth:

// This is the Firebase Authentication instance initialized with getAuth(app), which is passed to the signInWithPopup function to handle the login



//////////////////////////////////////////////////////////////////

// What is Firebase?
// Firebase is a platform developed by Google that provides various backend services for building web and mobile applications. It offers features like authentication, real-time databases, cloud storage, hosting, analytics, and more, which help developers focus on creating user experiences without managing infrastructure.

// After you choose an account for Google Sign-In, here's what happens:

// Google Authentication: Google checks your credentials (email/password or saved account).
// Token Generation: If valid, Google generates an OAuth token that confirms your identity.
// Token Sent to Firebase: The token is sent to Firebase, where it verifies the token's authenticity with Google's servers.
// User Session Created: Once verified, Firebase creates a user session, and you can access the user's details (e.g., name, email) securely.