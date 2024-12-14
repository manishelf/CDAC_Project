import QRCode from 'react-qr-code'
export default function PaymentRecipt(props){

    // const {
    //     bookingTime,
    //     fromTime ,
    //     toTime ,
    //     amountPaid,
    //     txnId,
    //     qrData} = props;

    const bookingTime = "17/17/2020"
    const fromTime = "09:00 AM"
    const toTime = "12:00 PM"
    const amountPaid = "100"
    const txnId = "ABCXYZ90121"
    const qrData = "https://www.google.com"

    const shadow = `-2px -3px 15px -1px rgba(0,0,0,0.58)`

    const greetings = `have a nice day!`

    return (
        <div className="container mt-5 py-4 text-center 
                        border bg-light border-1 border-success 
                        rounded shadow-sm"
             id="paymentRecipt"
             >
            <h1 className="display-4 border-top pb-3">
                Parking Ticket
            </h1>
            <div className="d-flex justify-content-center py-3">
                <div style={{height:"12em", width:"12em", boxShadow:shadow}} >
                    <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={qrData}
                    viewBox={`0 0 256 256`}
                />
                </div>
            </div>
            <div className="my-3">
                <span className="col-md-4 text-success mx-2" style={{fontSize:"1.2em"}}>Booked on :</span>
                <mark className="text-body-emphasis" style={{fontSize:"1.5em"}}>{bookingTime}</mark>
            </div>
            <div className="form-groups d-flex justify-content-center">
                <div className="mx-3">
                    <label htmlFor="" className="col-md-4 text-success" style={{fontSize:"1.2em"}}>From :</label>
                    <input type="text" className="form-control col-lg bg-primary text-center text-white" style={{fontSize:"1.5em"}} value={fromTime} readOnly />
                </div>
                <div className="mx-3">
                    <label htmlFor="" className="col-md-4 text-success" style={{fontSize:"1.2em"}}>To :</label>
                    <input type="text" className="form-control col-lg bg-primary text-center text-white" style={{fontSize:"1.5em"}} value={toTime} readOnly/>
                </div>
            </div>
            <div className="border-bottom py-4">
                <span className="text-success" style={{fontSize:"3em"}}>Paid : ₹ {amountPaid}</span>
                <span className="text-body-emphasis d-block py-2" style={{fontSize:"1.1em"}}>TXN ID : {txnId}</span>
            </div>
            <span className="text-body-primary d-block mt-3">Thankyou and {greetings}</span>
        </div>
    )
}