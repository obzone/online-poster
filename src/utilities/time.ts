export function monthStartDate(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function monthEndDate(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1)
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