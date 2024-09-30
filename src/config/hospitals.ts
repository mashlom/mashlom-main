import { MashlomApps, AppSection } from './apps';

export interface HospitalConfig {
  name: string;
  // apps: MashlomAppType[];
  sections: AppSection[];
  theme: {
    primaryColor: string;
    // Add more theme properties as needed
  };
}

export const hospitals: Record<string, HospitalConfig> = {
  apps: {
    name: 'כללי',
    sections: [
      {
        name: 'מחלקת ילדים',
        apps:[
          MashlomApps.PHOTOTHERAPY,
          MashlomApps.EOS,
        ]
      },
      {
        name: 'מלר"ד ילדים',
        apps:[
          MashlomApps.TRIAGE,
          MashlomApps.RESUS
        ]
      }
    ],
    theme: {
      primaryColor: '#007bff',
    },
  },
  assuta: {
    name: 'אסותא אשדוד',
    sections: [
      {
        name: 'מחלקת ילדים',
        apps:[
          MashlomApps.PHOTOTHERAPY,
          MashlomApps.EOS,
        ]
      },
      {
        name: 'מלר"ד ילדים',
        apps:[
          MashlomApps.TRIAGE,
        ]
      }
    ],
    theme: {
      primaryColor: '#007bff',
    },
  },
  kaplan: {
    name: 'קפלן',
    sections: [
      {
        name: 'מלר"ד ילדים - קפלן',
        apps:[
          MashlomApps.PHOTOTHERAPY,
          MashlomApps.TRIAGE,
          MashlomApps.RESUS,
        ]
      }
    ],
    theme: {
      primaryColor: '#007bff',
    },
  },
  emek: {
    name: 'מרכז רפואי העמק;',
    sections: [
      {
        name: 'מלר"ד ילדים',
        apps:[
          MashlomApps.RESUS,
          MashlomApps.TRIAGE,
          MashlomApps.PHOTOTHERAPY,
        ]
      }
    ],
    theme: {
      primaryColor: '#007bff',
    },
  },
  // Add more hospitals here
};
