import typesPlayers from "../players/types"
import typesObjects from "../objects/types"
import typesMatches from "../matches/types";

const successReducer = (state={message: ''},action) => {
    switch (action.type) {
        case typesPlayers.PLAYER_ADD_SUCCESS:
            return {message: "Player has been successfully added"}
        case typesObjects.OBJECT_ADD_SUCCESS:
            return {message: "Object has been successfully added"}
        case typesMatches.MATCH_ADD_SUCCESS:
            return {message: "Match has been successfully added"}
        case typesMatches.MATCH_EDIT_SUCCESS:
            return {message: "Match has been successfully edited"}
        case typesPlayers.PLAYER_EDIT_SUCCESS:
            return {message: "Player has been successfully edited"}
        case typesObjects.OBJECT_EDIT_SUCCESS:
            return {message: "Object has been successfully edited"}
        case 'CLEAR':
            return {message: ''}
        default:
            return state
    }
}

export default successReducer