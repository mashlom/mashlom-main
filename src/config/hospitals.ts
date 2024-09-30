import { MashlomApps, MashlomAppType } from './apps';

export interface HospitalConfig {
  name: string;
  apps: MashlomAppType[];
  theme: {
    primaryColor: string;
    // Add more theme properties as needed
  };
}

export const hospitals: Record<string, HospitalConfig> = {
  all: {
    name: 'כללי',
    apps: [
      MashlomApps.PHOTOTHERAPY,
      MashlomApps.EOS,
      MashlomApps.TRIAGE,
      MashlomApps.DEMO,
    ],
    theme: {
      primaryColor: '#007bff',
    },
  },
  assuta: {
    name: 'אסותא אשדוד',
    apps: [
      MashlomApps.PHOTOTHERAPY,
      MashlomApps.EOS,
      MashlomApps.TRIAGE
    ],
    theme: {
      primaryColor: '#007bff',
    },
  },
  kaplan: {
    name: 'קפלן',
    apps: [
      MashlomApps.PHOTOTHERAPY,
      MashlomApps.TRIAGE,
      MashlomApps.RESUS,
    ],
    theme: {
      primaryColor: '#007bff',
    },
  },
  emek: {
    name: 'מרכז רפואי העמק;',
    apps: [
      MashlomApps.RESUS,
      MashlomApps.TRIAGE,
      MashlomApps.PHOTOTHERAPY,
    ],
    theme: {
      primaryColor: '#007bff',
    },
  },
  // Add more hospitals here
};
