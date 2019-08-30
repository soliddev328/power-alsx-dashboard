import { useEffect, useState } from "react"
import GoogleMapReact from "google-map-react"
import Container from "../../components/Container"
import Text from "../Text"

export default function UsersInAreaMap() {
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
        console.log(position)
      })
    }
  }, [])

  return (
    <div className="wrapper">
      <Container height="250px">
        <GoogleMapReact
          center={[lat, lng]}
          zoom={15}
          options={{
            disableDefaultUI: true,
            gestureHandling: "none",
            zoomControl: false
          }}
          overlayViewDivStyle={{ pointerEvents: "none" }}
          bootstrapURLKeys={{ key: "AIzaSyA1ifW2pZAo6qVj-vVYGI9ab3MHPeW-70w" }}
        ></GoogleMapReact>
      </Container>
      <div className="users-orb">
        <Text h4 bold noMargin>
          5
        </Text>
        <Text>users in this area</Text>
      </div>
      <style jsx>{`
        .wrapper {
          position: relative;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        .users-orb {
          position: absolute;
          left: 50%;
          top: 50%;
          background: #fff;
          border-radius: 50%;
          width: 180px;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border: 2px solid #41ef8b;
          transform: translate(-50%, -50%);
        }

        .users-orb:before {
          content: "";
          border-radius: 50%;
          border: 2px solid #2479ff;
          width: 195px;
          height: 195px;
          position: absolute;
        }
      `}</style>
    </div>
  )
}
