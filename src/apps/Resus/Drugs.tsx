import React, { useState, useRef, useEffect } from 'react';
import './DrugsAndDrips.css';
import { FaCircleInfo } from 'react-icons/fa6';
import DrugInfoDialog from './DrugInfoDialog';
import drugsDataFile from './data/resus-drugs-definitions.json';
import { useResusContext } from './ResusContext';

interface Drug {
  id: string;
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
  drugs: string[];
}

interface MedicationGuide {
  drugs: Drug[];
  sections: Section[];
}

const Drugs: React.FC = () => {
  const { weight } = useResusContext();
  const drugsData: MedicationGuide = drugsDataFile;
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, drugsData.sections.length);
  }, [drugsData.sections]);

  const toggleSection = (index: number) => {
    setExpandedSections(prev => {
      const newState = {
        ...prev,
        [index]: !prev[index]
      };
      
      if (newState[index]) {
        setTimeout(() => {
          sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
      
      return newState;
    });
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

  const getAdministrationUnit = (drugDefinition: Drug) => {
    if (drugDefinition.type === 'mass') {
      return drugDefinition.dose_unit;
    } else {
      return 'ml';
    }
  };

  const getDoseByWeightWithMaxLimit = (drugDefinition: Drug) => {
    let doseByWeight = drugDefinition.dose_per_kg * weight;
    if (drugDefinition.maxDose) {
      doseByWeight = Math.min(Number(drugDefinition.maxDose), doseByWeight);
    }
    if (drugDefinition.minDose) {
      doseByWeight = Math.max(Number(drugDefinition.minDose), doseByWeight);
    }
    return doseByWeight;
  };

  const getDoseByWeightWithMaxLimitFormatted = (drugDefinition: Drug) => {
    return formatNumber(getDoseByWeightWithMaxLimit(drugDefinition));
  };

  const calcAmountToAdminister = (drugDefinition: Drug) => {
    let amount;
    if (drugDefinition.type === 'fluid' || drugDefinition.type === 'mass') {
      amount = getDoseByWeightWithMaxLimit(drugDefinition);
    } else {
      amount = calcVolume(drugDefinition);
    }
    return formatNumber(amount);
  };

  const calcVolume = (drugDefinition: Drug) => {
    const doseByWeight = getDoseByWeightWithMaxLimit(drugDefinition);
    const [numerator, denominator] = splitRatio(drugDefinition.concentration);
    const concentration = numerator / denominator;
    return doseByWeight / concentration;
  };

  if (!drugsData) return null;

  return (
    <div style={{ direction: 'ltr' }}>
      {drugsData.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} ref={el => sectionRefs.current[sectionIndex] = el}>
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
              {section.drugs.map((drugId, drugIndex) => {
                const drug = drugsData.drugs.find(d => d.id === drugId);
                if (!drug) return null;
                return (
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
                );
              })}              
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