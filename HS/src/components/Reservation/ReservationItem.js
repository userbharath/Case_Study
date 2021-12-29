import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import './ReservationItem.css';
const ReservationItem = ({ reservation, cancelReservation }) => {
    
    return <Card className="reservationItem">
        <CardBody>
            <CardTitle tag="h5">
                Room No: {reservation.roomId}
            </CardTitle>
            <CardSubtitle
                className="mt-2 mb-2 text-muted"
                tag="h6"
            >
                Check-IN: {reservation.checkInDate}
            </CardSubtitle>
            <CardSubtitle
                className="mt-2 mb-2 text-muted"
                tag="h6"
            >
                Check-OUT: {reservation.checkOutDate}
            </CardSubtitle>
            <CardText style={{fontSize:"20px"}}>
                Number of Guests: {reservation.noOfGuest}
            </CardText>
            <Button className="float-right" style={{backgroundColor: '#e76f51'}} onClick={()=>cancelReservation(reservation.id)}>Cancel</Button>
        </CardBody>
    </Card>
}

export default ReservationItem;