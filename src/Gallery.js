import React from "react";
import GalleryStyle from "./Gallery.css"

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageNames: this.props.imageNames.split(';'),
      captions: this.props.captions.split(';'),
      galleryIndex: 0,
      imgUrl: "http://localhost:3001/" + this.props.ImageNames
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
    let url = "http://localhost:3001/" + this.state.imageNames[this.state.GalleryIndex];
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
         captions.push(<span>{value}</span>);
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
       let href = "http://localhost:3001/" + value;
        images.push(<img id="galleryImage" src={href} />);
     })
    })
    let isMoreThanOne = (images.length == 1);

    return(
      <div id="image_gallery">
        <div style={{'height': '400px','width':'550px','display': 'flex'}}>
          {isMoreThanOne
            ? <div></div>:<button onClick={(event) => this.galleryArrow(event,-1)} >Left</button>
          }

        <div>
        <div style={{'width':'500px'}}>
        {images[this.state.galleryIndex]}
        {captions[this.state.galleryIndex]}
        </div>
        </div>
        {isMoreThanOne
          ? <div></div>:<button onClick={(event) => this.galleryArrow(event,1)} >Right</button>
        }
        </div>
      </div>
    )
  }
}

export default Gallery
