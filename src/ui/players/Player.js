import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import card_image from "../images/card-basic.png"
import {useHistory} from "react-router";
import {useTranslation} from "react-i18next";

const Player = ({player,getAge,handleDelete}) => {
    const history = useHistory()

    const handleEdit = (player) => {
        history.push(`/players/form/${player._id}`)
    }

    const { t } = useTranslation();

    return (
        <MDBCard style={{ maxWidth: '540px' }}>
            <MDBRow className='g-0'>
                <MDBCol md='4'>
                    <MDBCardImage src={card_image} position='top' alt='Fissure in Sandstone' fluid className="h-100"/>
                </MDBCol>
                <MDBCol md='8'>
                    <MDBCardBody>
                        <MDBCardTitle><Link to={`/players/details/${player._id}`}>{player.firstName} {player.lastName}</Link></MDBCardTitle>
                        <MDBCardText className="flex-column">
                            <span>{t('age')}: {getAge(player.dateOfBirth)}</span>
                            <span>{t('play_style')}: {t(player.handed)}</span>
                        </MDBCardText>
                        <div className="d-flex justify-content-around">
                            <MDBBtn outline color="danger" size="sm" onClick={() => handleDelete(player)}>{t('delete')}</MDBBtn>
                            <MDBBtn outline color="warning" size="sm" onClick={() => handleEdit(player)}>{t('edit')}</MDBBtn>
                            <MDBBtn outline color="info" size="sm" onClick={() => history.push(`/players/details/${player._id}`)}>{t('details')}</MDBBtn>
                        </div>
                    </MDBCardBody>
                </MDBCol>
            </MDBRow>
        </MDBCard>
    );
};

export default Player;