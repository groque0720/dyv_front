const getDateFormat = ( dateString ) => {

    if (dateString == null) return '-'

    const date = new Date( dateString )

    let day = date.getDate() + 1
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if (day <= 9) day = `0${day}`
    if (month <= 9) month = `0${month}`

    return `${day}-${month}-${year}`
}

export default getDateFormat