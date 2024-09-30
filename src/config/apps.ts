import * as Icons from '@fortawesome/free-solid-svg-icons';

export const MashlomApps = {
  EOS: 'eos',
  DEMO: 'demo',
  TRIAGE: 'triage',
  PHOTOTHERAPY: 'phototherapy',
  RESUS: 'resus'
} as const;

export type MashlomAppType = typeof MashlomApps[keyof typeof MashlomApps];

interface AppConfig {
    title: string;
    icon: keyof typeof Icons;
    inDevelopment?: boolean;
    credit: string;
}

export const AppsConfigList: Record<MashlomAppType, AppConfig> = {
  eos: {
    title: 'EOS',
    icon: 'faUser',
    inDevelopment: true,
    credit: 'אסותא אשדוד'
  },
  demo: {
    title: 'Demo',
    icon: 'faBaby',
    credit: 'דמו בית חולים'
  },
  triage: {
    title: 'Triage',
    icon: 'faUser',
    credit: 'אסותא אשדוד'
  },
  phototherapy: {
    title: 'Phototherapy',
    icon: 'faSyringe',
    credit: 'אסותא אשדוד'
  },
  resus: {
    title: 'Resus',
    icon: 'faBaby',
    credit: 'העמק'
  },
};
