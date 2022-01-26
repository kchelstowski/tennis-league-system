import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {deleteObject, getObjectsList} from "../../ducks/objects/operations";
import {getAllObjects} from "../../ducks/objects/selectors";
import {useConfirm} from "material-ui-confirm";
import Object from "./Object";
import ObjectsFilter from "./ObjectsFilter";
import ObjectsPagination from "./ObjectsPagination";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router";
import {deleteMatch} from "../../ducks/matches/operations";
import {getAllMatches} from "../../ducks/matches/selectors";


const ObjectsList = ({ objects, getObjectsList,deleteObject,matches,deleteMatch }) => {

    const { t } = useTranslation();

    useEffect(() => {
        getObjectsList();
    }, []);

    const _ = require('lodash')
    const confirm = useConfirm()

    //Delete object and matches related with it
    const handleDelete = (object) => {
        confirm({description: `${t('this_will_delete_object')} ${object.name}`})
            .then(() => deleteObjectAndMatches(object))
            .catch(() => console.log("delete canceled"))
    }
    const deleteObjectAndMatches = (object) => {
        const matchesWithObject = matches.filter(match => match.object[0] === object._id )
        matchesWithObject.forEach(match => deleteMatch(match))
        deleteObject(object)
    }

    const [filters,setFilters] = useState(['grass','hard','clay'])
    const handleFilter = (surface) => {
        if (filters.includes(surface)) {
            setFilters(filters.filter(sur => sur !== surface))
        }
        else {
            setFilters([...filters,surface])
        }
    }

    //Pagination
    const [currentPage,setCurrentPage] = useState(1)
    const [objectsPerPage] = useState(3)
    const changePage = (number) => {
        setCurrentPage(number)
    }

    const showObjects = () => {
        return _.filter(objects, obj => filters.includes(obj.surface))
    }

    const history = useHistory()
    const handleEdit = (object) => {
        history.push(`/objects/form/${object._id}`)
    }


    return (
        <div className="main">
            <div className="d-flex align-items-center h3-title-box flex-column">
                <h3 className="h3-title">{t('objects_list')}</h3>
                <ObjectsPagination totalObjects={showObjects().length} objectsPerPage={objectsPerPage} currentPage={currentPage} changePage={changePage} />
            </div>
            <div className="players-objects-list">
                <div className="players-objects-list-sort-area">
                    <ObjectsFilter handleFilter={handleFilter} />
                </div>

                <div className="objects-list-cards">
                {objects && showObjects()
                            .slice((currentPage*objectsPerPage)-objectsPerPage,currentPage*objectsPerPage)
                            .map(object => {
                                return (
                                        <div key={object.id}>
                                            <Object object={object} handleDelete={handleDelete} handleEdit={handleEdit} />
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
        objects: getAllObjects(state),
        matches: getAllMatches(state)
    };
}
const mapDispatchToProps = {
    getObjectsList,
    deleteObject,
    deleteMatch
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectsList);