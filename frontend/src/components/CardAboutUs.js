import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea'
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
import LinkedInIcon from '@material-ui/icons/LinkedIn';


const useStyles = makeStyles(() => ({
  media: {
    height: '0',
    width: '200px',
    paddingTop: '56.25%', // 16:9
    borderRadius: '50%',
    margin: '0 auto'
  },
  avatar: {
    backgroundColor: "#3f51b5",
  },
  card:{
    width: 345,
    boxShadow:"6px 4px 0px 0px rgba(0,0,0,0.75)",
    border:"1px solid  #ccc",
    transition:"0.95s",
    '&:hover': {
      backgroundColor:"coral"
   },
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between'
  }
}));

const RecipeReviewCard = (props)=> {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
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
          image={props.avatar || avatar}
          title="Avatar"
        />
        <CardContent style={{minHeight: '100px', marginBottom: '10px'}}>
          <Typography variant="body2" color="textSecondary" component="p">
          {props.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        {props.github ? 
          <a href={props.github} target="_blank">
            <IconButton>
              <GitHubIcon />
            </IconButton>
          </a>
        : ''}

        {props.instagram ? 
          <a href={props.instagram} target="_blank">
            <IconButton>
              <InstagramIcon />
            </IconButton>
          </a>
        : ''}
        {props.linkedin ? 
          <a href={props.linkedin} target="_blank">
            <IconButton>
              <LinkedInIcon />
            </IconButton>
          </a>
        : ''}
      </CardActions>
    </Card>
  );
}

export default RecipeReviewCard