import React from "react";
import logo from './logo.svg';
import './Main.css';
import {Container, Grid} from '@material-ui/core';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Projects from './Projects.js';
import CSVReader from 'react-csv-reader';
import {readRemoteFile} from 'react-papaparse';
import StickyBox from "react-sticky-box";
import "intersection-observer";
import ProfileStyle from "./Profile.css";
import { useIsVisible } from "react-is-visible";
import Profile from './Profile.js'

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
        projectsSelvIkei: [],
        projectsOpaaco: [],
        projectsCasulo: [],
        projectsToRender: []
    }
    this.splitter = this.splitter.bind(this);
    this.menuOnClick = this.menuOnClick.bind(this);

      readRemoteFile("http://localhost:3001/projectos.csv", {
            complete: (results) => {
              let projectsSelvIkei = this.splitter(results['data'], 'selv ikei');
              let projectsSelvIkeiMenu = {}
              for (let i in projectsSelvIkei) {
                  let datum = projectsSelvIkei[i];
                  projectsSelvIkeiMenu[datum.val] = 0.9
              }
              this.setState({projectsSelvIkeiMenu:projectsSelvIkeiMenu})
              let projectsOpaaco = this.splitter(results['data'], 'opaaco');
              let projectsCasulo = this.splitter(results['data'], 'casulo');
              this.setState(
                {
                  projectsSelvIkei:projectsSelvIkei,
                  projectsOpaaco:projectsOpaaco,
                  projectsCasulo:projectsCasulo,
                  projectsToRender:projectsCasulo,
                  casulo: 'bold',
                  opaaco: 'normal',
                  selvIkei: 'normal'
                }
              );

            },
          });
  }

  splitter = (results, artist) => {
    let projects = [];
    let dadosLength = results.length;
    let filteredCount = 0;
    for (let i = 1; i < dadosLength; i++) {
      if(results[i][0] == artist){
        projects[filteredCount] = results[i][1];
        filteredCount++;
      }
    }
    console.log(projects);
    return projects;
  };

  boldChanger = (isVisible, name) => {
    if (isVisible == true) {
        this.setState({[name]:'bold'})
    }
  };

  menuOnClick = (event, artist) => {
    let projectsToRender
    if(artist == 'casulo'){
      projectsToRender = this.state.projectsCasulo
    } else if(artist == 'opaaco') {
      projectsToRender = this.state.projectsOpaaco;
    } else if(artist== 'selvIkei') {
      projectsToRender = this.state.projectsSelvIkei;
    }
    this.setState({casulo:'normal',opaaco:'normal','selvIkei':'normal'})
    this.setState({[artist]:'bold'});
    this.setState({projectsToRender:projectsToRender});
  };

  submenuOnClick = (event, project) => {

  };

  render() {
    const bioMiguel = <p>maker autodidacta e investigador del error. <br />  mi trabajo se centra principalmente en el ámbito del arte tecnológico donde intento encontrar un balance entre la investigación y la creación de objetos y/o contenidos no palpables. Mis piezas son fruto de una dualidad en que se equilibra una voluntad por solucionar necesidades objetivas y técnicas, poniéndolas en contraste con visiones e interpretaciones desde una perspectiva subjetiva así como de perspectivas de creadores/as a mi alrededor."</p>;
    const bioSelvIkei = <p><b>selv ikei</b> se dedica únicamente al sonido y a las diferentes formas de expresarlo e interpretarlo. Aunque toda la música sea sonido ni todos los sonidos son música y eso algo bien presente en las collage sónicas de este proyecto donde capas y capas de sonidos sintéticos, fríos, apáticos se hunden entre bajos metálicos, redondos y estáticos en un limbo entre lo agradable y lo disonante. Sus paisajes sonoros surgen de una mezcla entre instrumentos electrónicos sintéticos, grabaciones de campo manipuladas e instrumentos electro-acústicos hechos a mano por casulo creando ambientes comúnmente descritos como alusivos a una concepción amarga de la nostalgia.</p>;
    const bioOpaaco= <p><b>opaaco</b> es un artista visual multimedia autodidacta que a través de sus experimentos erráticos crea entornos visuales orgánicos. Es frecuente encontrarlo moldeando ideas rodeado por objetos que poco tienen que ver entre si. Teles destripadas, desechos de laboratorios obsoletos, quimicos para revelación caducados, lupas, imanes, microscópicos amontonados con las máquinas hechas a medida por casulo. Es el personaje menos técnico de los 3, vivido adepto de la prueba/error y poco apologista de la teoría antes de la práctica. Experimentador nato con una necesidad incontrolable por no hacer las cosas bién. Su naturaleza caótica pero maleable se dá bien en entornos ruidosos con luces poco estáticas.</p>;
    const bioCasulo= <p><b>casulo</b> es el personaje que se encarga de la idealización, construcción y reparación del hardware de los demás proyectos. Es el personaje más técnico, formal y tradicional de los 3. Es un científico que poco uso recreativo dá a las máquinas que construye, enfocando más su dedicación en la investigación y desarrollo de nuevas formas de interacción hombre-máquina con el objetivo de permitir o simplemente facilitar el proceso creativo de otros artistas/creadorxs, explorando nuevas formas de expresión. Suele darse bien en ambientes silenciosos y bien iluminados.</p>;
    return (
      <Container id="page">
      <Grid item xs={12}>
        <Grid container>
            <Grid xs={1} id="menu" item>
              <StickyBox offsetTop={20} offsetBottom={20}>
                <AnchorLink href="#casulo" style={ {'font-weight': this.state.casulo} }><span id="smoothLink" style={{'margin-top':'60px'}} onClick={(event) => this.menuOnClick(event,'casulo')}>casulo</span></AnchorLink>
                <AnchorLink href="#opaaco" style={ {'font-weight': this.state.opaaco} }><span id="smoothLink" style={{'margin-top':'110px'}} onClick={(event) => this.menuOnClick(event,'opaaco')}>opaaco</span></AnchorLink>
                <AnchorLink href="#selv_ikei" style={ {'font-weight': this.state.selvIkei} }><span id="smoothLink" style={{'margin-top':'130px'}} onClick={(event) => this.menuOnClick(event,'selvIkei')}>selvIkei</span></AnchorLink>
              </StickyBox>
            </Grid>
            <Grid xs={3} item>
              <StickyBox offsetTop={20} offsetBottom={20}>
                <div id="personas_projects">
                   {this.state.projectsToRender.map((value, index) => {
                     let href = "#" + value;
                      return <AnchorLink style={{'text-decoration': 'none'}} href={href}><span style={{'margin-left':'10px'}}>{value}</span></AnchorLink>
                    })}
                </div>
              </StickyBox>
            </Grid>
            <Grid xs={7} item>
              <Profile
              name="miguel zurk cruz"
              picture="picMiguel.jpg"
              bio={bioMiguel}
              />
              <Profile
              name="casulo"
              picture="picCasulo.jpg"
              bio={bioCasulo}
              />
              <Projects
              projectNames={'casulo'} />
              <Projects />
              <Profile
              name="opaaco"
              picture="picOpaaco.jpg"
              bio={bioOpaaco}
              />
              <Projects
              projectNames={'opaaco'} />
              <Profile
              name="selv ikei"
              picture="picSelvinho.jpeg"
              bio={bioSelvIkei}
              />
              <Projects
              projectNames={'selv ikei'} />
            </Grid>
        </Grid>
      </Grid>
      </Container>
    );
  }
}

export default Main;
