import React from 'react';
import {useTranslation} from "react-i18next";

const MatchesSort = ({handleSort}) => {
    const {t} = useTranslation()

    return (
        <div className="matches-list-sort-smallbox">
            <p>{t('sort_by')}</p>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={() => handleSort('date')} />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{t('date')}</label>
            </div>

        </div>
    );
};

export default MatchesSort;