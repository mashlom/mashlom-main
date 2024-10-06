import React, { useState } from 'react';
import './DrugsAndDrips.css';
import { FaCircleInfo } from 'react-icons/fa6';
import DrugInfoDialog from './DrugInfoDialog';
import drugsDataFile from './data/resus-drugs-definitions.json';

interface Drug {
  name: string;
  howToGive: string;
  dose_per_kg: number;
  dose_unit: string;
  concentration: string;
  maxDose?: string;
  maxDoseUnit?: string;
  minDose?: string;
  minDoseUnit?: string;
  dose_range?: string;
  prepare_instructions?: string;
  administrationInstructions?: string;
  shouldDispalyConcentration?: boolean;
  comment?: string;
  type?: string;
  warnText?: string;
}

interface Section {
  name: string;
  drugs: Drug[];
}

interface MedicationGuide {
  sections: Section[];
}

export interface DrugsProps {
    weight: number
  }

const Drugs: React.FC<DrugsProps> = ({ weight }) => {
  const drugsData: MedicationGuide = drugsDataFile;
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const openDrugInfoDialog = (drug: Drug) => {
    setSelectedDrug(drug);
    setIsModalOpen(true);
  };

  const formatNumber = (num: number) => {
    let formatted = num.toFixed(2);
    formatted = formatted.replace(/\.?0+$/, '');
    return formatted;
  };

  const splitRatio = (ratio: string) => {
    return ratio.split('/').map(Number);
  };

  const getAdministrationUnit = (drugDefinition: any) => {
    if (drugDefinition.type === 'mass') {
      return drugDefinition.dose_unit;
    } else {
      return 'ml';
    }
  };

  const getDoseByWeightWithMaxLimit = (drugDefinition: any) => {
    let doseByWeight = drugDefinition.dose_per_kg * weight;
    if (drugDefinition.maxDose) {
      doseByWeight = Math.min(drugDefinition.maxDose, doseByWeight);
    }
    if (drugDefinition.minDose) {
      doseByWeight = Math.max(drugDefinition.minDose, doseByWeight);
    }
    return doseByWeight;
  };

  const getDoseByWeightWithMaxLimitFormatted = (drugDefinition: any) => {
    return formatNumber(getDoseByWeightWithMaxLimit(drugDefinition));
  };

  const calcAmountToAdminister = (drugDefinition: any) => {
    let amount;
    if (drugDefinition.type === 'fluid' || drugDefinition.type === 'mass') {
      amount = getDoseByWeightWithMaxLimit(drugDefinition);
    } else {
      amount = calcVolume(drugDefinition);
    }
    return formatNumber(amount);
  };

  const calcVolume = (drugDefinition: any) => {
    const doseByWeight = getDoseByWeightWithMaxLimit(drugDefinition);
    const [numerator, denominator] = splitRatio(drugDefinition.concentration);
    const concentration = numerator / denominator;
    return doseByWeight / concentration;
  };

  if (!drugsData) return null;

  return (
    <div style={{ direction: 'ltr' }}>
      {drugsData.sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h4 
            className="drugs-header" 
            onClick={() => toggleSection(sectionIndex)}
          >
            <span className="toggle-icon">
              {expandedSections[sectionIndex] ? '-' : '+'}
            </span>
            <span className="section-name">{section.name}</span>
          </h4>
          {expandedSections[sectionIndex] && (
            <div id="collapseable-area-drugs" className="collapseable">
              <ul className="list-group custom-list-group">
              {section.drugs.map((drug, drugIndex) => (                
                <li key={drugIndex} className='list-group-item' style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left', color: 'var(--page-font-color)' }}>
                  <div>
                    {!drug.type ? (
                      <>
                        {drug.name}: <strong>{getDoseByWeightWithMaxLimitFormatted(drug)} {drug.dose_unit},</strong>{' '}
                        <strong>{calcAmountToAdminister(drug)} {getAdministrationUnit(drug)}</strong> -{' '}
                        <span className={drug.howToGive && drug.howToGive.trim() !== 'IV' ? 'bold-text' : ''}>
                          {drug.howToGive}
                        </span>
                      </>
                    ) : (
                      <>
                        {drug.name}: <strong>{calcAmountToAdminister(drug)} {getAdministrationUnit(drug)}</strong> -{' '}
                        <span className={drug.howToGive && drug.howToGive.trim() !== 'IV' ? 'bold-text' : ''}>
                          {drug.howToGive}
                        </span>
                      </>
                    )}
                    <br />
                    Calculated dose: {drug.dose_per_kg} {drug.dose_unit}/kg
                    {drug.shouldDispalyConcentration && (
                      <>
                        <br />
                        Concentration: <strong>{splitRatio(drug.concentration)[0]} {drug.dose_unit} per {splitRatio(drug.concentration)[1]} ml</strong>
                      </>
                    )}
                    {drug.comment && (
                      <>
                      <br />
                      {drug.comment}
                      </>
                    )}
                    {drug.warnText && (
                      <>
                      <br />
                      <span style={{ color: 'red' }}><strong>{drug.warnText}</strong></span>
                      </>
                    )}
                    {drug.maxDose && Number(drug.maxDose) === getDoseByWeightWithMaxLimit(drug) && (
                      <>
                      <br /><span style={{ color: 'red' }}><strong>Used max dose of {drug.maxDose} {drug.maxDoseUnit}</strong></span>
                      </>
                    )}
                  </div>
                  <div className="info-button" onClick={() => openDrugInfoDialog(drug)}>
                      <FaCircleInfo style={{ marginLeft: '10px', cursor: 'pointer' }} />
                  </div>
                </li>
              ))}              
              </ul>
            </div>
          )}
        </div>
      ))}
      {selectedDrug && (
        <DrugInfoDialog
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          drug={selectedDrug}
        />
      )}
    </div>
  );
};

export default Drugs;