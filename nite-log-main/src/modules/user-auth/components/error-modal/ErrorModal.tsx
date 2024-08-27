import React from "react";
import ModalBox from "../../../core/components/modal/ModalBox";
import FilledButton from "../../../core/components/filled-btn/FilledButton";

import "./ErrorModal.css";

type ErrorModalProps = {
    setIsModalOpen: (isOpen: boolean) => void;
    error: string | undefined | null;
}

const ErrorModal = ({setIsModalOpen, error}: ErrorModalProps) => {
    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLDivElement && e.target.classList.contains('modal-box')) {
            setIsModalOpen(false);
        }
    }

    const onClose = () => {
        setIsModalOpen(false);
    }

    return (
        <ModalBox onClick={closeModal} className="error-modal">
            <div className="modal">
                <span className="modal-title">Erro</span>
                <p>{error}</p>
                <div className="btn-area-error">
                    <FilledButton
                        title="Fechar"
                        className="btn"
                        onClick={onClose}
                    />
                </div>
            </div>
        </ModalBox>
    );
};

export default ErrorModal;