import { FaCreditCard, FaWallet, FaMoneyBillAlt } from "react-icons/fa";
import QRCode from "react-qr-code";
import PaymentRecipt from "../components/PaymentRecipt";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function PaymentConfirmationScreen(props) {
  // const {
  //     bookingTime,
  //     fromTime ,
  //     toTime ,
  //     amountPaid,
  //     txnId,
  //     qrData} = props;

  const bookingTime = "17/17/2020";
  const fromTime = "09:00 AM";
  const toTime = "12:00 PM";
  const amountToPay = "100";
  const txnId = "ABCXYZ90121";
  const qrData = "https://www.google.com";

  const shadow = `-2px -3px 15px -1px rgba(0,0,0,0.58)`;

  return (
    <>
    <Navbar/>
    <div className="row">
      <div className="col-md-6">
        <PaymentRecipt
          bookingTime="17/7/2020"
          qrData={() => {}}
          fromTime="asasas"
          toTime="sasafafa"
          amountPaid="asasasasas"
          greetings="please confirm to pay"
        />
      </div>
      <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex justify-content-around w-100 m-4">
          <FaCreditCard size={48} color="green" />
          <FaWallet size={48} color="green" />
          <FaMoneyBillAlt size={48} color="green" />
        </div>
        <div
          style={{
            height: "12em",
            width: "12em",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value="qrData"
            viewBox="0 0 256 256"
          />
        </div>
        <button className="btn btn-lg btn-success mt-4">Confirm Booking</button>
      </div>
    </div>
    <Footer/>
    </>
  );
}
