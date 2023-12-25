import TopHomeComponent from "../components/HomeComponents/TopHomeComponent";
import { useUserCtx } from "../context/userCtx";

function Home() {
  const { userState } = useUserCtx();

  console.log(userState);
  return (
    <main>
      <TopHomeComponent />
    </main>
  );
}

export default Home;
