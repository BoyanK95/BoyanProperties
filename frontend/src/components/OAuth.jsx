export default function OAuth() {
  const handleGoogleAuth = async () => {
    // try {
        
    // } catch (error) {
    //     console.log('Could not sign in with google'. error);
    // }
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
