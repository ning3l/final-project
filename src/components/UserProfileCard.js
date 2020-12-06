import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import event1 from "../assets/eventImages/event-1.jpg";
import event2 from "../assets/eventImages/event-2.jpg";
import event3 from "../assets/eventImages/event-3.jpg";
import event4 from "../assets/eventImages/event-4.jpg";
import event5 from "../assets/eventImages/event-5.jpg";
import event6 from "../assets/eventImages/event-6.jpg";
import event7 from "../assets/eventImages/event-7.jpg";

const useStyles = makeStyles({
  root: {
    width: 345,
    margin: "20px",
  },
  media: {
    height: 140,
  },
});

export default function UserProfileCard({ el }) {
  const classes = useStyles();

  const eventPics = [event1, event2, event3, event4, event5, event6, event7];

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${eventPics[el.img]}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {el.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {el.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Leave
        </Button>
      </CardActions>
    </Card>
  );
}
