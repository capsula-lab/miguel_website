import React from "react";
import Gallery from './Gallery.js';
import ProjectStyle from './Project.css';
import {Container, Grid} from '@material-ui/core';



class Project extends React.Component {
  render() {
    let galleryIndex = 0;
    let media = this.props.data[6];
    let caption = this.props.data[5];

      return(
        <div id="projecto" id={this.props.data[1]}>
        <Grid item xs={12}>
          <Grid id="image_gallery" container>
                <Grid xs={7} id="menu" item>
                <div id='projectBio' dangerouslySetInnerHTML={{__html: this.props.data[3]}} />
                </Grid>
                <Grid id='dateAndTitle' xs={5} id="menu" item>
                  <h1 id='projectTitle'>{this.props.data[1]}</h1>
                  <p id='projectDate'>{this.props.data[2]}</p>
                </Grid>
            </Grid>
        </Grid>
           <Gallery
           imageNames = {media}
           captions = {caption}
           />
        </div>
      )
  }
}


export default Project
