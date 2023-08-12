export interface Alarm {
    resourceId: number;
    content: string;
    createdAt: string;
    state: boolean
}

export interface AlarmList {
    page: number;
    totalSize: number;
    result: Alarm[];
}