import { Field, Form, Formik } from 'formik';
import { connect } from 'react-redux';
import {addObjectAction, editObjectAction} from "../../ducks/objects/operations";
import {clearSuccessMessage} from "../../ducks/success/actions";
import Alert from "react-bootstrap/Alert";
import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {v4 as uuidv4 } from 'uuid';
import {getAllObjects} from "../../ducks/objects/selectors";
const ObjectsForm = ({ addObjectAction,error,clearSuccessMessage,success,edited,editObjectAction,objects }, props) => {

    const [initialValues,setInitialValues] = useState({
        id: '',
        name: '',
        surface: ''
    })

    const handleSubmit = (values) => {
        clearSuccessMessage()
        console.log(values)
        if (!edited) {
            addObjectAction(values);
        }
        else {
            editObjectAction(values)
        }
    }
    useEffect(() => {
        clearSuccessMessage()
        if (!edited) {
            setInitialValues({
                id: uuidv4(),
                name: '',
                surface: ''
            })
        }
        else {
            const object = objects.find(object => object._id === edited)
            setInitialValues({
                _id: object._id,
                id: object.id,
                name: object.name,
                surface: object.surface

            })
        }
    }, [])


    return (
        <div>
            <div className="form-grid-div">
                <div className="form-grid-title">
                    <h3 className="h3-title">Add object</h3>
                </div>
                <div className="form-grid-form">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values,{resetForm}) => {handleSubmit(values);resetForm({values: ''})}}
                        enableReinitialize={true}>
                        <Form>
                            <div className="form-flex">
                                <div className="form-inside-flex">
                                    <div className="property"><label htmlFor="name">Name: </label></div>
                                    <div className="value"><Field name="name" /></div>
                                </div>
                                <div className="form-inside-flex">
                                    <div className="property"><label htmlFor="surface">Surface: </label></div>
                                    <div className="value"><Field name="surface" as="select">
                                        <option disabled value="">(Select a surface)</option>
                                        <option value="grass">Grass</option>
                                        <option value="clay">Clay</option>
                                        <option value="hard">Hard</option>
                                    </Field></div>
                                </div>
                                <div className="form-inside-flex">
                                    {success && (
                                        <Alert variant="success">
                                            {success}
                                        </Alert>
                                    )
                                    }
                                </div>
                                <div className="form-inside-flex">
                                    <Button variant="primary" type="submit">Submit</Button>
                                </div>
                            </div>


                        </Form>
                    </Formik>
                    <p>{error && (<span>{error.name} {error.response.message}</span>)}</p>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state,ownProps) => {
    return {
        error: state.error.error,
        success: state.success.message,
        objects: getAllObjects(state),
        edited: ownProps.match.params.id
    }
}

const mapDispatchToProps = ({
    addObjectAction,
    clearSuccessMessage,
    editObjectAction
});


export default connect(mapStateToProps, mapDispatchToProps)(ObjectsForm);