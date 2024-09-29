import * as Icons from '@fortawesome/free-solid-svg-icons';

export const MashlomApps = {
  EOS: 'eos',
  DEMO: 'demo',
  TRIAGE: 'triage',
  PHOTOTHERAPY: 'phototherapy',
} as const;

export type MashlomAppType = typeof MashlomApps[keyof typeof MashlomApps];

interface AppConfig {
    title: string;
    icon: keyof typeof Icons;
    inDevelopment?: boolean;
}

export const AppsConfigList: Record<MashlomAppType, AppConfig> = {
  eos: {
    title: 'EOS',
    icon: 'faUser',
    inDevelopment: true,
  },
  demo: {
    title: 'Demo',
    icon: 'faBaby',
  },
  triage: {
    title: 'Triage',
    icon: 'faUser',
  },
  phototherapy: {
    title: 'Phototherapy',
    icon: 'faSyringe',
  },
};
