import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import ReservationItem from "./ReservationItem";
import '../Room/BookRoom.css';

const DeleteReservation = ({ currentUser }) => {

    const [reservations, setReservations] = useState([]);
    const [message, setMessage] = useState('')
    const { guestId } = useParams();

    async function getReservations(guestId) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('Access-Control-Allow-Credentials', 'POST, GET, OPTIONS');
        myHeaders.append('Access-Control-Allow-Headers', 'Content-Type');
        myHeaders.append('Accept', 'application/json');
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            referrerPolicy: 'unsafe-url',
            mode: 'cors',
        };
        const response = await fetch('http://localhost:8084/Reservation/getReservations?id=' + guestId, requestOptions).then(response => { return response.json() });
        return response;
    }

    const cancelReservation = async (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('Access-Control-Allow-Credentials', 'POST, GET, OPTIONS');
        myHeaders.append('Access-Control-Allow-Headers', 'Content-Type');
        myHeaders.append('Accept', 'application/json');
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            referrerPolicy: 'unsafe-url',
            mode: 'cors',
        };
        const response = await fetch(`http://localhost:8084/Reservation/deleteReservation/${id}`, requestOptions).then(response => { return response.text() });
        setMessage(response)
        setReservations((prev) => {
            return prev.filter(reserve => reserve.id != id)
        })
    }

    useEffect(async () => {
        const response = await getReservations(guestId);
        setReservations(response)
        console.log(reservations)
    }, [guestId]);
    return <Container style={{ margin: '25px auto' }}>
        <h1>
            Recent Reservations
        </h1>
        {reservations.map(reservation => <ReservationItem key={reservation.id} reservation={reservation} cancelReservation={cancelReservation} />)}
        {message != '' && <div className="message">
            <p>{message}</p>
        </div>}
    </Container>
}

export default DeleteReservation;