import {ErrorMessage, Field, Form, Formik} from 'formik';
import { connect } from 'react-redux';
import {addMatchAction, editMatchAction} from "../../ducks/matches/operations";
import {getAllPlayers} from "../../ducks/players/selectors";
import {useEffect, useState} from "react";
import {getAllObjects} from "../../ducks/objects/selectors";
import Alert from "react-bootstrap/Alert";
import {clearSuccessMessage} from "../../ducks/success/actions";
import {getAllMatches} from "../../ducks/matches/selectors";
import {v4 as uuidv4 } from 'uuid';
import {Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import * as Yup from 'yup'
import {clearErrorMessage} from "../../ducks/error/actions";

const MatchesForm = ({ addMatchAction,error,players,objects,success,clearSuccessMessage,matches,edited,editMatchAction,clearErrorMessage}, props) => {

    const { t } = useTranslation();

    const [initialValues,setInitialValues] = useState({
        id: '',
        player1: '',
        player2: '',
        winner: '',
        date: '',
        object: ''
    })

    //Validation schema
    const date = new Date()
    const matchSchema = Yup.object().shape({
        date: Yup.date().max(date, "Date can't be older than today").required('Date is required'),
    })



    const handleSubmit = (values) => {
        clearErrorMessage()
        clearSuccessMessage()
        if (!edited) {
            addMatchAction(values);
        }
        else {
            editMatchAction(values)
        }
    }

    useEffect(() => {
        clearSuccessMessage()
        console.log(edited)
        if (!edited) {
            setInitialValues({
                id: uuidv4(),
                player1: '',
                player2: '',
                winner: '',
                date: '',
                object: ''
            })
        }
        else {
            const match = matches.find(match => match._id === edited)
            console.log(match)
            setInitialValues({
                _id: match._id,
                id: match.id,
                player1: match.player1[0],
                player2: match.player2[0],
                winner: match.winner[0],
                date: match.date.split("T")[0],
                object: match.object[0]
            })

        }
    }, [])



    return (
        <div>
            <div className="form-grid-div">
                <div className="form-grid-title">
                    {edited ? <h3>{t('edit_match')}</h3> : <h3>{t('add_match')}</h3>}
                </div>
                <div className="form-grid-form">
                    <Formik
                        initialValues={
                            initialValues
                        }
                        validationSchema={matchSchema}
                        onSubmit={(values,{resetForm}) => {handleSubmit(values);resetForm({values: ''})}}
                        enableReinitialize={true}
                        >
                        {props => {

                            return (
                                <Form>
                                    <div className="form-flex">
                                        <div className="form-inside-flex">
                                            <div className="property"><label htmlFor="player1">{t('player')} 1: </label></div>
                                            <div className="value">
                                                <Field as="select" name="player1">
                                                <option disabled value="">{t('select_a_player')}</option>
                                                    {players && players.filter(player => player._id !== props.values.player2).map(player => (
                                                        <option value={player._id} key={player._id}>{player.firstName} {player.lastName}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="date" component="div"/>
                                            </div>
                                        </div>
                                        <div className="form-inside-flex">
                                            <div className="property"><label htmlFor="player2">{t('player')} 2: </label></div>
                                            <div className="value">
                                                <Field as="select" name="player2" >
                                                    <option disabled value="">{t('select_a_player')}</option>
                                                    {players && players.filter(player => player._id !== props.values.player1).map(player => (
                                                        <option value={player._id} key={player._id}>{player.firstName} {player.lastName}</option>
                                                    ))}
                                                </Field>
                                            </div>
                                        </div>

                                        <div className="form-inside-flex">
                                            <div className="property"><label htmlFor="winner">{t('winner')}: </label></div>
                                            <div className="value">
                                                <Field as="select" name="winner">
                                                    <option disabled value="">{t('pick_a_winner')}</option>
                                                    {players && players.filter(player => player._id === props.values.player1 || player._id === props.values.player2).map(player => (
                                                        <option value={player._id} key={player._id}>{player.firstName} {player.lastName}</option>
                                                    ))}
                                                </Field>
                                            </div>
                                        </div>

                                        <div className="form-inside-flex">

                                            <div className="property"><label htmlFor="date">{t('date')}: </label></div>
                                            <div className="value"><Field name="date" type="date" /></div>
                                            <ErrorMessage name="date" component="div"/>
                                        </div>

                                        <div className="form-inside-flex">
                                            <div className="property"><label htmlFor="object">{t('object')}: </label></div>
                                            <div className="value">
                                                <Field as="select" name="object">
                                                    <option disabled value="">{t('pick_an_object')}</option>
                                                    {objects && objects.map(object => (
                                                        <option value={object._id} key={object._id}>{object.name}</option>
                                                    ))}
                                                </Field>
                                            </div>
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


                            )
                        }}
                    </Formik>
                    <p>{error && (<span>{error.name} {error.response.message}</span>)}</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state,ownProps) => {
    return {
        matches: getAllMatches(state),
        error: state.error.error,
        players: getAllPlayers(state),
        objects: getAllObjects(state),
        success: state.success.message,
        edited: ownProps.match.params.id
    }
}

const mapDispatchToProps = ({
    addMatchAction,
    clearSuccessMessage,
    editMatchAction,
    clearErrorMessage
});


export default connect(mapStateToProps, mapDispatchToProps)(MatchesForm);