import React, {Fragment} from 'react';
import FriendRow from './FriendRow';
import { isArray } from "../../../helpers/functions";
import PoinsBlock from '../../AppBlocks/PointsBlock/PointsBlock';
import Preloader from "../../HelperComponents/Preloader/Preloader";

const InvitedFriends = ({data, current}) => {
    return (
        <Fragment>
            {!data.count && data.count !== 0 ?
                <Preloader/>
                :
                isArray(data.results) ?
                    data.results.map((item, i) => (
                        <FriendRow
                            key={item}
                            num={(i + 1) + (current - 1) * 10}
                            {...item}
                        >
                            <div>
                                {console.log(item.username)}
                                <PoinsBlock
                                    value={item.reward}
                                    type="friends"
                                />
                            </div>
                        </FriendRow>
                    ))
                    :
                    <div className="friends_row_no_data">
                        No data
                    </div>
            }
        </Fragment>
    );
};

export default InvitedFriends;