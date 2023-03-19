
export const dateToMySQLTimestamp = (date: Date) =>
    date.toISOString().slice(0, 19).replace('T', ' ');