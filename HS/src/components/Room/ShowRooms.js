import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import RoomItem from "./RoomItem";

const ShowRooms = ({ currentUser }) => {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8087/Room/getAvlRooms', {
            referrerPolicy: 'unsafe-url',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
        }).then(response => { return response.json() }).then(data => {
            setRooms(data.allRooms)
        })
    }, []);
    return (
        <Container>
        <h1 style={{ textAlign: 'center', margin: '25px' }}>Available Rooms</h1>
            <ul className="list-group w-70">
                {rooms.map(room => <RoomItem className="list-group-item" key={room.roomNum} room={room} />)}
            </ul>
        </Container>
    )
}
export default ShowRooms;