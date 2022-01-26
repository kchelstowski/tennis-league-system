const _ = require('lodash')

const allEntities = [
    "players",
    "objects",
    "matches"
];


const defaultState = allEntities.reduce(
    (acc, entity) => ({
        ...acc,
        [entity]: {
            byId: {},
            allIds: []
        }
    }), {}
);

const entityReducer = (entity, state = { allIds: [], byId: {} }, action) => {
    const actionEntities = action.payload[entity];
    const { actionType } = action.meta;
    switch(actionType) {
        case 'GET_ALL':
            return {
                byId: {
                    ...Object.keys(actionEntities).reduce(
                        (acc, id) => ({
                            ...acc,
                            [id]: {
                                ...actionEntities[id]
                            }
                        })
                        , {}),
                },
                allIds: Object.keys(actionEntities)
            }
        case 'ADD_ONE':
            return {
                byId: {
                    ...state.byId,
                    ...Object.keys(actionEntities).reduce(
                        (acc,id) =>({
                            ...acc,
                            [id]: {
                                ...actionEntities[id]
                            }
                        })
                        , {})
                },
                allIds: [...state.allIds, Object.keys(actionEntities)[0]]
            }

        case 'DELETE':
            return {
                byId: _.omit(state.byId, Object.keys(actionEntities)),
                allIds: state.allIds.filter(id => !Object.keys(actionEntities).includes(id)),
            }
        case 'EDIT_ONE':
            return {
                allIds: state.allIds,
                byId:  {...state.byId,
                    ...Object.keys(actionEntities).reduce(
                        (acc,id) =>({
                            ...acc,
                            [id]: {
                                ...actionEntities[id]
                            }
                        })
                        , {})
                }
            }
        default:
            return state;
    }
}


export const entities = (state = defaultState, action) => {
    if(!action.meta || !action.meta.actionType || action.meta.actionType==='OBJECT_ADD_FAILURE' || action.meta.actionType==='PLAYER_ADD_FAILURE' || action.meta.actionType==='MATCH_ADD_FAILURE') return state;
    return {
        ...state,
        ...Object.keys(action.payload).reduce(
            (acc, entity) => ({
                ...acc,
                [entity]: entityReducer(entity, state[entity], action)
            }), {}
        ),
    }
}

