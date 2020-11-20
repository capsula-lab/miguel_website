import React from "react";
import GalleryStyle from "./Gallery.css"
import {Container, Grid} from '@material-ui/core';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageNames: this.props.imageNames.split(';'),
      captions: this.props.captions.split(';'),
      galleryIndex: 0,
      imgUrl: this.props.ImageNames
    }
    this.galleryArrow = this.galleryArrow.bind(this);
  }

  galleryArrow(event, increment) {
    if(this.state.galleryIndex == 0 && increment == -1){
      this.setState({galleryIndex: this.state.imageNames.length -1});
    }
    else if (this.state.galleryIndex == this.state.imageNames.length-1 && increment == 1){
      this.setState({galleryIndex: 0});
    }
    else {
      let newIndex = this.state.galleryIndex + increment;
      this.setState({galleryIndex: newIndex });
    }
    let url = "https://storage.googleapis.com/website_media/" + this.state.imageNames[this.state.GalleryIndex];
    this.setState({imgUrl: url});
  }

  render() {

    let caption = [];
    this.state.captions.map((value, index) => {
      caption[index] = value;
     })
    let captions = [];
    caption.map((value, index) => {
      let value2 = value.split(';');
      return value2.map((value,index) => {
         captions.push(<span id="caption">{value}</span>);
      })
     })

   let path = [];
   this.state.imageNames.map((value, index) => {
     path[index] = value;
    })

   let images = [];
   path.map((value, index) => {
     let value2 = value.split(';');
     return value2.map((value,index) => {
       if((value.substring(value.length - 4,value.length) == '.mp4') || (value.substring(value.length - 4,value.length) == '.mov')){
         let href = "https://storage.googleapis.com/website_media/" + value;
         images.push(<video  controls id="galleryImageVideo" src={href}/>);
       }
        else {
          let href = "https://storage.googleapis.com/website_media/" + value;
          images.push(<div style={{'height': '470px'}}><span class="helper"></span><img id="galleryImage" src={href} /></div>);
        }
     })
    })
    let isMoreThanOne = (images.length == 1);

    let bttnLeftText = "<";
    let bttnRightText = ">";



    return(
      <Grid item xs={12}>
        <Grid id="image_gallery" container>
          <div style={{'height': '510px','width':'800px','display': 'flex'}} >
              <Grid xs={1} id="menu" item>
              {isMoreThanOne
                ? <div style={{'width':'30px','height': '300px','margin-top':'105px'}}></div>:<button id="arrows" onClick={(event) => this.galleryArrow(event,-1)} >{bttnLeftText}</button>
              }
              </Grid>
              <Grid xs={9} id="menu" item>
              <div>
                {images[this.state.galleryIndex]}
                {captions[this.state.galleryIndex]}
              </div>
              </Grid>
              <Grid xs={1} id="menu" item>
              {isMoreThanOne
                ? <div style={{'width':'30px','height': '300px','margin-top':'105px'}}></div>:<button id="arrows" onClick={(event) => this.galleryArrow(event,1)} >{bttnRightText}</button>
              }
              </Grid>
            </div>
        </Grid>
      </Grid>
    )
  }
}

export default Gallery
