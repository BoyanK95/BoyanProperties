function SignUp() {
  return (
    <div>
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
          <button type="submit">SIGN UP</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
