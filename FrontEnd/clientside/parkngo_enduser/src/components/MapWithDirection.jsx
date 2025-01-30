import {APIProvider, Map} from '@vis.gl/react-google-maps';
import Directions from './directions/Direction';
import SearchBox from './searchWithAutocomplete/SearchBox';
import  {useState, useEffect} from 'react';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function MapWithDirection({from, to}) {
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [currentPinCode, setCurrentPinCode] = useState('');

    function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setFromLocation({ lat: latitude, lng: longitude });
                    const latlng = { lat: latitude, lng: longitude };
    
                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ location: latlng }, (results, status) => {
                        if (status === 'OK') {
                            if (results[0]) {
                                setFromLocation(results[0].formatted_address);
                                let length = results[0].address_components.length-1;
                                console.log(results[0].address_components[length].long_name);
                                setCurrentPinCode(results[0].address_components[length].long_name);
                            } else {
                                console.error('No results found');
                            }
                        } else {
                            console.error('Geocoder failed due to: ' + status);
                        }
                    });
                },
                (error) => {
                    console.error("Error getting user's location:", error);
                    if(!(from||fromLocation))
                        setFromLocation(prompt('Please enter your location'));
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }
    useEffect(() => { getCurrentLocation()}, []);


    return (
            <div className='container border border-3 border-primary g-0' style={{height: '100%'}}>
                <APIProvider apiKey={API_KEY}>
                    <Map
                        defaultZoom={10}
                        defaultCenter={{lat: 22.54992, lng: 0}}
                        // gestureHandling={'greedy'}
                        id="gmap"
                        mapId="8c732c82e4ec29d9"
                        disableDefaultUI={true}
                        zoomControl={true}
                        streetViewControl={true}
                        style={{width: '100%', height: '100%',}}
                    > 
                    <SearchBox onPlaceSelect={setToLocation}/>
                    <Directions
                        key={`${fromLocation}-${toLocation}`}
                        from={fromLocation === '' ? from : fromLocation}
                        to={toLocation === '' ? to : toLocation}
                    />
                    </Map>
                </APIProvider>
            </div>
    );
}