import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Event } from "./mocks/handlers";

function App() {
  const [getEvents, setEvents] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/api/events");
    const data = await response.json();
    setEvents(data.events);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={10}
    >
      {getEvents.map((event: Event) => (
        <Grid item>
          <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={event.image}
                alt="green iguana"
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {event.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {event.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default App;
