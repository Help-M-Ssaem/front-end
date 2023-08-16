export interface Alarm {
    resourceId: number;
    content: string;
    createdAt: string;
    state: boolean
    type: string;
}

export interface AlarmList {
    page: number;
    totalSize: number;
    result: Alarm[];
}