
import { createAction } from "redux-api-middleware";
import { schema, normalize} from 'normalizr';
import types from "./types"

const objectSchema = new schema.Entity('objects');
const objectsSchema = new schema.Array(objectSchema);

export const getObjectsList = () => {
    return createAction({
        endpoint: 'http://localhost:5000/objects',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            types.OBJECTS_LIST_REQUEST,
            {
                type: types.OBJECTS_LIST_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, objectsSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
            },

            types.OBJECTS_LIST_FAILURE
        ]
    })
}

export const addObjectAction = (values) => {
    console.log(values)
    return createAction({

        endpoint: 'http://localhost:5000/objects',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify(values),

        types: [
            types.OBJECT_ADD_REQUEST,
            {
                type: types.OBJECT_ADD_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, objectsSchema)
                    return entities;
                },
                meta: { actionType: 'ADD_ONE' }
            },
            {
                type: types.OBJECT_ADD_FAILURE,
                meta: {actionType: types.OBJECT_ADD_FAILURE}
            }
        ]
    })
}

export const deleteObject = (objectToDelete) => {
    console.log(objectToDelete)
    return createAction({
        endpoint: `http://localhost:5000/objects/${objectToDelete._id}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            types.OBJECT_DELETE_REQUEST,
            {
                type: types.OBJECT_DELETE_SUCCESS,
                payload: async (action, state, res) => {
                    const { entities } = normalize(objectToDelete, objectSchema);
                    return entities;
                },
                meta: { actionType: 'DELETE' }
            },
            types.OBJECT_DELETE_FAILURE
        ]
    })
}

export const editObjectAction = (values) => {
    console.log(values)
    return createAction({

        endpoint: `http://localhost:5000/objects/${values._id}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify(values),

        types: [
            types.OBJECT_EDIT_REQUEST,
            {
                type: types.OBJECT_EDIT_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, objectsSchema)
                    return entities;
                },
                meta: { actionType: 'EDIT_ONE' }
            },
            {
                type: types.OBJECT_EDIT_FAILURE,
                meta: {actionType: types.OBJECT_EDIT_FAILURE}
            }
        ]
    })
}
