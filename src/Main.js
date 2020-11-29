import React, {ReactDOM, Component, PropTypes } from "react";
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
import Footer from './Footer.js'
import SubMenu from './SubMenu.js'

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
        projectsSelvIkei: [],
        projectsOpaaco: [],
        projectsCasulo: [],
        projectsToRender: [],
        inMenu:[false,false,false],
        casulo: 'normal',
        opaaco: 'normal',
        selv_ikei: 'normal'
    }
    this.splitter = this.splitter.bind(this);
    this.menuOnClick = this.menuOnClick.bind(this);
    this.boldChanger = this.boldChanger.bind(this);

      readRemoteFile("https://www.miguelzurkcruz.com/projectos.csv", {
            complete: (results) => {
              let projectData = results['data']
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
                  projectData:projectData,
                  projectsSelvIkei:projectsSelvIkei,
                  projectsOpaaco:projectsOpaaco,
                  projectsCasulo:projectsCasulo,
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
    return projects;
  };

  boldChanger = (name,booliana) => {
    if(booliana){
      let newInMenu = this.state.inMenu;
      newInMenu[0] = false;
      newInMenu[1] = false;
      newInMenu[2] = false;
      if(name == 'casulo'){
        newInMenu[0] = true;
        this.setState({inMenu: newInMenu});
      } else if(name == 'opaaco') {
        newInMenu[1] = true;
        this.setState({inMenu: newInMenu});
      } else if(name== 'selv_ikei') {
        newInMenu[2] = true;
        this.setState({inMenu: newInMenu});
      }
      console.log('doing bold changes to: ' + name);
      this.setState({casulo:'normal',opaaco:'normal','selv_ikei':'normal'})
      this.setState({[name]:'bold'});
    }
  };

  menuOnClick = (event, artist) => {
    let newInMenu = this.state.inMenu;
    newInMenu[0] = false;
    newInMenu[1] = false;
    newInMenu[2] = false;
    if(artist == 'casulo'){
      newInMenu[0] = true;
      this.setState({inMenu: newInMenu});
    } else if(artist == 'opaaco') {
      newInMenu[1] = true;
      this.setState({inMenu: newInMenu});
    } else if(artist== 'selvIkei') {
      newInMenu[2] = true;
      this.setState({inMenu: newInMenu});
    }
    this.setState({casulo:'normal',opaaco:'normal','selv_ikei':'normal'})
    this.setState({[artist]:'bold'});
  };

  componentDidMount() {
    const options = {
      threshold: 0.7
    };
    const listOfProjects = [document.querySelector('#opaaco'),document.querySelector('#casulo'),document.querySelector('#selv_ikei')];
    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        this.boldChanger(entry.target.id, entry.isIntersecting);
      })
    }.bind(this),options);
    listOfProjects.forEach(project => {observer.observe(project);});
  }


  render() {
    const bioMiguel = <p>maker autodidacta e investigador del error. <br />  mi trabajo se centra principalmente en el ámbito del arte tecnológico donde intento encontrar un balance entre la investigación y la creación de objetos y/o contenidos no palpables. Mis piezas son fruto de una dualidad en que se equilibra una voluntad por solucionar necesidades objetivas y técnicas, poniéndolas en contraste con visiones e interpretaciones desde una perspectiva subjetiva así como de perspectivas de creadores/as a mi alrededor."</p>;
    const bioSelvIkei = <p><b>selv ikei</b> se dedica únicamente al sonido y a las diferentes formas de expresarlo e interpretarlo. Aunque toda la música sea sonido ni todos los sonidos son música y eso algo bien presente en las collage sónicas de este proyecto donde capas y capas de sonidos sintéticos, fríos, apáticos se hunden entre bajos metálicos, redondos y estáticos en un limbo entre lo agradable y lo disonante. Sus paisajes sonoros surgen de una mezcla entre instrumentos electrónicos sintéticos, grabaciones de campo manipuladas e instrumentos electro-acústicos hechos a mano por casulo creando ambientes comúnmente descritos como alusivos a una concepción amarga de la nostalgia.</p>;
    const bioOpaaco= <p><b>opaaco</b> es un artista visual multimedia autodidacta que a través de sus experimentos erráticos crea entornos visuales orgánicos. Es frecuente encontrarlo moldeando ideas rodeado por objetos que poco tienen que ver entre si. Teles destripadas, desechos de laboratorios obsoletos, quimicos para revelación caducados, lupas, imanes, microscópicos amontonados con las máquinas hechas a medida por casulo. Es el personaje menos técnico de los 3, vivido adepto de la prueba/error y poco apologista de la teoría antes de la práctica. Experimentador nato con una necesidad incontrolable por no hacer las cosas bién. Su naturaleza caótica pero maleable se dá bien en entornos ruidosos con luces poco estáticas.</p>;
    const bioCasulo= <p><b>casulo</b> es el personaje que se encarga de la idealización, construcción y reparación del hardware de los demás proyectos. Es el personaje más técnico, formal y tradicional de los 3. Es un científico que poco uso recreativo dá a las máquinas que construye, enfocando más su dedicación en la investigación y desarrollo de nuevas formas de interacción hombre-máquina con el objetivo de permitir o simplemente facilitar el proceso creativo de otros artistas/creadorxs, explorando nuevas formas de expresión. Suele darse bien en ambientes silenciosos y bien iluminados.</p>;
    return (
      <div>
      <Container id="page">
      <Grid item xs={12}>
        <Grid container>
            <Grid xs={4} item>
              <Grid id="menuBox" container>
                <Grid xs={1} id="menu" item>
                  <StickyBox offsetTop={20} offsetBottom={20}>
                    <AnchorLink href="#casulo" style={ {'font-weight': this.state.casulo} }><span id="smoothLink" style={{'margin-top':'110px'}} onClick={(event) => this.menuOnClick(event,'casulo')}>casulo</span></AnchorLink>
                    <AnchorLink href="#opaaco" style={ {'font-weight': this.state.opaaco} }><span id="smoothLink" style={{'margin-top':'130px'}} onClick={(event) => this.menuOnClick(event,'opaaco')}>opaaco</span></AnchorLink>
                    <AnchorLink href="#selv_ikei" style={ {'font-weight': this.state.selv_ikei} }><span id="smoothLink" style={{'margin-top':'130px','white-space': 'nowrap'}} onClick={(event) => this.menuOnClick(event,'selvIkei')}>selv ikei</span></AnchorLink>
                  </StickyBox>
                </Grid>
                <Grid xs={10} item>
                  <StickyBox offsetBottom={20}>
                  {this.state.inMenu[0]
                    ? <div style={{'margin-top':'80px'}} id="subMenuCasulo">
                     <SubMenu list={this.state.projectsCasulo} />
                      </div>
                    :<div style={{'margin-top':'90px'}} id="subMenuCasulo"><p> </p></div>
                  }
                  {this.state.inMenu[1]
                    ? <div style={{'margin-top':'230px'}} id="subMenuCasulo">
                    <SubMenu list={this.state.projectsOpaaco} />
                    </div>:<div style={{'margin-top':'110px'}} id="subMenuCasulo"><p> </p></div>
                  }
                  {this.state.inMenu[2]
                    ? <div style={{'margin-top':'360px'}} id="subMenuCasulo">
                    <SubMenu list={this.state.projectsSelvIkei} />
                    </div>:<div style={{'margin-top':'110px'}} id="subMenuCasulo"><p> </p></div>
                  }
                  </StickyBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={8} item>
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
              projectNames={'casulo'}
              projectData={this.state.projectData} />
              <Projects />
              <Profile
              name="opaaco"
              picture="picOpaaco.jpg"
              bio={bioOpaaco}
              />
              <Projects
              projectNames={'opaaco'}
              projectData={this.state.projectData} />
              <Profile
              name="selv ikei"
              picture="picSelvinho.jpeg"
              bio={bioSelvIkei}
              />
              <Projects
              projectNames={'selv ikei'}
              projectData={this.state.projectData} />
            </Grid>
            <Footer />
        </Grid>
      </Grid>
      </Container>
      </div>
    );
  }
}

export default Main;
