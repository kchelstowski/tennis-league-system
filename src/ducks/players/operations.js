
import { createAction } from "redux-api-middleware";
import { schema, normalize} from 'normalizr';
import types from "./types"

export const playerSchema = new schema.Entity('players');
const playersSchema = new schema.Array(playerSchema);

export const getPlayersList = () => {
    return createAction({
        endpoint: 'http://localhost:5000/players',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            types.PLAYERS_LIST_REQUEST,
            {
                type: types.PLAYERS_LIST_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, playersSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
            },

            types.PLAYERS_LIST_FAILURE
        ]
    })
}

export const addPlayerAction = (values) => {
    console.log(values)
    return createAction({

        endpoint: 'http://localhost:5000/players',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify(values),

        types: [
            types.PLAYER_ADD_REQUEST,
            {
                type: types.PLAYER_ADD_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, playersSchema)
                    return entities;
                },
                meta: { actionType: 'ADD_ONE' }
            },
            {
                type: types.PLAYER_ADD_FAILURE,

                meta: {actionType: types.PLAYER_ADD_FAILURE}
            }
        ]
    })
}

export const deletePlayer = (playerToDelete) => {
    console.log(playerToDelete)
    return createAction({
        endpoint: `http://localhost:5000/players/${playerToDelete._id}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            types.PLAYER_DELETE_REQUEST,
            {
                type: types.PLAYER_DELETE_SUCCESS,
                payload: async (action, state, res) => {
                    const { entities } = normalize(playerToDelete, playerSchema);
                    return entities;
                },
                meta: { actionType: 'DELETE' }
            },
            types.PLAYER_DELETE_FAILURE
        ]
    })
}

export const editPlayerAction = (values) => {
    console.log(values)
    return createAction({

        endpoint: `http://localhost:5000/players/${values._id}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify(values),

        types: [
            types.PLAYER_EDIT_REQUEST,
            {
                type: types.PLAYER_EDIT_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, playersSchema)
                    return entities;
                },
                meta: { actionType: 'EDIT_ONE' }
            },
            {
                type: types.PLAYER_EDIT_FAILURE,
                meta: {actionType: types.PLAYER_EDIT_FAILURE}
            }
        ]
    })
}