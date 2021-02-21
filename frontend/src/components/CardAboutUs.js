import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import avatar from "../assets/AboutUsAvatar.png";
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';


const useStyles = makeStyles(() => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: "#3f51b5",
  },
  card:{
    maxWidth: 345,
    boxShadow:"6px 4px 0px 0px rgba(0,0,0,0.75)",
    border:"1px solid  #ccc",
    transition:"0.95s",
    '&:hover': {
      backgroundColor:"coral"
   }
  }
}));

const RecipeReviewCard = (props)=> {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
           { props.init}
          </Avatar>
        }
        title={props.fullName}
        subheader={props.location}
      />
      <CardMedia
        className={classes.media}
        image={avatar}
        title="Avatar"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {props.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <GitHubIcon/>
        </IconButton>
        <IconButton aria-label="share">
          <InstagramIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default RecipeReviewCard