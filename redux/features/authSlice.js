const initialState = {
    auth: {},
    userToken: ""
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "USER_LOGIN":
            return {
                ...state,
                auth: action.payload,
                userToken: action.payload.token
            }
        case "USER_LOGOUT":
            return state = null
        default:
            return state;
    }
}
