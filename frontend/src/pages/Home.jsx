import { useUserCtx } from "../context/userCtx";

function Home() {
  const { userState } = useUserCtx();

  console.log(userState);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
