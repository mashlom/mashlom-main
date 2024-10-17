import React from 'react';
import { Button } from 'react-bootstrap';
import './styles.css';

interface ButtonColorProps {
  primaryColor: string;
  secondaryColor: string;
  hoverColor: string;
  textColor: string;
}

const defaultColors: ButtonColorProps = {
  primaryColor: '#3F6186',
  secondaryColor: '#3DB5A5',
  hoverColor: '#4A77A0',
  textColor: 'white',
};

interface SelectionItem {
  label: string;
  id?: string;
  color?: Partial<ButtonColorProps>;
}

type ItemType = SelectionItem | string;

export interface SelectionPillsProps {
  items: ItemType[];
  selectedItems: string[];
  isMultiSelect?: boolean;
  onSelectionChange: (selectedIds: string[]) => void;
  colors?: Partial<ButtonColorProps>;
}

const SelectionPills: React.FC<SelectionPillsProps> = ({
  items,
  selectedItems,
  isMultiSelect = false,
  onSelectionChange,
  colors: customColors = {},
}) => {
  const globalColors: ButtonColorProps = { ...defaultColors, ...customColors };

  const handleItemClick = (id: string) => {
    let updatedSelection: string[];
    if (isMultiSelect) {
      updatedSelection = selectedItems.includes(id)
        ? selectedItems.filter((item) => item !== id)
        : [...selectedItems, id];
    } else {
      updatedSelection = selectedItems[0] === id ? [] : [id];
    }
    onSelectionChange(updatedSelection);
  };

  const getItemDetails = (
    item: ItemType
  ): { key: string; label: string; color: ButtonColorProps } => {
    if (typeof item === 'string') {
      return { key: item, label: item, color: globalColors };
    } else {
      const itemColor: ButtonColorProps = { ...globalColors, ...item.color };
      return {
        key: item.id || item.label,
        label: item.label,
        color: itemColor,
      };
    }
  };

  return (
    <div className="selection-view">
      <div className="d-flex flex-wrap justify-content-center mb-4">
        {items.map((item) => {
          const { key, label, color } = getItemDetails(item);
          const isSelected = selectedItems.includes(key);
          return (
            <Button
              key={key}
              variant="outline-primary"
              size="sm"
              onClick={() => handleItemClick(key)}
              className={`m-1 rounded-pill ${isSelected ? 'selected' : ''}`}
              style={{
                backgroundColor: isSelected
                  ? color.secondaryColor
                  : color.primaryColor,
                borderColor: isSelected
                  ? color.secondaryColor
                  : color.primaryColor,
                color: color.textColor,
                padding: '5px 10px',
                margin: '5px',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectionPills;
