import React from 'react';
import FriendItem from './FriendItem';
import FriendsLoader from './FriendsLoader';
import ScrollBar from '../../HelperComponents/ScrollBar/ScrollBar';
import {isArray} from "../../../helpers/functions";

const FriendsListSection = ({data, title, onSeeAll, type, full, searchMore}) => {
    const hasItems = isArray(data.results);
    return (
        <div className="friends_list_section">
            <header>
                <h4>{title}</h4>
                {hasItems ?
                    <button
                        className="profile_button"
                        onClick={() => onSeeAll(type)}
                    >
                        {full ? 'See Less' : 'See all'}
                    </button>
                    :
                    null
                }
            </header>
            <ScrollBar
                onScroll={data.next !== null && full
                    ? (e) => searchMore(type, e.target)
                    : null
                }
                maxHeight="calc(100vh - 289px)"
            >
                {!data.count && data.count !== 0 ?
                    <FriendsLoader/>
                    :
                    hasItems ?
                        data.results.map((item, i) => {
                            if(!full && i < 5) {
                                return (
                                    <FriendItem
                                        key={i}
                                        {...item}
                                    />
                                );
                            } else if(full) {
                                return (
                                    <FriendItem
                                        key={i}
                                        {...item}
                                    />
                                );
                            } else return null;
                        })
                        :
                        <p className="no_items">
                            No items
                        </p>
                }
            </ScrollBar>
        </div>
    );
};

export default FriendsListSection;