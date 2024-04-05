export function monthStartDate(date = new Date()) {
    return new Date(date.getFullYear(), date.getUTCMonth(), 1)
}

export function monthEndDate(date = new Date()) {
    return new Date(date.getFullYear(), date.getUTCMonth() + 1, 1)
}

export function calendarStartDate(date = new Date()) {
    const monthBeginDate = monthStartDate(date)
    const monthBeginDateInWeek = monthBeginDate.getDay()
    monthBeginDate.setDate(monthBeginDate.getDate() - monthBeginDateInWeek + 1)
    return monthBeginDate
}

export function weeksNumberIncludedInMonth(date = new Date()): number {
    const _monthEndDate = monthEndDate(date)
    _monthEndDate.setDate(_monthEndDate.getDate() -1)
    const totalDaysInMonthe = _monthEndDate.getDate()
    return Math.ceil(totalDaysInMonthe / 7)
}

export function isDateInRange(date: Date, startDate: Date, endDate?: Date): boolean {
    const isSameDateWithStartDate = startDate.getFullYear() == date.getFullYear() && startDate.getMonth() == date.getMonth() && startDate.getDate() == date.getDate()
    if (isSameDateWithStartDate) return true
    if (endDate && startDate.getDate() != endDate.getDate()) {
        const dateTimestamp = date.getTime()
        return endDate.getTime() > dateTimestamp && dateTimestamp > startDate.getTime()
    }

    return false
}