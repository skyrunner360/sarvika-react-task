import React from 'react'
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Taskdesc(props) {
    // Get date into date variable for formatting
    let date = new Date(props.TaskDescrip.createdAt);
    return (
    <>
    {   <div>
        {/* Material UI Card */}
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Your Task Details
        </Typography>
        <Typography variant="h5" component="div">
          Task Description
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.TaskDescrip.description}
        </Typography>
        <Typography variant="body2">
          Task Created on
          <br />
          {date.toLocaleDateString()+" At: "+date.toLocaleTimeString()}
        </Typography>
      </CardContent>
      <CardActions>
          <Link to="/home">
        <Button size="small">Go back</Button>
        </Link>
      </CardActions>
    </Card>
        </div>
    }
    </>
    )
}
