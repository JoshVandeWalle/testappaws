import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
    FETCH_BY_ID: 'FETCH_BY_ID'
}

export const fetchAll = () => dispatch => {
    api.user().fetchAll()
    .then(
        response => {
            if (response.status == 200){
                dispatch({
                    type: ACTION_TYPES.FETCH_ALL,
                    payload: response.data.data
                    //payload: response.data
                })
            }
            else {
                dispatch({
                    type: ACTION_TYPES.FETCH_ALL,
                    payload: []
                })
            }
        })
    .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    // data = formatData()
    api.user().create(data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: res.data
        })
        let serverValidationPassed = res.data.data.length ? true : false
        onSuccess(serverValidationPassed)
    })
    .catch(err => console.log(err))
}

export const fetchById = (id, onSuccess) => dispatch => {
    api.user.fetchById(id)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.FETCH_BY_ID,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

export const update = (data, onSuccess) => dispatch => {
    // data = formatData()
    api.user().update(data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: res.data
        })
        let serverValidationPassed = res.data.data.length ? true : false
        onSuccess(serverValidationPassed)
    })
    .catch(err => console.log(err))
}

export const del = (id, onSuccess) => dispatch => {
    // data = formatData()
    api.user().delete(id)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}
