import React from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardImage,
    MDBCardTitle,
    MDBListGroup,
    MDBListGroupItem
} from "mdb-react-ui-kit";
import card_image from "../images/card-basic.png";
import {useTranslation} from "react-i18next";

const Match = ({findPlayer,findObject,handleDelete,handleEdit,match}) => {

    const { t } = useTranslation();

    return (
        <div>
            <MDBCard style={{ width: '18rem' }}>
                <MDBCardImage src={card_image} position='top' alt='Fissure in Sandstone' />
                <MDBCardBody>
                    <MDBCardTitle>{t('match')} nr {match.id}</MDBCardTitle>
                    <MDBListGroup>
                        <MDBListGroupItem>{t('player')} 1: {findPlayer(match.player1)}</MDBListGroupItem>
                        <MDBListGroupItem>{t('player')} 2: {findPlayer(match.player2)}</MDBListGroupItem>
                        <MDBListGroupItem>{t('date')}: {(match.date).split("T")[0]}</MDBListGroupItem>
                        <MDBListGroupItem>{t('object')}: {findObject(match.object)}</MDBListGroupItem>
                        <MDBListGroupItem variant="success">{t('winner')}: {findPlayer(match.winner)}</MDBListGroupItem>
                    </MDBListGroup>
                    <MDBCardFooter>
                        <MDBBtn color="danger" onClick={() => handleDelete(match)}>{t('delete')}</MDBBtn>
                        <MDBBtn color="warning" onClick={() => handleEdit(match)}>{t('edit')}</MDBBtn>
                    </MDBCardFooter>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default Match;