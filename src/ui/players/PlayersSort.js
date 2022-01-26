import React from 'react';
import {useTranslation} from "react-i18next";

const PlayersSort = ({handleSort}) => {

    const { t } = useTranslation();



    return (
        <div className="players-objects-list-sort-small-box">
            <p>{t('sort_by')}</p>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={() => handleSort('dateOfBirth')}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{t('date_of_birth')}</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={() => handleSort('firstName')}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{t('first_name')}</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={() => handleSort('lastName')}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{t('last_name')}</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={() => handleSort('height')}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{t('height')}</label>
            </div>
        </div>
    );
};

export default PlayersSort;