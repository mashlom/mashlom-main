import React from 'react';
import { Button } from 'react-bootstrap';
import BootstrapModal from 'react-bootstrap/Modal';
import styled from 'styled-components';

export const ButtonAlignmentOptions = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
} as const;

export const ModalDirectionOptions = {
  LTR: 'ltr',
  RTL: 'rtl',
} as const;

type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

type ModalProps = {
  isOpen: boolean;
  isHeaderHidden?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  primaryButton?: ButtonProps;
  children: React.ReactNode;
  secondaryButton?: ButtonProps;
  title?: string;
  isDismissedOnOutsideClick?: boolean;
  buttonAlignment?: (typeof ButtonAlignmentOptions)[keyof typeof ButtonAlignmentOptions];
  direction?: (typeof ModalDirectionOptions)[keyof typeof ModalDirectionOptions];
};

const StyledBootstrapModal = styled(BootstrapModal)`
  --bs-modal-width: 600px;
  --bs-btn-bg: var(--buttons-background-color);
`;

const StyledModalHeader = styled(BootstrapModal.Header)`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  border-bottom: none;
`;

const StyledModalTitle = styled(BootstrapModal.Title)`
  flex-grow: 1;
  text-align: right;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  color: #000;
  opacity: 0.5;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  primaryButton,
  secondaryButton,
  title,
  isHeaderHidden,
  children,
  isDismissedOnOutsideClick = false,
  buttonAlignment = ButtonAlignmentOptions.CENTER,
  direction = ModalDirectionOptions.RTL,
}) => {
  const handleClose = () => setIsOpen(false);

  return (
    <StyledBootstrapModal
      show={isOpen}
      onHide={handleClose}
      backdrop={isDismissedOnOutsideClick ? true : 'static'}
      style={{ direction }}
      centered
    >
      {!isHeaderHidden && (
        <StyledModalHeader>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
          {title && <StyledModalTitle><strong>{title}</strong></StyledModalTitle>}
        </StyledModalHeader>
      )}
      <StyledBootstrapModal.Body>{children}</StyledBootstrapModal.Body>
      <StyledBootstrapModal.Footer
        style={{ borderTop: 'none', justifyContent: buttonAlignment }}
      >
        {secondaryButton && (
          <Button
            variant="secondary"
            onClick={() => {
              if (secondaryButton.onClick) {
                secondaryButton.onClick();
              }
              handleClose();
            }}
          >
            {secondaryButton.text}
          </Button>
        )}
        {primaryButton && (
          <Button
            variant="primary"
            style={{backgroundColor: "#103C6E"}}
            onClick={() => {
              if (primaryButton.onClick) {
                primaryButton.onClick();
              }
              handleClose();
            }}
          >
            {primaryButton.text}
          </Button>
        )}
      </StyledBootstrapModal.Footer>
    </StyledBootstrapModal>
  );
};

export default Modal;