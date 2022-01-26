import React from 'react';
import {MDBBtn} from "mdb-react-ui-kit";
import {useTranslation} from "react-i18next";

const PlayersFilter = ({handleFilter,checkedRadioGender,setCheckedRadioGender}) => {

    const { t } = useTranslation();

    return (
        <div className="players-objects-list-sort-small-box">
            <p>{t('filter_by')}:</p>
            <div>
                <div className="d-flex justify-content-around">
                    <div className="p-1">
                        {t('play_style')}
                    </div>
                    <div className="p-1">
                        <select onChange={(e) => handleFilter(e.target.value)}>
                            <option disabled value="" defaultValue>{t('select_one')}</option>
                            <option value="no-filter-handed">{t('no_filter')}</option>
                            <option value="left-handed">{t('left-handed')}</option>
                            <option value="right-handed">{t('right-handed')}</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div className="d-flex justify-content-around">
                        <div className="p-1">
                            {t('age')} {t('above')}
                        </div>
                        <div className="p-1">
                            <input type="number" onChange={(e) => handleFilter('age',e.target.value)} />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="d-flex justify-content-around">
                        <div className="p-1 d-flex flex-column">
                            <div>{t('gender')}</div>
                            <div><MDBBtn color="light" size="sm" onClick={() => {setCheckedRadioGender(''); handleFilter('no-filter-gender')}}>RESET</MDBBtn></div>
                        </div>
                        <div className="p-1 d-flex flex-column align-content-around">
                            <div>{t('female')}: <input type="radio" checked={checkedRadioGender === 'female'} name="gender"  value="F" onChange={(e) => {handleFilter('gender',e.target.value);setCheckedRadioGender('female') }}/></div>
                            <div>{t('male')}: <input type="radio" checked={checkedRadioGender === 'male'} name="gender" value="M" onChange={(e) => {handleFilter('gender',e.target.value);setCheckedRadioGender('male') }} /></div>
                        </div>
                    </div>
                </div>





            </div>


        </div>
    );
};

export default PlayersFilter;