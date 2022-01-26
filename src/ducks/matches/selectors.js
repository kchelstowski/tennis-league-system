const _ = require('lodash')

export const getMatches = (state) => state.matches;

export const getAllMatches = (state) => {
    return state.entities.matches.allIds.map(id => state.entities.matches.byId[id]);
}

export const amountOfMatchesByPlayer = (state) => {
    const allMatches = getAllMatches(state)
    const matchesGrouped = allMatches.reduce((acc,curr) => {
        if (acc[curr.player1[0]] === undefined) {
            if (acc[curr.player2[0]] === undefined) {
                acc[curr.player1[0]] = 1
                acc[curr.player2[0]] = 1
            }
            else {
                acc[curr.player1[0]] = 1
                acc[curr.player2[0]] = acc[curr.player2[0]]+1
            }
        }
        else {
            if (acc[curr.player2[0]] === undefined) {
                acc[curr.player1[0]] = acc[curr.player1[0]]+1
                acc[curr.player2[0]] = 1
            }
            else {
                acc[curr.player1[0]] = acc[curr.player1[0]] + 1
                acc[curr.player2[0]] = acc[curr.player2[0]] + 1
            }
        }
        return acc
    },[])
    console.log(matchesGrouped)
    const convertedMatchesGrouped =
        Object.keys(matchesGrouped)
        .map(id => ({"id": id, "amount": matchesGrouped[id]}))
        .map(el => ({
            "id": `${state.entities.players.allIds.map(id => state.entities.players.byId[id])
                .find(player => player._id === el.id).firstName} ${state.entities.players.allIds.map(id => state.entities.players.byId[id])
                .find(player => player._id === el.id).lastName}`,
            "amount": el.amount
        }))
    return _.orderBy(convertedMatchesGrouped, ['amount'], 'desc')
}

export const amountOfMatchesWonByPlayer = (state) => {
    const allMatches = getAllMatches(state)
    const matchesGrouped = allMatches.reduce((acc,curr) => {
        if (acc[curr.winner[0]] === undefined) {
            acc[curr.winner[0]] = 1
        }
        else {
            acc[curr.winner[0]] = acc[curr.winner[0]]+1
        }
        return acc
    },[])

    const convertedMatchesGrouped =
        Object.keys(matchesGrouped)
            .map(id => ({"id": id, "amount": matchesGrouped[id]}))
            .map(el => ({
                "id": `${state.entities.players.allIds.map(id => state.entities.players.byId[id])
                    .find(player => player._id === el.id).firstName} ${state.entities.players.allIds.map(id => state.entities.players.byId[id])
                    .find(player => player._id === el.id).lastName}`,
                "amount": el.amount
            }))
    return _.orderBy(convertedMatchesGrouped, ['amount'], 'desc')
}

export const surfacesPlayed = (state) => {
    const allMatches = getAllMatches(state)
    const matchesGroupedBySurface = allMatches.reduce((acc,curr) => {
        if (acc[curr.object[0]] === undefined) {
            acc[curr.object[0]] = 1
        }
        else {
            acc[curr.object[0]] = acc[curr.object[0]]+1
        }
        return acc
    },[])

    const convertedMatchesGrouped =
        Object.keys(matchesGroupedBySurface)
            .map(id => ({"id": id, "amount": matchesGroupedBySurface[id]}))
            .map(el => ({
                "surface": `${state.entities.objects.allIds.map(id => state.entities.objects.byId[id])
                    .find(object => object._id === el.id).surface}`,
                "amount": el.amount
            }))
    const groupedSurfaces = _.groupBy(convertedMatchesGrouped,'surface')
    return Object.keys(groupedSurfaces)
        .map(surface => ({
            name: surface,
            amount: groupedSurfaces[surface].reduce((acc, curr) => acc + curr.amount, 0)
        }))
}