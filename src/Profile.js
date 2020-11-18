import React from "react";
import ProfileStyle from "./Profile.css";


class Profile extends React.Component  {
    render() {
      let imgSrc = "http://localhost:3001/" + this.props.picture;
      let id = this.props.name.replace(" ", "_");
      return(
        <div id= {id} class="Project" style={{'margin-top':'30px'}}>
          <img src= {imgSrc} />
          <h1>{this.props.name}</h1>
          {this.props.bio}
        </div>
      )
    }

}

export default Profile
