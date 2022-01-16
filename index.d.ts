import { PluginFunction } from 'vue';

type Id = string | number;

export interface NotificationOptions {
    id?: Id;
    title?: string;
    text?: string;
    type?: string;
    group?: string;
    duration?: number;
    speed?: number;
    data?: object;
    clean?: boolean;
}

interface Notify {
    (text: string): void;
    (options: NotificationOptions): void;
    close(id: Id): void;
}

/**
    To use in:

    ```ts
    declare module 'vue/types/vue' {
        interface Vue extends Notification<'customNotifyName'> {}
    }
    ```
*/
export type Notification<Name extends string> = {
    [key in Name]: Notify;
}

declare class VueNotification {
    static install: PluginFunction<any>;
}

export default VueNotification;
