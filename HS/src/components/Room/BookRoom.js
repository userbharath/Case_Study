import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Button, Container, UncontrolledCarousel } from "reactstrap";
import './BookRoom.css';

const BookRoom = ({ currentUser }) => {

    const { roomId } = useParams();
    const [room, setRoom] = useState({});
    const [message, setMessage] = useState('');
    let tomorrow = new Date(new Date())
    tomorrow.setDate(tomorrow.getDate() + 1)
    let [roomPayload, setRoomPayload] = useState({
        "id": Math.floor(Math.random() * 16),
        "guestId": currentUser.guestId,
        "roomId": roomId,
        "checkInDate": new Date().toLocaleDateString(),
        "checkOutDate": tomorrow.toLocaleDateString(),
        "status": "pending",
        "noOfGuest": "1",
        "noOfNight": 1
    })

    useEffect(() => {
        fetch('http://localhost:8087/Room/getRoom/' + roomId, {
            referrerPolicy: 'unsafe-url',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
        }).then(response => { return response.json() }).then(data => setRoom(data))
    }, []);
    
    const updateCheckIn = (event) => {
        setRoomPayload((rP) => {
            rP.checkInDate = event.target.value.replaceAll('-', '/');
            return rP;
        })
    }
    const updateCheckOut = (event) => {
        setRoomPayload((rP) => {
            rP.checkOutDate = event.target.value.replaceAll('-', '/');
            return rP;
        })
    }
    const updateGuests = (event) => {
        setRoomPayload((rP) => {
            rP.noOfGuest = event.target.value;
            return rP;
        })
    }
    const updateNights = (event) => {
        setRoomPayload((rP) => {
            rP.noOfNight = event.target.value;
            return rP;
        })
    }

    const handleBooking = () => {
        var raw = JSON.stringify(roomPayload);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('Access-Control-Allow-Credentials', 'POST, GET, OPTIONS');
        myHeaders.append('Access-Control-Allow-Headers', 'Content-Type');
        myHeaders.append('Accept', 'application/json');
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            referrerPolicy: 'unsafe-url',
            mode: 'cors',
        };
        fetch('http://localhost:8084/Reservation/bookRoom', requestOptions).then(response => { return response.text() }).then(data => {
            setMessage(data)
        });
    }

    if (!currentUser.isAuthenticated) {
        return <Redirect to="/auth" />
    }

    return (<Container fluid={true} tagPropType='div' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <div className="imageContainer mt-3 mb-3 row" style={{ width: "60%", height: "500px", overflow: "hidden" }}>
            <UncontrolledCarousel
                items={[
                    {
                        altText: 'Slide 1',
                        key: 1,
                        src: 'https://picsum.photos/id/123/1200/600'
                    },
                    {
                        altText: 'Slide 2',
                        key: 2,
                        src: 'https://picsum.photos/id/456/1200/600'
                    },
                    {
                        altText: 'Slide 3',
                        key: 3,
                        src: 'https://picsum.photos/id/678/1200/600'
                    }
                ]}
            />
        </div>
        <div className="roomInfo row mt-2" style={{ width: '60%', border: '1px solid black', minHeight: '200px', padding: '20px' }}>
            <div className="col-md-7">
                <h4>Room No: {room.roomNum}</h4>
                <p>
                    <span >
                        Description ::
                    </span>
                    {room.desc}
                </p>
            </div>
            <div className="col-md-5 reserveInfo" style={{ display: 'block' }}>
                <div className="inputItem">
                    <span>Check In Date : </span><input type="date" onChange={(e) => updateCheckIn(e)} name="checkIn" id="checkIn" />
                </div>
                <div className="inputItem">
                    <span>Check Out Date : </span><input type="date" onChange={(e) => updateCheckOut(e)} name="checkOut" id="checkOut" />

                </div>
                <div className="inputItem">
                    <p>Number of Guests  </p>
                    <select class="form-select" aria-label="Default select example" onChange={(e) => updateGuests(e)}>
                        {[1, 2, 3, 4].map(day => <option {...day == 1 && 'selected'} value={day}>{day}</option>)}
                    </select>
                </div>
                <div className="inputItem">

                    <p>Number of Nights </p>
                    <select class="form-select" aria-label="Default select example" onChange={(e) => updateNights(e)}>
                        {[1, 2, 3, 4].map(day => <option {...day == 1 && 'selected'} value={day}>{day}</option>)}
                    </select>
                </div>

            </div>
            <Button style={{ width: '120px', margin: 'auto', marginTop: '25px', marginBottom: '10px' }} onClick={handleBooking}>
                Book Room
            </Button>
        </div>
        {message != '' && <div className="message">
            <p>{message}</p>
        </div>}
    </Container>)
}

export default BookRoom;