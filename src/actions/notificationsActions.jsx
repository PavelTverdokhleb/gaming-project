import * as types from './constants.jsx';

export function setNotificationsList(data) {
    return {
        type: types.SET_NOTIFICATIONS_SECTIONS,
        data
    }
}

export function clearNotifications() {
    return {
        type: types.CLEAR_NOTIFICATIONS
    }
}

export function getNotifications() {
    return {
        type: types.GET_NOTIFICATIONS,
        payload: {
            client: 'default',
            request: {
                url: `/notification/`,
                method: "get"
            }
        }
    };
}

export function deleteNotification(id) {
    return {
        type: types.DELETE_NOTIFICATION,
        payload: {
            client: 'default',
            request: {
                url: `/notification/${id}/`,
                method: "delete"
            }
        }
    };
}

export function patchNotificationsSections(data) {
    return {
        type: types.UPDATE_NOTIFICATIONS_SECTIONS,
        payload: {
            client: 'default',
            request: {
                url: `/notification/summary/`,
                method: "patch",
                data
            }
        }
    };
}