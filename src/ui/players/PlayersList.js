
import {useEffect, useState} from "react";
import { connect } from "react-redux";
import {deletePlayer, getPlayersList} from "../../ducks/players/operations";
import {getAllPlayers} from "../../ducks/players/selectors";
import {useConfirm} from "material-ui-confirm";
import {Spinner} from "react-bootstrap";
import {getObjectsList} from "../../ducks/objects/operations";
import {deleteMatch, getMatchesList} from "../../ducks/matches/operations";
import {getAllMatches} from "../../ducks/matches/selectors";
import {getAllObjects} from "../../ducks/objects/selectors";
import PlayersPagination from "./PlayersPagination";
import PlayersSort from "./PlayersSort";
import PlayersFilter from "./PlayersFilter";
import Player from "./Player";
import {useTranslation} from "react-i18next";
const _ = require("lodash")

const PlayersList = ({ players, getPlayersList,deletePlayer,getObjectsList,objects,matches,getMatchesList,deleteMatch}) => {

    const { t } = useTranslation();

    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
    
    useEffect(() => {
        const fetchData = async () => {

            if (players.length === 0) {
                setLoading(true)
                await getPlayersList();
                setLoading(false)
            }


            if (objects.length === 0) {
                getObjectsList()
            }
            if (matches.length === 0) {
                getMatchesList()
            }


        }
        fetchData()



    }, []);
    const confirm = useConfirm()

    //Deleting a player and matches related with the player
    const handleDelete = (player) => {
        confirm({description: `This will delete player ${player.firstName} ${player.lastName} and all matches related with him/her`})
            .then(() => deletePlayerAndMatches(player))
            .catch(() => console.log("delete canceled"))
    }
    const deletePlayerAndMatches = (player) => {
        const matchesWithPlayer = matches.filter(match => match.player1[0] === player._id || match.player2[0] === player._id)
        console.log(matchesWithPlayer)
        matchesWithPlayer.forEach(match => deleteMatch(match))
        deletePlayer(player)
    }
    //Loading,filtering,sorting states and functions
    const [loading,setLoading] = useState(false)
    const [sortBy,setSortBy] = useState([])
    const [filters,setFilters] = useState({})
    const [checkedRadioGender,setCheckedRadioGender] = useState('')


    const handleSort = (key) => {
        if (sortBy.includes(key)) {
            setSortBy(sortBy.filter(k => k !== key))
        }
        else {
            setSortBy([...sortBy,key])
        }
    }
    const handleFilter = (key,value=null) => {
        switch (key) {
            case 'left-handed':
                return setFilters({...filters,handed: p => p.handed==="left-handed"})
            case 'right-handed':
                return setFilters({...filters,handed: p => p.handed==="right-handed"})
            case 'no-filter-handed':
                return setFilters(_.omit(filters,'handed'))
            case 'age':
                return setFilters({...filters,age: p => getAge(p.dateOfBirth) > value})
            case 'gender':
                console.log(value)
                return setFilters({...filters,gender: p => p.gender === value})
            case 'no-filter-gender':
                return setFilters(_.omit(filters,'gender'))
            default:
                break
        }
    }
    //Pagination
    const [currentPage,setCurrentPage] = useState(1)
    const [playersPerPage] = useState(3)
    const changePage = (number) => {
        setCurrentPage(number)
    }
    const showPlayers = () => {
        const playersFiltered = _.chain(players)
            .filter(filters.handed)
            .filter(filters.age)
            .filter(filters.gender)
            .sortBy(sortBy)
            .value()


        return playersFiltered
    }

    return (
        <div className="main">
            <div className="d-flex align-items-center h3-title-box flex-column">
                <h3 className="h3-title">{t('players_list')}</h3>
                <div>
                    <PlayersPagination playersPerPage={playersPerPage} totalPlayers={showPlayers().length} currentPage={currentPage} changePage={changePage}/>
                </div>
            </div>
                <div className="players-objects-list">
                    <div className="players-objects-list-sort-area">
                        <PlayersSort handleSort={handleSort} />
                        <PlayersFilter handleFilter={handleFilter} setCheckedRadioGender={setCheckedRadioGender} checkedRadioGender={checkedRadioGender} />
                    </div>

                    <div className="players-list-cards">
                    {loading ? <Spinner animation="border" variant="warning" /> :

                        players && showPlayers()
                                    .slice((currentPage*playersPerPage)-playersPerPage,currentPage*playersPerPage)
                                    .map(player => {
                                        return (
                                            <div className="p-3" key={player.id}>
                                                <Player handleDelete={handleDelete} getAge={getAge} player={player} />
                                            </div>
                                        )
                                    })

                }
                    </div>
                </div>
            </div>
    )
};
const mapStateToProps = (state) => {
    return {
        players: getAllPlayers(state),
        objects: getAllObjects(state),
        matches: getAllMatches(state)
    };
}
const mapDispatchToProps = {
    getPlayersList,
    deletePlayer,
    getObjectsList,
    getMatchesList,
    deleteMatch
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayersList);