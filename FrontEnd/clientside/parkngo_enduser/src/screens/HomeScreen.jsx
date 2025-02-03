import "react-toastify/dist/ReactToastify.css";

import MapWithDirection from "../components/MapWithDirection";
import Navbar from "../components/Navbar/Navbar";
import Home from "../components/Home/Home";
import Footer from "../components/Footer/Footer";

function HomeScreen() {
  return (
    <>
      <Navbar />
      <div
        className="container-fluid bg-secondary"
        style={{ height: "1rem" }}
      />
      <div className="row">
        <div className="col">
          <Home />
        </div>
        <div className="col-5" style={{ height: "100vh" }}>
          <MapWithDirection
            from="Neelaya society, Talegaon Dabhade, Pune, Maharashtra"
            to="Sunbeam info tech, Pune, Maharashtra"
          />
        </div>
      </div>
      <div
        className="container-fluid bg-secondary"
        style={{ height: "1rem" }}
      />
      <Footer />
    </>
  );
}

export default HomeScreen;
