
import {connect} from 'react-redux'
import {amountOfLostMatches, amountOfMatches, amountOfWonMatches, getAllPlayers} from "../../ducks/players/selectors";
import {Row, Nav, Tab, Col, ListGroup, Badge} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const PlayersDetails = ({amountOfMatches,amountOfWonMatches,player,amountOfLostMatches}) => {
    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

    const { t } = useTranslation();

    const percentageOfWonMatches = Math.floor(100 * (amountOfWonMatches / amountOfMatches)) + "%"

    return (
        <div>
            <div className="player-detail-tab">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first" className="player-detail-tab">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">{t('basic_info')}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">{t('basic_statistics')}</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <h4 className="player-details-h4-uppercase">{t('basic_info')}: </h4>
                                    <ListGroup>
                                        <ListGroup.Item

                                            className="d-flex justify-content-between align-items-start"
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{t('name')}</div>
                                                {player.firstName} {player.lastName}
                                            </div>

                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{t('date_of_birth')}: </div>
                                                {(player.dateOfBirth).split("T")[0]}
                                            </div>
                                            <Badge variant="primary" pill>
                                                {t('age')} ({getAge(player.dateOfBirth)})
                                            </Badge>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{t('gender')}</div>
                                                {player.gender}
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{t('height')}</div>
                                                {player.height}
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{t('weight')}</div>
                                                {player.weight}
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <ListGroup>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{t('matches_played')}:</div>
                                                {amountOfMatches}
                                            </div>

                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{t('matches_won')}: </div>
                                                {amountOfWonMatches}
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{t('matches_lost')}:</div>
                                                {amountOfLostMatches}
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{t('matches_won_percentage')}:</div>
                                                {percentageOfWonMatches}
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </div>
    )
}

const mapStateToProps = (state,ownProps) => {
    return {
        player: getAllPlayers(state).find(player => player._id === ownProps.match.params.id),
        amountOfMatches: amountOfMatches(state,ownProps.match.params.id),
        amountOfWonMatches: amountOfWonMatches(state,ownProps.match.params.id),
        amountOfLostMatches: amountOfLostMatches(state,ownProps.match.params.id)
    }
}

export default connect(mapStateToProps)(PlayersDetails)