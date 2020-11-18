import React from "react";
import Gallery from './Gallery.js';



class Project extends React.Component {
  render() {
    let galleryIndex = 0;
    let media = this.props.data[6];
    let caption = this.props.data[5];

      return(
        <div id={this.props.data[1]}>
           <h1>{this.props.data[1]}</h1>
           <p>{this.props.data[2]}</p>
           <p>{this.props.data[3]}</p>
           <Gallery
           imageNames = {media}
           captions = {caption}
           />
        </div>
      )
  }
}


export default Project
