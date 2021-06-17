const serverUrl = process.env.REACT_APP_SERVER_URL || '';

export const addNewVacation = (requestOptions) => {
    return fetch(`${serverUrl}/vacations/new`, requestOptions)
}

export const getGraphData = () => {
    return fetch(`${serverUrl}/vacations/graph`)
        .then((res) => res.json())
}

export const login = (requestOptions) => {
    return fetch(`${serverUrl}/login`, requestOptions)
}

export const register = (requestOptions) => {
    return fetch(`${serverUrl}/register`, requestOptions)
}

export const getVacationsList = (requestOptions) => {
    return fetch(`${serverUrl}/vacations`, requestOptions)
        .then((result) => result.json())
}

export const editVacation = (requestOptions) => {
    return fetch(`${serverUrl}/vacations`, requestOptions);
}

export const deleteVacationRequest = (requestOptions) => {
    return fetch(`${serverUrl}/vacations`, requestOptions)
}

export const followOrUnfollow = (requestOptions) => {
    return fetch(`${serverUrl}/follow`, requestOptions)
}

export const search = (description, startingDate, endingDate) => {
    return fetch(`${serverUrl}/vacations/search/?searchTerm=${description}&startingDate=${startingDate}&endingDate=${endingDate}`)
        .then((res) => res.json())
}