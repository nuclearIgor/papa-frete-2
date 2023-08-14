export const brDateToUtc = (strDate) => {
    const a = strDate.split('/')
    return `${a[1]}-${a[0]}-${a[2]}`
}