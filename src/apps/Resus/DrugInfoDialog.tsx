import React from 'react';
import Modal from '../../components/Modal'; // Adjust this import path as needed

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
    >
      <div>
        <p><strong>Dosage used:</strong> {drug.dose_per_kg} {drug.dose_unit}/kg</p>
        {drug.dose_range && <p><strong>Dosage range:</strong> {drug.dose_range}</p>}
        {drug.prepare_instructions && <p><strong>Dilution instructions:</strong> {drug.prepare_instructions}</p>}
        {drug.maxDose && <p><strong>Max dose:</strong> {drug.maxDose} {drug.maxDoseUnit}</p>}
        {drug.minDose && <p><strong>Min dose:</strong> {drug.minDose} {drug.minDoseUnit}</p>}
        {drug.concentration && (
          <p>
            <strong>Concentration:</strong> {splitRatio(drug.concentration)[0]} {drug.dose_unit} per{' '}
            {splitRatio(drug.concentration)[1]} ml
          </p>
        )}
        {drug.administrationInstructions && (
          <p><strong>Administration:</strong> {drug.administrationInstructions}</p>
        )}
      </div>
    </Modal>
  );
};

export default DrugInfoDialog;