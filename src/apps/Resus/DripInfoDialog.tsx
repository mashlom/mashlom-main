import React from 'react';
import Modal from '../../components/Modal'; // Adjust this import path as needed

interface Drip {
  name: string;
  dose_unit: string;
  allowed_dose_range: string;
  calc_type: string;
  dose_per_kg_per_min?: number;
  dose_per_kg_per_hour?: number;
}

interface DripInfoDialogProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    drip: Drip;
    weight: number;
  }
  
  const DripInfoDialog: React.FC<DripInfoDialogProps> = ({ isOpen, setIsOpen, drip }) => {
    const getDripRate = (drip: Drip): number | undefined => {
      return drip.dose_per_kg_per_min ?? drip.dose_per_kg_per_hour;
    };
  
    const getTimeUnitString = (drip: Drip): string => {
      return drip.dose_per_kg_per_min ? 'minute' : 'hour';
    };
  
    return (
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`${drip.name} Drips`}
        primaryButton={{ text: 'סגור' }}
      >
        <div>
          <p><strong>Initial rate:</strong> {getDripRate(drip)} {drip.dose_unit}/kg/{getTimeUnitString(drip)}</p>
          <p><strong>Rate range:</strong> {drip.allowed_dose_range}</p>
        </div>
      </Modal>
    );
  };
  
  export default DripInfoDialog;