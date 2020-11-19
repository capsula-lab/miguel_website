import React from "react";
import Gallery from './Gallery.js';
import ProjectStyle from './Project.css';



class Project extends React.Component {
  render() {
    let galleryIndex = 0;
    let media = this.props.data[6];
    let caption = this.props.data[5];

      return(
        <div class="projecto" id={this.props.data[1]}>
           <h1 id='projectTitle'>{this.props.data[1]}</h1>
           <p id='projectDate'>{this.props.data[2]}</p>
           <div id='projectBio' dangerouslySetInnerHTML={{__html: this.props.data[3]}} />
           <Gallery
           imageNames = {media}
           captions = {caption}
           />
        </div>
      )
  }
}


export default Project
