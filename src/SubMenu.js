import React from "react";
import AnchorLink from 'react-anchor-link-smooth-scroll';

class SubMenu extends React.Component  {
  constructor() {
    super();
    this.state = {
        inMenu:['normal','normal','normal','normal','normal','normal','normal','normal','normal']
    }
    this.menuOnClick = this.menuOnClick.bind(this);
  }

  menuOnClick = (event, index) => {
    let newInMenu = ['normal','normal','normal','normal','normal','normal','normal','normal','normal'];
    newInMenu[index] = 'bold';
    this.setState({inMenu:newInMenu})
  };


    render() {
      return(
        <div>
        {this.props.list.map((value, index) => {
          let href = "#" + value;
           return <AnchorLink style={{'text-decoration': 'none','font-weight': this.state.inMenu[index]}} href={href}><span onClick={(event) => this.menuOnClick(event,index)} style={{'margin-left':'10px'}}>{value}</span></AnchorLink>
         })}
         </div>
      )
    }

}

export default SubMenu
