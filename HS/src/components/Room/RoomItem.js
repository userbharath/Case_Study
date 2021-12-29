import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

const RoomItem = ({ room }) => {
    return <Card>
        <CardBody>
            <CardTitle tag="h5">
                Room No: {room.roomNum}
            </CardTitle>
            <CardSubtitle
                className="mt-2 mb-2 text-muted"
                tag="h6"
            >
                Price: {room.roomRent}$
            </CardSubtitle>
            <CardSubtitle
                className="mt-2 mb-2 text-muted"
                tag="h6"
            >
                Type: {room.type}
            </CardSubtitle>
            <CardText style={{fontSize:"20px"}}>
                Description: {room.desc}
            </CardText>
            <Button className="float-right">
                <Link to={'/reservation/'+room.roomNum} style={{color:'#fff', textDecoration:'none'}}>Book Now</Link>
            </Button>
        </CardBody>
    </Card>
}

export default RoomItem;