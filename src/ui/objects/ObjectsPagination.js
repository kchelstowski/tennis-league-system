import React from 'react';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';

const ObjectsPagination = ({totalObjects,objectsPerPage,changePage,currentPage}) => {
    const pageNumbers = []


    for (let i = 1; i<=Math.ceil(totalObjects/objectsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <nav aria-label='...'>
                <MDBPagination size='sm' className='mb-0'>
                    {pageNumbers.map(number => (
                        <MDBPaginationItem active={number===currentPage} key={number}>
                            <MDBPaginationLink onClick={() => changePage(number)} tag='span'>
                                {number}
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                    ))}

                </MDBPagination>
            </nav>
        </div>
    );
};

export default ObjectsPagination;