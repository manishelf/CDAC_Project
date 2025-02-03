import { useEffect } from "react";
import PaymentRecipt from "../components/PaymentRecipt";
import html2pdf from 'html2pdf.js'
import { toast } from "react-toastify";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";


export default function PaymentReciptScreen(props){
    const printHandler = ()=>{
        const paymentRecipt = document.getElementById('paymentRecipt');
        html2pdf(paymentRecipt);
    }
    useEffect(
        ()=>{
            toast.success('parking booked!');
            toast.info('Please Save Your Ticket');
        }
    );
    return (
        <>
        <Navbar/>
        <div className="text-center" >
            <PaymentRecipt />
            <button className="btn btn-primary btn-lg" onClick={printHandler}>Print</button>
        </div>
        <Footer/>
        </>
    )
}