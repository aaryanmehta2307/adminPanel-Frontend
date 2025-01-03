

import React, { useEffect, useState } from "react";
import {
  Card, CardContent, CardActions, Button, Typography,
  Container, Grid, List, ListItem, ListItemText, Divider,
  CardHeader, Avatar
} from "@mui/material";
import { LocalHospital, School } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Appbar from "../Appbar";
import "../Hospital/css/Hospitals.css";

function Ambulances({ userType, userName, setUserName }) {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_GET_HOSPITALS}`, {
      headers: {
        // "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(res => {
      // as the data array contains the info of hospital 
      setHospitals(res.data.data);
    });
  }, []);

  return (
    <div>
      {/* {userType === "admin" || userType === "user" ? ( */}
        <Appbar userName={userName} setUserName={setUserName} />
      {/* ) : null} */}
      <Container className="hospitals-container">
        <Typography variant="h3" className="hospitals-title">
          Ambulance
        </Typography>
        <Grid container spacing={3} className="hospitals-grid">
          {hospitals.map((hospital) => (
            <Grid item xs={12} sm={6} md={4} key={hospital._id}>
              <Hospital hospital={hospital} />
            </Grid>
          ))}
        </Grid>

        {/* {JSON.stringify(hospitals)} */}
      </Container>
    </div>
  );
}

function Hospital({ hospital }) {
  const navigate = useNavigate();

  const handleViewDoctors = () => {
    navigate("/hospital/" + hospital._id + "/doctors");
  };

  return (
    <Card className="hospital-card">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#008080' }}>
            <LocalHospital />
          </Avatar>
        }
        title={
          <Typography variant="h6" className="hospital-name">
            {hospital.name}
          </Typography>
        }

        subheader={
          <>
            <Typography variant="body2" className="hospital-address">
              {hospital.hospitalId}
            </Typography>
            <Typography variant="body2" className="hospital-address">
              {hospital.hospitalType}
            </Typography>
          </>
        }
      />
<CardContent className="hospital-card-content">
  <Typography variant="subtitle1" gutterBottom>
    Ambulance:
  </Typography>
  <List>
  {/* map over labs */}
    {hospital.ambulance.map((lab, index) => (
      <ListItem key={index}>
        <ListItemText primary={lab} />
      </ListItem>
    ))}
  </List>
</CardContent>
      <CardActions className="hospital-card-actions">
      <Button
        size="small"
        variant="outlined"
        style={{ color: '#008080' }}
        onClick={() => navigate(`/ambulance/${hospital.hospitalId}`)}
      >
        Edit
      </Button>
      <Button
        size="small"
        variant="outlined"
        style={{ color: '#008080' }}
        onClick={() => navigate(`/ambulance/add/${hospital.hospitalId}`)}
      >
        Add
      </Button>
      </CardActions>
      
    </Card >

  );
}



export default Ambulances;