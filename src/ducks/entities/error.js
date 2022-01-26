import typesPlayers from "../players/types"
import typesObjects from "../objects/types"
import typesMatches from "../matches/types";

const errorReducer = (state={error: ''},action) => {
    switch (action.type) {
        case typesPlayers.PLAYER_ADD_FAILURE:
            return {error: action.payload}
        case typesObjects.OBJECT_ADD_FAILURE:
            return {error: action.payload}
        case typesMatches.MATCH_ADD_FAILURE:
            return {error: action.payload}
        case 'CLEAR':
            return {error: ''}
        default:
            return state
    }
}

export default errorReducer