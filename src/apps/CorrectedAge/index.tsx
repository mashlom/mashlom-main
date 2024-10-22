import { faCalculator, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { TabbedLayout } from '../../components/TabbedLayout';
import CorrectedAgeCalculator from './CorrectedAgeCalculator';
import { NavigationItem } from '../../components/AppLayout';

const navigationItems: NavigationItem[] = [
  {
    id: 'calculator',
    label: 'מחשבון',
    icon: faCalculator,
    component: CorrectedAgeCalculator,
  },
  {
    id: 'graphs',
    label: 'גרפים',
    icon: faChartLine,
    component: () => <div>Graphs Component</div>,
  },
];

interface CorrectedAgeProps {
  hospital: string;
}

const CorrectedAge: React.FC<CorrectedAgeProps> = ({ hospital }) => {
  console.log('hospital:', hospital);
  return <TabbedLayout items={navigationItems} />;
};

export default CorrectedAge;
