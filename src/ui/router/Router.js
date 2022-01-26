import {BrowserRouter, Link, Route} from "react-router-dom";
import PlayersList from "../players/PlayersList";
import ObjectsList from "../objects/ObjectsList";
import MatchesList from "../matches/MatchesList";
import PlayersForm from "../players/PlayersForm";
import ObjectsForm from "../objects/ObjectsForm";
import MatchesForm from "../matches/MatchesForm";
import {getMatchesList} from "../../ducks/matches/operations";
import {connect} from "react-redux";
import {getObjectsList} from "../../ducks/objects/operations";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {getPlayersList} from "../../ducks/players/operations";
import {getAllPlayers} from "../../ducks/players/selectors";
import {getAllObjects} from "../../ducks/objects/selectors";
import {getAllMatches} from "../../ducks/matches/selectors";
import PlayersDetails from "../players/PlayersDetails";
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import Backend from 'i18next-http-backend';
import languages from '../../config/languages.json';
import Stats from "../stats/Stats";

const language = languages.find(value => value === localStorage.getItem('language'));

i18next.use(Backend)
    .use(initReactI18next)
    .init({
        lng: language || 'en',
        fallbackLng: 'en',
        ns: [ 'main' ],
        defaultNS: 'main',
        react: {
            wait: true,
            useSuspense: false
        },
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json'
        }
    })



const Router = () => {

    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    }



    return (
        <div>

            <BrowserRouter>
                <div>
                    <button onClick={() => changeLanguage('pl')}><i className="flag flag-poland" /></button>
                    <button onClick={() => changeLanguage('en')}><i className="flag flag-united-kingdom" /></button>
                </div>
                <Navbar expand="lg" className="navbar">
                    <Container>
                        <Navbar.Brand href="#home" className="navbar-title">{t('tennis_league')}</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="nav-links">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <NavDropdown title={t('players')} id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/players">{t('list')}</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/players/form">{t('form')}</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title={t('objects')} id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/objects">{t('list')}</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/objects/form">{t('form')}</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title={t('matches')} id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/matches">{t('list')}</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/matches/form">{t('form')}</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to="/stats">{t('stats')}</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Route exact path="/" component={PlayersList} />
                <Route exact path="/players" component={PlayersList} />
                <Route exact path="/players/details/:id" component={PlayersDetails} />
                <Route exact path="/players/form" component={PlayersForm} />
                <Route exact path="/players/form/:id" component={PlayersForm} />
                <Route exact path="/objects" component={ObjectsList} />
                <Route exact path="/objects/form" component={ObjectsForm} />
                <Route exact path="/objects/form/:id" component={ObjectsForm} />
                <Route exact path="/matches" component={MatchesList} />
                <Route exact path="/matches/form" component={MatchesForm} />
                <Route exact path="/matches/form/:id" component={MatchesForm} />
                <Route exact path="/stats" component={Stats} />
            </BrowserRouter>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        players: getAllPlayers(state),
        objects: getAllObjects(state),
        matches: getAllMatches(state)
    };
}

const mapDispatchToProps = ({
    getMatchesList,
    getObjectsList,
    getPlayersList
})

export default connect(mapStateToProps,mapDispatchToProps)(Router);


