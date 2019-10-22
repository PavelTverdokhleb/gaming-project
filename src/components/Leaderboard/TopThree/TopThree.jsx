import React from 'react';
import TopItem from './TopItem';
import { Trail } from 'react-spring/renderprops';
import './TopThree.scss';

const TopThree = ({data}) => {
    return (
        <section className="top_leaderboard_wrapper">
            <Trail
                items={data}
                keys={item => item.id}
                from={{ transform: 'translate3d(0,-40px,0)', opacity: 0 }}
                to={{ transform: 'translate3d(0,0px,0)', opacity: 1 }}
                conf={{delay: 900}}
            >
                {item => style =>
                    <TopItem
                        {...item}
                        style={style}
                    />
                }
            </Trail>
        </section>
    );
};

export default TopThree;