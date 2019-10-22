import React, {Fragment} from 'react';
import FriendRow from './FriendRow';
import { isArray } from "../../../helpers/functions";
import IconButton from '@material-ui/core/IconButton';
import Preloader from "../../HelperComponents/Preloader/Preloader";
import { Transition } from 'react-spring/renderprops';

import CloseIcon from '@material-ui/icons/Close';
import StatusIcon from '@material-ui/icons/FiberManualRecord';

const SentFriendRequests = ({data, deleteRequest, current}) => {
    return (
        <Fragment>
            {!data.count && data.count !== 0 ?
                <Preloader/>
                :
                isArray(data.results) ?
                    <Transition
                        items={data.results}
                        keys={item => item.id}
                        from={{ transform: 'scale(0.6)', opacity: 0 }}
                        enter={{ transform: 'scale(1)', opacity: 1 }}
                        leave={{ }}>
                        {(item, e, i) => style =>
                            <FriendRow
                                key={item.id}
                                num={(i + 1) + (current - 1) * 10}
                                style={style}
                                {...item}
                            >
                                <div className="flex-center-btw">
                                    <div className="friend_request_status">
                                        <p>Pending</p>
                                        <StatusIcon/>
                                    </div>
                                    <IconButton
                                        onClick={() => deleteRequest(item.id)}
                                    >
                                        <CloseIcon/>
                                    </IconButton>
                                </div>
                            </FriendRow>
                        }
                    </Transition>
                    :
                    <div className="friends_row_no_data">
                        No data
                    </div>
            }
        </Fragment>
    );
};

export default SentFriendRequests;