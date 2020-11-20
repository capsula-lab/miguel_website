import React from "react";
import {Grid} from '@material-ui/core';

class Footer extends React.Component  {
    render() {
      return(
        <Grid item xs={12}>
          <Grid id="image_gallery" justify="center" container>
            <Grid item>
              <div id="footer" style={{'margin-top':'60px','margin-bottom':'20px'}}>
                <a href="mailto:miguelzurkcruz@gmail.com">miguelzurkcruz@gmail.com</a> <b style={{'color':'white'}}>   /   </b>
                <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons - Atribuição-NãoComercial-SemDerivações 4.0 Internacional</a>
              </div>
            </Grid>
          </Grid>
        </Grid>
              )
    }

}

export default Footer
