import * as Icons from '@fortawesome/free-solid-svg-icons';
import { SEOProps } from '../components/SEO';

export const MashlomApps = {
  EOS: 'eos',
  DEMO: 'demo',
  TRIAGE: 'triage',
  PHOTOTHERAPY: 'phototherapy',
  RESUS: 'resus',
  CPR: 'cpr'
} as const;

export type MashlomAppType = typeof MashlomApps[keyof typeof MashlomApps];

export interface AppSection {
    name: string;
    apps: MashlomAppType[];  
}

interface AppConfig {
    title: string;
    icon: keyof typeof Icons;
    inDevelopment?: boolean;
    credit: string;
    seo: SEOProps;
}

export const AppsConfigList: Record<MashlomAppType, AppConfig> = {
  [MashlomApps.EOS]: {
    title: 'אלח דם',
    icon: 'faVialVirus',
    credit: 'אסותא אשדוד',
    seo: {
      tabTitle: "אלח דם - חטיבת ילדים",
      title: "אלח דם, חטיבת ילדים",
      url: "https://mashlom.me/#/apps/eos",
      description: "מחשבון טיפול באלח דם",
      keywords: "רופאים, מחשבונים, רפואת ילדים, יילוד, eos, אלח דם, early onset sepsis"
    }
  },
  [MashlomApps.DEMO]: {
    title: 'Demo',
    icon: 'faBaby',
    credit: 'דמו בית חולים',
    seo: {
      tabTitle: "אפליקציית דמו",
      title: "דמו",
      url: "",
      description: "",
      keywords: "דמו"
    }
  },
  [MashlomApps.TRIAGE]: {
    title: 'טריאז\'',
    icon: 'faUserDoctor',
    credit: 'אסותא אשדוד',
    seo: {
      tabTitle: "טריאז' מיון - מחלקת ילדים",
      title: "טריאז' מיון, חטיבת ילדים",
      url: "https://mashlom.me/#/apps/triage",
      description: "טריאז' מיון ילדים",
      keywords: "רופאים, מחשבונים, רפואת ילדים, טריאז', Pediatric Canadian Triage"
    }
  },
  [MashlomApps.PHOTOTHERAPY]: {
    title: 'צהבת ביילוד',
    icon: 'faBaby',
    credit: 'אסותא אשדוד',
    seo: {
      tabTitle: "צהבת ביילוד - חטיבת ילדים",
      title: "צהבת ביילוד, חטיבת ילדים",
      url: "https://mashlom.me/#/apps/phototherapy",
      description: "מחשבון טיפול בצהבת ביילוד",
      keywords: "רופאים, מחשבונים, רפואת ילדים, צהבת, יילוד, עקומת בוטאני, phototherapy"
    }
  },
  [MashlomApps.RESUS]: {
    title: 'תרופות החייאה',
    icon: 'faSyringe',
    credit: 'העמק',
    inDevelopment: true,
    seo: {
      tabTitle: "תרופות החייאה - מלרד ילדים",
      title: 'תרופות החייאה, מלר"ד ילדים',
      url: "https://mashlom.me/#/apps/resus",
      description: "מחשבון תרופות החייאה",
      keywords: "רופאים, מחשבונים, רפואת ילדים, תרופות החייאה, resus"
    }
  },
  [MashlomApps.CPR]: {
    title: 'החייאה',
    icon: 'faHeartPulse',
    credit: 'העמק',
    inDevelopment: true,
    seo: {
      tabTitle: "החייאה - מלרד ילדים",
      title: 'החייאה, מלר"ד ילדים',
      url: "https://mashlom.me/#/apps/cpr",
      description: "החייאה",
      keywords: "רופאים, מחשבונים, רפואת ילדים, החייאה, resus"
    }
  },
};
