import React, {useEffect, useState} from 'react';
import {
    useMapsLibrary,
    useMap
  } from '@vis.gl/react-google-maps';

import './directions.css';

export default function Directions(props) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [isVisible, setIsVisible] = useState(true);
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];
    
    // Initialize directions service and renderer
    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map}));
    }, [routesLibrary, map]);


    
    // Use directions service
    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;
    
        directionsService
        .route({
            origin: props.from,
            destination: props.to,
            travelMode: 'DRIVING',
            provideRouteAlternatives: true
        })
        .then(response => {
            directionsRenderer.setDirections(response);
            setRoutes(response.routes);
        }).catch(e => alert(e));
    
        return () => directionsRenderer.setMap(null);
    }, [directionsService, directionsRenderer]);
    
    // Update direction route
    useEffect(() => {
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);
    
    if (!isVisible|!leg) return null;
    return (
        <div className='directions p-0 bg-dark text-white'> 
        <button className="btn border border-2 float-end shadow-lg text-white" onClick={()=>{setIsVisible(false);}}>x</button>
        <div className='container'>
            <h6><u>{selected.summary}</u></h6>
            <p>
                {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
            </p>
            <p>Distance: {leg.distance?.text}</p>
            <p>Duration: {leg.duration?.text}</p>
        
            <h2>Other Routes</h2>
            <ul className='text-center'>
                {routes.map((route, index) => (
                <li key={route.summary}>
                    <button className="btn btn-clear text-white border" onClick={() => setRouteIndex(index)}>
                    {route.summary}
                    </button>
                </li>
                ))}
            </ul>
        </div>
        </div>
    );
}