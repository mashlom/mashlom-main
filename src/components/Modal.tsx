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
  // overlayOpacity?: number;
  isDismissedOnOutsideClick?: boolean;
  buttonAlignment?: (typeof ButtonAlignmentOptions)[keyof typeof ButtonAlignmentOptions];
  direction?: (typeof ModalDirectionOptions)[keyof typeof ModalDirectionOptions];
};

const StyledBootstrapModal = styled(BootstrapModal)`
  --bs-modal-width: 600px;
  --bs-btn-bg: var(--buttons-background-color);
`;

const Modal = ({
  isOpen,
  setIsOpen,
  secondaryButton,
  title,
  isHeaderHidden,
  children,
  // overlayOpacity = 0.7,
  isDismissedOnOutsideClick = false,
  buttonAlignment = ButtonAlignmentOptions.CENTER,
  direction = ModalDirectionOptions.LTR,
}: ModalProps) => {
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
        <StyledBootstrapModal.Header closeButton style={{ borderBottom: 'none' }}>
          {title && <StyledBootstrapModal.Title><strong>{title}</strong></StyledBootstrapModal.Title>}
        </StyledBootstrapModal.Header>
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
        {/* <Button
          variant="primary"
          style={{backgroundColor: "#103C6E"}}
          onClick={() => {
            if (primaryButton?.onClick) {
              primaryButton.onClick();
            }
            handleClose();
          }}
          color=''
        >
          {primaryButton?.text || 'OK'}
        </Button> */}
      </StyledBootstrapModal.Footer>
    </StyledBootstrapModal>
  );
};

export default Modal;
