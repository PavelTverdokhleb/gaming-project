import React, {Fragment} from 'react';
import FriendRow from './FriendRow';
import { isArray } from "../../../helpers/functions";
import IconButton from '@material-ui/core/IconButton';
import Preloader from "../../HelperComponents/Preloader/Preloader";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Transition } from 'react-spring/renderprops';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

const ReceivedFriendRequests = ({data, acceptRequest, deleteRequest, loadingAccept, disabled, current}) => {
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
                        leave={{}}
                    >
                        {(item, e, i) => style => {
                            const loading = loadingAccept === item.id;
                            const disable = disabled === item.id;
                            return (
                                <FriendRow
                                    key={item}
                                    num={(i + 1) + (current - 1) * 10}
                                    style={style}
                                    {...item}
                                >
                                    <div className="flex-center-btw">
                                        <Button
                                            classes={{
                                                root: "friend_action_button"
                                            }}
                                            disabled={loading || disable}
                                            onClick={() => acceptRequest(item.id)}
                                        >
                                            {loading
                                                ? <CircularProgress size={24} classes={{root: 'btn_progress_accept'}} />
                                                : 'ACCEPT'
                                            }
                                        </Button>
                                        <IconButton
                                            onClick={() => deleteRequest(item.id)}
                                        >
                                            <CloseIcon/>
                                        </IconButton>
                                    </div>
                                </FriendRow>
                            );
                        }}
                    </Transition>
                    :
                    <div className="friends_row_no_data">
                        No data
                    </div>
            }
        </Fragment>
    );
};

export default ReceivedFriendRequests;