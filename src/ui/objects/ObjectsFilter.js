import React from 'react';
import {MDBCheckbox} from "mdb-react-ui-kit";
import {useTranslation} from "react-i18next";

const ObjectsFilter = ({handleFilter}) => {

    const { t } = useTranslation();

    return (
        <div className="players-objects-list-sort-small-box">
            <p>{t('filter_by')}:</p>
            <div>
                <div className="d-flex justify-content-around">
                    <div className="p-1">
                        {t('surface')}
                    </div>
                    <div className="p-1">
                        <MDBCheckbox name='flexCheck' value='grass' id='flexCheckDefault' label={t('grass')} onChange={() => handleFilter('grass')} defaultChecked />
                        <MDBCheckbox name='flexCheck' value='hard' id='flexCheckChecked' label={t('hard')} onChange={() => handleFilter('hard')} defaultChecked />
                        <MDBCheckbox name='flexCheck' value='clay' id='flexCheckChecked' label={t('clay')} onChange={() => handleFilter('clay')} defaultChecked />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ObjectsFilter;