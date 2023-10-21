function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <div>
        <form action="POST" className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            className="border p-3 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            className="border p-3 rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            className="border p-3 rounded-lg"
          />
          <button
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
