export interface Alarm {
    id: number;
    resourceId: number;
    notificationTypeContent: string;
    content: string;
    createdAt: string;
    state: boolean
    notificationType: string;
}

export interface AlarmList {
    page: number;
    totalSize: number;
    result: Alarm[];
}