import React from 'react';
import Modal, {ModalDirectionOptions} from '../../components/Modal'; // Adjust this import path as needed

interface Drug {
  name: string;
  dose_per_kg: number;
  dose_unit: string;
  dose_range?: string;
  prepare_instructions?: string;
  maxDose?: string;
  maxDoseUnit?: string;
  minDose?: string;
  minDoseUnit?: string;
  concentration?: string;
  administrationInstructions?: string;
}

interface DrugInfoDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  drug: Drug;
}

const DrugInfoDialog: React.FC<DrugInfoDialogProps> = ({ isOpen, setIsOpen, drug }) => {
  const splitRatio = (ratio: string): number[] => {
    return ratio.split('/').map(Number);
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={drug.name}
      primaryButton={{ text: 'סגור' }}
      direction={ModalDirectionOptions.LTR}
    >
      <div>
        <div><strong>Dosage used:</strong> {drug.dose_per_kg} {drug.dose_unit}/kg</div>
        {drug.dose_range && <div><strong>Dosage range:</strong> {drug.dose_range}</div>}
        {drug.prepare_instructions && <div><strong>Dilution instructions:</strong> {drug.prepare_instructions}</div>}
        {drug.maxDose && <div><strong>Max dose:</strong> {drug.maxDose} {drug.maxDoseUnit}</div>}
        {drug.minDose && <div><strong>Min dose:</strong> {drug.minDose} {drug.minDoseUnit}</div>}
        {drug.concentration && (
          <div>
            <strong>Concentration:</strong> {splitRatio(drug.concentration)[0]} {drug.dose_unit} per{' '}
            {splitRatio(drug.concentration)[1]} ml
          </div>
        )}
        {drug.administrationInstructions && (
          <div><strong>Administration:</strong> {drug.administrationInstructions}</div>
        )}
      </div>
    </Modal>
  );
};

export default DrugInfoDialog;