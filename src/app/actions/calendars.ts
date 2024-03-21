'use server'

export interface Activity {
    title: string,
    subject?: string,
    startTime: Date,
    endTime?: Date,
    spot: string,
    target?: string
    tags?: Array<string>
}

export async function getAll(): Promise<Array<Activity>> {
    return [{
        title: 'TITLE CAN BE VERY LONG',
        subject: 'introduct the activty',
        startTime: new Date(),
        endTime: new Date(),
        spot: 'can be a text to describe the spot',
        target: 'maybe empty sometimes',
        tags: ['food', '$4/per']
    }, {
        title: 'TITLE CAN BE VERY LONG',
        subject: 'introduct the activty',
        startTime: new Date(),
        endTime: new Date(),
        spot: 'can be a text to describe the spot',
        target: 'maybe empty sometimes',
        tags: ['food', '$4/per']
    }, {
        title: 'TITLE CAN BE VERY LONG',
        subject: 'introduct the activty',
        startTime: new Date(),
        endTime: new Date(),
        spot: 'can be a text to describe the spot',
        target: 'maybe empty sometimes',
        tags: ['food', '$4/per']
    }]
}
export async function getById(id: string) {
    
}