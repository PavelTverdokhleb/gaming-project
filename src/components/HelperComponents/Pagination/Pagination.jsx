import React from 'react';
import Pagination from "react-js-pagination";
import PrevIcon from '@material-ui/icons/KeyboardArrowLeft';
import NextIcon from '@material-ui/icons/KeyboardArrowRight';
import './Pagination.scss';

const PaginationComponent = ({current, pageCount, total, onChange, name}) => (
    <div className="pagination_wrapper">
        <Pagination
            activePage={current}
            itemsCountPerPage={pageCount}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            onChange={(e) => onChange(name, e)}
            hideFirstLastPages={true}
            prevPageText={<PrevIcon/>}
            nextPageText={<NextIcon/>}
            itemClassPrev="pagin_prev"
            itemClassNext="pagin_next"
            itemClass="pagin_item"
            activeClass="pagin_item_active"
        />
        <span>{`${1 + (current - 1) * 10} - ${current * 10}`}</span>
    </div>
);

export default PaginationComponent;