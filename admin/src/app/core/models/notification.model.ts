export class SysNotify {
    SysPushType: number;
    SourceId: string;
}

export class Notification {
    Alert: string;
    Notify: SysNotify = new SysNotify();
    PicUrl: string;
    Timestamp = Date.now();
}
