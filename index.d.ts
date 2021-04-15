import type { Plugin } from 'vue';
export interface NotificationOptions {
  title?: string;
  text?: string;
  type?: string;
  group?: string;
  duration?: number;
  speed?: number;
  data?: unknown;
  clean?: boolean;
}
export interface NotificationPluginOptions {
  name?: string;
  componentName?: string;
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $notify: (data: NotificationOptions) => void;
  }
}

declare function VueNotification(args?: NotificationPluginOptions): Plugin;

export declare function notify(data: NotificationOptions): void;

export default VueNotification;
