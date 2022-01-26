
import { createAction } from "redux-api-middleware";
import { schema, normalize} from 'normalizr';
import types from "./types"

const matchSchema = new schema.Entity('matches',

);
const matchesSchema = new schema.Array(matchSchema);

export const getMatchesList = () => {
    return createAction({
        endpoint: 'http://localhost:5000/matches',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            types.MATCHES_LIST_REQUEST,
            {
                type: types.MATCHES_LIST_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, matchesSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
            },

            types.MATCHES_LIST_FAILURE
        ]
    })
}

export const addMatchAction = (values) => {
    console.log(values)
    return createAction({

        endpoint: 'http://localhost:5000/matches',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify(values),

        types: [
            types.MATCH_ADD_REQUEST,
            {
                type: types.MATCH_ADD_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, matchesSchema)
                    return entities;
                },
                meta: { actionType: 'ADD_ONE' }
            },
            {
                type: types.MATCH_ADD_FAILURE,
                meta: {actionType: types.MATCH_ADD_FAILURE}
            }
        ]
    })
}

export const deleteMatch = (matchToDelete) => {
    console.log(matchToDelete)
    return createAction({
        endpoint: `http://localhost:5000/matches/${matchToDelete._id}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            types.MATCH_DELETE_REQUEST,
            {
                type: types.MATCH_DELETE_SUCCESS,
                payload: async (action, state, res) => {
                    const { entities } = normalize(matchToDelete, matchSchema);
                    return entities;
                },
                meta: { actionType: 'DELETE' }
            },
            types.MATCH_DELETE_FAILURE
        ]
    })
}

export const editMatchAction = (values) => {
    console.log(values)
    return createAction({

        endpoint: `http://localhost:5000/matches/${values._id}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify(values),

        types: [
            types.MATCH_EDIT_REQUEST,
            {
                type: types.MATCH_EDIT_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, matchesSchema)
                    return entities;
                },
                meta: { actionType: 'EDIT_ONE' }
            },
            {
                type: types.MATCH_EDIT_FAILURE,
                meta: {actionType: types.MATCH_EDIT_FAILURE}
            }
        ]
    })
}
