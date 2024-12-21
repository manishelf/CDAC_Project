import { MdGroup ,MdLocalParking, MdAttachMoney, MdStore, MdReport , MdApproval} from 'react-icons/md';
import './AdminHomeScreen.css'
import SimpleLineChart from '../components/LineGraph';
import StatusItem from '../components/StatusItem';
import MetricsItem from './../components/MetricsItem';

const data = [
    { time: '00:00', occupancy: 4000 },
    { time: '01:00', occupancy: 3400 },
    { time: '02:00', occupancy: 2300 },
    { time: '03:00', occupancy: 2800 },
    { time: '04:00', occupancy: 1500 },
    { time: '05:00', occupancy: 2000 },
    { time: '06:00', occupancy: 3000 },
    { time: '07:00', occupancy: 3500 },
    { time: '08:00', occupancy: 4000 },
    { time: '09:00', occupancy: 4500 },
    { time: '10:00', occupancy: 5000 },
    { time: '11:00', occupancy: 5500 },
    { time: '12:00', occupancy: 8000 },
    { time: '13:00', occupancy: 6500 },
    { time: '14:00', occupancy: 7000 },
    { time: '15:00', occupancy: 3000 },
    { time: '16:00', occupancy: 8000 },
    { time: '17:00', occupancy: 8500 },
    { time: '18:00', occupancy: 9000 },
    { time: '19:00', occupancy: 7500 },
    { time: '20:00', occupancy: 6000 },
    { time: '21:00', occupancy: 1500 },
    { time: '22:00', occupancy: 1000 },
    { time: '23:00', occupancy: 500 },
    { time: '24:00', occupancy: 100 },
  ];



export default function AdminHomeScreen(){
    const upTime = "19:00 12ip1i2"

    return <>
        <div className="container">
            <div className="row justify-content-around p-5">
                <h1 className="display-4 col">Dashboard</h1>    
                <div className="border border-success rounded row justify-content-between align-items-center px-4 col-4" style={{fontWeight:700, fontSize:"1.8em"}}>
                    <div className="text-primary col" ><u>UP-Time</u></div>
                    <div className="text-success col">{upTime}</div>
                </div>
            </div>
            <div className="container border border-success rounded text-success" style={{fontWeight:700, fontSize:"1.8em"}}>
                <div className="text-primary text-center">Status</div>
                <div className="row justify-content-between">
                    <StatusItem title="Backend" items={["Main Server", "Mailing Server"]}/>
                    <StatusItem title="Frontend" />
                    <StatusItem title="Database" />
                </div>
            </div>
            <div className="container border border-success rounded text-success" style={{fontWeight:700, fontSize:"1.8em"}}>
                <div className="text-primary  text-center">Metrics</div>
                <div className="row justify-content-center">
                    <MetricsItem itemIcon={<MdGroup/>} topRowItem="b" bottomRowItem="Users"/>
                    <MetricsItem itemIcon={<MdLocalParking/>} topRowItem="b" bottomRowItem="Lots"/>
                    <MetricsItem itemIcon={<MdStore/>} topRowItem="b" bottomRowItem="Advertisers"/>
                    <MetricsItem itemIcon={<MdReport/>} topRowItem="b" bottomRowItem="Complaints"/>
                    <MetricsItem itemIcon={<MdAttachMoney/>} topRowItem="b" bottomRowItem="Revinue"/>
                </div>
            </div>
            <div className='container border border-success rounded text-success'>
                <div className='col  m-4 p-4 align-content-center'>
                    <div className='row' >
                        <div className='col align-content-center' style={{fontSize:"4em"}}>
                            Approve
                            <MdApproval /> 
                        </div>
                        <div className='col text-center'>
                                <div className='row'>
                                    <MetricsItem topRowItem={
                                        <button className="btn btn-lg btn-warning col m-2" style={{fontSize:"2em"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lot&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                    } col="col"/>
                                    <MetricsItem topRowItem={
                                        <button className="btn btn-lg btn-warning col m-2" style={{fontSize:"2em"}}>&nbsp;&nbsp;Manager&nbsp;&nbsp;</button>
                                    } col="col"/>    
                                </div>
                                <div className='row'>
                                    <MetricsItem topRowItem={
                                        <button className="btn btn-lg btn-warning col m-2" style={{fontSize:"2em"}}>Advertiser</button>
                                    } col="col"/>
                                    <MetricsItem topRowItem={
                                        <button className="btn btn-lg btn-warning col m-2" style={{fontSize:"2em"}}>&nbsp;&nbsp;&nbsp;Admin&nbsp;&nbsp;&nbsp;</button>
                                    } col="col"/>
                                </div>  
                        </div>
                    </div>
                </div>
            </div>
            <div className="container border border-success rounded text-success" >
                <div className="text-primary  text-center" style={{fontWeight:700, fontSize:"1.8em"}}>Peak Times</div>
                <SimpleLineChart data={data}/>
            </div>
        </div>
    </>
}