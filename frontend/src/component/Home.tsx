import AllTask from "./AllTask";
import Navbar from "./Navbar";

const Home = () => {
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r bg-white">
            <Navbar/>
            <AllTask/>
        </div>
    );
};

export default Home;
