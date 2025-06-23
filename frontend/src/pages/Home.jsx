import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <Header />
      </div>
    </>
  );
};

export default Home;
