import * as React from 'react';
import NavBar from '../components/NavBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // if you want the blur effect

export default function ActionAreaCard() {
  const lessons = [
    { date: "07-05-2023", day: "Wednesday" },
    { date: "07-07-2023", day: "Friday" },
    { date: "07-10-2023", day: "Monday" }
    // { date: "07-10-2023", day: "Monday" },
    // add more classes as needed
  ];

  return (
    <React.Fragment>
      <NavBar />
      <Box sx={{ mt: 2, padding: '16px' }}>
        <Grid container spacing={2} justifyContent="center">
          {lessons.map((lesson, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '8px' }}>
                <CardActionArea component={RouterLink} to={`/notes/day${index + 1}`}>
                  <LazyLoadImage 
                    src="/day1.jpg" // replace with the path to your image
                    alt="Python Class day"
                    height="350px"
                    effect="blur" // remove this line if you don't want the blur effect
                    style={{ width: '100%', objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="subtitle1" component="div">
                      {`Python Class ${index + 1}`}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {`Class on ${lesson.day}, ${lesson.date}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
}
