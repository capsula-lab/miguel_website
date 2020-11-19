import React from "react";
import ProfileStyle from "./Profile.css";


class Profile extends React.Component  {
    render() {
      let imgSrc = "https://storage.googleapis.com/website_media/MEDIA/other/" + this.props.picture;
      let id = this.props.name.replace(" ", "_");
      return(
        <div id= {id} class="Project" style={{'margin-top':'30px'}}>
          <img src= {imgSrc} />
          <h1>{this.props.name}</h1>
          <span id="bio">{this.props.bio}</span>
        </div>
      )
    }

}

export default Profile
