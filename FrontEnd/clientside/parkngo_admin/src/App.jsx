import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import AdminEntityDetails from "./screens/AdminEntityDetails/AdminEntityDetails";
import AdminHomeScreen from "./screens/AdminHomeScreen/AdminHomeScreen";

function App() {
  return (
    <>
      <Navbar />
      <AdminHomeScreen />
      <div className="bg-secondary" style={{height:"1rem"}}></div>
      <AdminEntityDetails />
      <div className="bg-secondary" style={{height:"1rem"}}></div>
      <Footer />
    </>
  );
}

export default App;
