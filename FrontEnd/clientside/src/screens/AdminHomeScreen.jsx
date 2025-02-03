require('./AdminHomeScreen.css')

export default function AdminHomeScreen(){
    const upTime = "19:00 12ip1i2"
    const StatusItem = (props)=>{
        return (
                 <div className="border border-success m-4 p-4 rounded align-content-center" style={{height:"auto"}}>
                     <span>{props.title}</span>
                     <ul className="list-group list">
                        {
                            props.items?
                                props.items.map((item)=>{
                                    return <li className="list-group-item">{item}</li>
                                })
                            :''
                        }
                     </ul>
                 </div>
        )
     } 

    return <>
        <div className="container">
            <div className="d-flex justify-content-around">
                <h1 className="display-4">Dashboard</h1>    
                <div className="border border-success rounded d-flex justify-content-between align-items-center px-4 col-4" style={{fontWeight:700, fontSize:"1.8em"}}>
                    <div className="text-primary" ><u>UP-Time</u></div>
                    <div className="text-success">{upTime}</div>
                </div>
            </div>
            <div className="container border border-success rounded text-success" style={{fontWeight:700, fontSize:"1.8em"}}>
                <div className="text-primary text-center">Status</div>
                <div className="d-flex justify-content-between">
                    <StatusItem title="Backend" items={["Main Server", "Mailing Server"]}/>
                    <StatusItem title="Frontend" />
                    <StatusItem title="Database" />
                </div>
            </div>
            <div className="container border border-success rounded text-success" style={{fontWeight:700, fontSize:"1.8em"}}>
                <scpan className="text-primary d-block"><u>Metrics</u></scpan>
                <div className="d-flex justify-content-center">
                    <div className=" d-flex border border-success m-4 p-4 rounded justify-content-around col-5">
                        <div className=''>
                            
                        </div>
                        <div className='flex-grow-1'>
                            <div className=''>b</div>
                            <div className='border'></div>
                            <div className=''>c</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}