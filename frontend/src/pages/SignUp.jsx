import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // console.log(data);
      console.log(error);
      if (data.success === false) {
        setIsLoading(false);
        setError(data.message);
        return;
      }
      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <button
            disabled={isLoading}
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70"
          >
            {isLoading ? <p>Loading...</p> : <p>Sign up</p>}
          </button>
        </form>
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
