import React from 'react';

interface ModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ id, title, children }) => {
  return (
    <div className="modal fade" id={id} tabIndex={-1} aria-labelledby={`${id}Label`} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <h5 className="modal-title" id={`${id}Label`}>{title}</h5>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};