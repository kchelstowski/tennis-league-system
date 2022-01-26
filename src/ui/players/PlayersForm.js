import {ErrorMessage, Field, Form, Formik} from 'formik';
import { connect } from 'react-redux';
import {addPlayerAction, editPlayerAction} from "../../ducks/players/operations";
import Alert from 'react-bootstrap/Alert'
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {clearSuccessMessage} from "../../ducks/success/actions";
import {v4 as uuidv4 } from 'uuid';
import {getAllPlayers} from "../../ducks/players/selectors";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {clearErrorMessage} from "../../ducks/error/actions";
const PlayersForm = ({ addPlayerAction,error,success,clearSuccessMessage,players,edited,editPlayerAction,clearErrorMessage }, props) => {

    const { t } = useTranslation();

    const [initialValues,setInitialValues] = useState({
        id: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        handed: '',
        height: '',
        weight: ''
    })

    const handleSubmit = (values) => {
        clearSuccessMessage()
        if (!edited) {
            addPlayerAction(values);
        }
        else {
            editPlayerAction(values)
        }

    }

    useEffect(() => {
        clearSuccessMessage()
        clearErrorMessage()
        console.log(edited)
        if (!edited) {
            setInitialValues({
                id: uuidv4(),
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                gender: '',
                handed: '',
                height: '',
                weight: ''
            })
        }
        else {
            const player = players.find(player => player._id === edited)
            console.log(player)
            setInitialValues({
                _id: player._id,
                id: player.id,
                firstName: player.firstName,
                lastName: player.lastName,
                dateOfBirth: player.dateOfBirth.split("T")[0],
                gender: player.gender,
                handed: player.handed,
                height: player.height,
                weight: player.weight


            })

        }
    }, [])

    const playerSchema = Yup.object().shape({
        dateOfBirth: Yup.date().max(new Date(), "Date of birth can't be older than today").required('Date of birth is required'),
        firstName: Yup
            .string('First name has to be string')
            .required("First name is required")
            .matches(/^[a-zA-Z]+$/, "First name can't have numbers etc"),
        lastName: Yup
            .string('Last name has to be string')
            .required("Last name is required")
            .matches(/^[a-zA-Z]+$/, "Last name can't have numbers etc"),
        height: Yup
            .number()
            .positive('Height has to be positive')
            .required("Height is required"),
        weight: Yup
            .number()
            .positive('Weight has to be positive')
            .required("Weight is required")






    })


    return (
        <div>
            <div className="form-grid-div">
                <div className="form-grid-title">
                    {edited ? <h3>{t('edit_player')}</h3> : <h3>{t('add_player')}</h3>}
                </div>
                <div className="form-grid-form">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values,{resetForm}) => {handleSubmit(values);resetForm({values: ''})}}
                        enableReinitialize={true}
                        validationSchema={playerSchema}
                    >
                        <Form>
                            <div className="form-flex">
                                <div className="form-inside-flex">
                                    <div className="property"><label htmlFor="firstName">{t('first_name')}: </label></div>
                                    <div className="value"><Field name="firstName" /></div>
                                    <ErrorMessage name="firstName" component="div"/>
                                </div>
                                <div className="form-inside-flex">
                                    <div className="property"><label htmlFor="lastName">{t('last_name')}: </label></div>
                                    <div className="value"><Field name="lastName" /></div>
                                    <ErrorMessage name="lastName" component="div"/>
                                </div>
                                <div className="form-inside-flex">
                                    <div className="property"><label htmlFor="dateOfBirth">{t('date_of_birth')}: </label></div>
                                    <div className="value"><Field name="dateOfBirth" type="date" /></div>
                                    <ErrorMessage name="dateOfBirth" component="div"/>
                                </div>
                                <div className="form-inside-flex">
                                    <div className="property"><label htmlFor="handed">{t('gender')}: </label></div>
                                    <div className="value"><Field name="gender" as="select">
                                        <option disabled value="">({t('select_gender')})</option>
                                        <option value="F">{t('female')}</option>
                                        <option value="M">{t('male')}</option>
                                    </Field></div>
                                </div>
                                <div className="form-inside-flex">
                                    <div className="property"><label htmlFor="handed">{t('handed')}: </label></div>
                                    <div className="value"><Field as="select" name="handed">
                                        <option disabled value="">({t('select_hand')})</option>
                                        <option value="left-handed">{t('left_handed')}</option>
                                        <option value="right-handed">{t('right_handed')}</option>
                                    </Field></div>
                                </div>

                                <div className="form-inside-flex">
                                    <div className="property"><label htmlFor="height">{t('height')}: </label></div>
                                    <div className="value"><Field name="height" /></div>
                                    <ErrorMessage name="height" component="div"/>
                                </div>
                                <div className="form-inside-flex">
                                    <div className="property"><label htmlFor="weight">{t('weight')}: </label></div>
                                    <div className="value"><Field name="weight" /></div>
                                    <ErrorMessage name="weight" component="div"/>
                                </div>
                                <p>
                                    {success && (
                                        <Alert variant="success">
                                            {success}
                                        </Alert>
                                    )
                                    }
                                </p>
                                <div className="form-inside-flex">
                                    <Button variant="primary" type="submit">{t('submit')}</Button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>

                <p>{error && (<span>{error.name} {error.response.message}</span>)}</p>

            </div>
        </div>
    )
}

const mapStateToProps = (state,ownProps) => {
    return {
        error: state.error.error,
        success: state.success.message,
        players: getAllPlayers(state),
        edited: ownProps.match.params.id
    }
}

const mapDispatchToProps = ({
    addPlayerAction,
    editPlayerAction,
    clearSuccessMessage,
    clearErrorMessage
});


export default connect(mapStateToProps, mapDispatchToProps)(PlayersForm);