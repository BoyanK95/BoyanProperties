import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useUserCtx } from "../context/userCtx";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const { signInSuccess } = useUserCtx();
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }),
      });
      const data = await res.json();
      signInSuccess(data);
      navigate('/')
      // This gives you  Access Token.
      // const credential = provider.credentialFromResult(auth, result);
      // const token = credential.accessToken;
    } catch (error) {
      console.log("Could not sign in with google".error);
    }
  };

  return (
    <button
      type="button"
      className="bg-red-800 text-white p-3 rounded-lg uppercase hover:opacity-90"
      onClick={handleGoogleAuth}
    >
      Continue with Google
    </button>
  );
}
