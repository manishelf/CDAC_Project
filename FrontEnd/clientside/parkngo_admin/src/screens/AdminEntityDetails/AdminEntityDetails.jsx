import { useEffect, useState } from 'react';
import './AdminEntityDetails.css'

export default function AdminEntityDetails(){
    const data = [
        {
            lot_id: 1,
            lot_name: "Krushna Parkings",
            lot_owner: "xyz@sans.com",
            lot_managers: ["pq@gasa.com"],
            lot_coords: {
                lat: "19.0760",
                long: "72.8777"
            },
            lot_zone: 1,
            lot_size: 100,
        },
        {
            lot_id: 2,
            lot_name: "Green Valley Parking",
            lot_owner: "abc@greenvalley.com",
            lot_managers: ["lm@greenvalley.com", "no@greenvalley.com"],
            lot_coords: {
                lat: "28.7041",
                long: "77.1025"
            },
            lot_zone: 2,
            lot_size: 150,
        },
        {
            lot_id: 3,
            lot_name: "Sunshine Parking",
            lot_owner: "sunshine@parking.com",
            lot_managers: ["uv@sunshine.com"],
            lot_coords: {
                lat: "13.0827",
                long: "80.2707"
            },
            lot_zone: 3,
            lot_size: 200,
        },
        {
            lot_id: 4,
            lot_name: "Downtown Parking",
            lot_owner: "downtown@parking.com",
            lot_managers: ["wx@downtown.com", "yz@downtown.com",],
            lot_coords: {
                lat: "22.5726",
                long: "88.3639"
            },
            lot_zone: 4,
            lot_size: 250,
        }
    ];

    const [tableData, setTableData] = useState([]);
    const [sortDir, setSortDir] = useState({ key: null, direction: 'aesc' });

    
    const sortData = (key) => {
        let direction = 'aesc';
        if (sortDir.key === key && sortDir.direction === 'aesc') {
            direction = 'desc';
        }
        const sortedData = [...tableData].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'aesc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'aesc' ? 1 : -1;
            }
            return 0;
        });
        setSortDir({ key, direction });
        setTableData(sortedData);
    };


    useEffect(()=>{setTableData(data);},[]);
    return (
        <div className="table-responsive entity-table">
            <table className="table table-bordered table-hover shadow text-center" >
                <thead className="table-primary">
                    <tr>
                    {
                       Object.keys(tableData[0] || {}).map((key)=>{
                        return <th>
                            {key}&nbsp;
                            <button className='btn btn-muted btn-outline-info text-info-emphasis btn-sm'
                                onClick={() => sortData(key)}>
                                ⇅ 
                            </button>
                        </th>
                      })
                    }
                    </tr>
                </thead>
                <tbody>                    
                {tableData.map((row)=>{
                    const keys = Object.keys(row);
                    return <tr title="Click to Edit Record ▞" className="align-middle">
                        {
                            <>{
                            keys.map((data)=>{
                                if(Array.isArray(row[data])) 
                                    return <td><ul className="mb-0">
                                        {row[data].map((inner)=>{
                                            return <li>{inner}</li>
                                            })
                                        }
                                    </ul></td>
                                else if(typeof row[data]==='object')
                                        return <td>
                                            <ul className="mb-0">
                                                {Object.entries(row[data]).map((entry)=>{
                                                    return <>{entry.toString()}<br></br></>
                                                })
                                                }
                                            </ul>
                                        </td>
                                else return <td>
                                    {row[data]}
                                </td>
                            })}
                            </>
                        }
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
}