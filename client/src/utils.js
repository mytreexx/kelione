export const isAdmin = (user) => {
    return (user === 'admin');
}

export const dateFormat = (dateString) =>dateString.split('-').reverse().join('/');
