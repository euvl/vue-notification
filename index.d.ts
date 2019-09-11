import { PluginFunction } from 'vue';

export interface NotificationOptions {
    title?: string;
    text?: string;
    type?: string;
    group?: string;
    duration?: number;
    speed?: number;
    data?: object;
    clean?: boolean;
}

declare module 'vue/types/vue' {
    interface Vue {
        $notify: (options: NotificationOptions | string) => void;
    }
    interface VueConstructor {
        notify: (options: NotificationOptions | string) => void;
    }
}

declare class VueNotification {
    static install: PluginFunction<any>;
}

export default VueNotification;
