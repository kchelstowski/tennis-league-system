import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle} from "mdb-react-ui-kit";
import {useTranslation} from "react-i18next";

const Object = ({handleDelete,object,handleEdit}) => {

    const { t } = useTranslation();

    return (
        <MDBCard style={{ maxWidth: '28rem' }} className="object-card">
            <MDBCardBody>
                <MDBCardTitle>{object.name}</MDBCardTitle>
                <MDBCardText>
                    {t('surface')}: {t(object.surface)}
                </MDBCardText>
                <MDBBtn color="danger" onClick={() => handleDelete(object)}>{t('delete')}</MDBBtn>
                <MDBBtn color="warning" onClick={() => handleEdit(object)}>{t('edit')}</MDBBtn>
            </MDBCardBody>
        </MDBCard>
    );
};

export default Object;