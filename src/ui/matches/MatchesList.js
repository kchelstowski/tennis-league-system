import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import {deleteMatch, getMatchesList} from "../../ducks/matches/operations";
import {getAllMatches} from "../../ducks/matches/selectors";
import {getAllPlayers} from "../../ducks/players/selectors";
import {getAllObjects} from "../../ducks/objects/selectors";
import {useConfirm} from "material-ui-confirm";
import {getPlayersList} from "../../ducks/players/operations";
import {getObjectsList} from "../../ducks/objects/operations";
import {useHistory} from "react-router";
import {useTranslation} from "react-i18next";
import Match from "./Match";
import MatchesSort from "./MatchesSort";
const _ = require("lodash")

const MatchesList = ({ matches, getMatchesList,deleteMatch,players,objects }) => {

    const { t } = useTranslation();

    useEffect(() => {
            if (matches.length===0) {
                getMatchesList();
            }

    }, []);

    const findPlayer = (id) => {
        const player = players.find(player => player._id===id[0])
        if (player) return `${player.firstName} ${player.lastName}`
        return "not found"

    }
    const findObject = (id) => {
        const object = objects.find(object => object._id===id[0])
        return `${object.name}`
    }


    const confirm = useConfirm()
    const handleDelete = (match) => {
        confirm({description: `${t('this_will_delete_match')} nr ${match.id}`})
            .then(() => deleteMatch(match))
            .catch(() => console.log("delete canceled"))
    }
    const history = useHistory()

    const handleEdit = (match) => {
        history.push(`/matches/form/${match._id}`)
    }

    //sorting
    const [sortBy,setSortBy] = useState([])
    const handleSort = (key) => {
        if (sortBy.includes(key)) {
            setSortBy(sortBy.filter(k => k !== key))
        }
        else {
            setSortBy([...sortBy,key])
        }
    }

    return (
        <div className="matches-list-primary-box">
            <h3>{t('matches_list')}</h3>
            <div className="matches-list-sort-box">
                <MatchesSort handleSort={handleSort} />
            </div>
            <div className="matches-list-flex">
                {
                    matches && _.sortBy(matches,sortBy).map(match => {
                        return (

                            <div key={match.id} className="match-box">
                                <Match findPlayer={findPlayer} findObject={findObject} handleDelete={handleDelete} handleEdit={handleEdit} match={match} />
                            </div>
                        )

                    })
                }
            </div>
        </div>
    )

};
const mapStateToProps = (state) => {
    return {
        matches: getAllMatches(state),
        players: getAllPlayers(state),
        objects: getAllObjects(state)
    };
}
const mapDispatchToProps = {
    getMatchesList,
    deleteMatch,
    getPlayersList,
    getObjectsList
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchesList);