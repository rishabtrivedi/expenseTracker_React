import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./styles.css";

export const Auth = () => {
    const navigate = useNavigate(); // useNavigate hook from react-router-dom
    const { isAuth } = useGetUserInfo(); // get isAuth from useGetUserInfo hook

    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider); // Sign in with Google
        
        // This is the auth info that we will store in local storage
        const authInfo = {
          userID: results.user.uid,
          name: results.user.displayName,
          profilePhoto: results.user.photoURL,
          isAuth: true,
        };

        localStorage.setItem("auth", JSON.stringify(authInfo)); // store auth info in local storage
        navigate("/expense-tracker"); // navigate to the expense tracker page
      };

      if (isAuth) {
        return <Navigate to="/expense-tracker" />;
      }

    return (
        <div className="login-page">
          <p>Sign In With Google to Continue</p>
          <button className="login-with-google-btn" onClick={signInWithGoogle}>
            {" "}
            Sign In With Google
          </button>
        </div>
      );
    };
