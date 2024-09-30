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
    title: 'אלח דם',
    icon: 'faVialVirus',
    credit: 'אסותא אשדוד'
  },
  demo: {
    title: 'Demo',
    icon: 'faBaby',
    credit: 'דמו בית חולים'
  },
  triage: {
    title: 'טריאז\'',
    icon: 'faUserDoctor',
    credit: 'אסותא אשדוד'
  },
  phototherapy: {
    title: 'צהבת ביילוד',
    icon: 'faBaby',
    credit: 'אסותא אשדוד'
  },
  resus: {
    title: 'תרופות החייאה',
    icon: 'faSyringe',
    credit: 'העמק',
    inDevelopment: true
  },
};
