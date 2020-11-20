import React from "react";
import Project from './Project.js';
import {readRemoteFile} from 'react-papaparse';

class Projects extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      names: []
    };
    this.splitter = this.splitter.bind(this);

      readRemoteFile("https://www.miguelzurkcruz.com/projectos.csv", {
            complete: (results) => {
              console.log("completed results");
              this.splitter(results['data']);
            },
          });
  }

  splitter = (results) => {
    let projectsSelvIkei = [];
    let dadosLength = results.length;
    let filteredCount = 0;
    for (let i = 1; i < dadosLength; i++) {
      if(results[i][0] == this.props.projectNames){
        projectsSelvIkei[filteredCount] = results[i];
        let joined = this.state.names.concat([<Project data={projectsSelvIkei[filteredCount]} />]);
        this.setState({names:joined});
        filteredCount++;
      }
    }
  };

  render() {
      return(
        <div id="projects">

        {this.state.names}

        </div>
      )
  }
}


export default Projects
