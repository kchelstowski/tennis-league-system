export const getPlayers = (state) => state.players;

export const getAllPlayers = (state) => {
    return state.entities.players.allIds.map(id => state.entities.players.byId[id]);
}

export const amountOfMatches = (state,idPlayer) => {
    const matches = state.entities.matches.allIds.map(idMatch => state.entities.matches.byId[idMatch])
    return matches.filter(match => match.player1[0] === idPlayer || match.player2[0] === idPlayer).length
}

export const amountOfWonMatches = (state,idPlayer) => {
    const matches = state.entities.matches.allIds.map(idMatch => state.entities.matches.byId[idMatch])
    return matches.filter(match => match.winner[0] === idPlayer).length
}

export const amountOfLostMatches = (state,idPlayer) => {
    const matches = state.entities.matches.allIds.map(idMatch => state.entities.matches.byId[idMatch])
    return matches.filter(match => (match.winner[0] !== idPlayer) && (match.player1[0] === idPlayer || match.player2[0] === idPlayer)).length

}