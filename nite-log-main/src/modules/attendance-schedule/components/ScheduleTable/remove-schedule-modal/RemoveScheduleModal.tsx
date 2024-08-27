import React from "react";
import ModalBox from "../../../../core/components/modal/ModalBox";
import FilledButton from "../../../../core/components/filled-btn/FilledButton";

import "../../end-attendance-modal/EndAttendanceModal.css";

type RemoveScheduleModalProps = {
    setIsModalOpen: (isOpen: boolean) => void;
    dayOfWeek: number | undefined;
    removeSchedule: (dayOfWeek: number) => void;
}

const RemoveScheduleModal = ({setIsModalOpen, dayOfWeek, removeSchedule}: RemoveScheduleModalProps) => {
    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLDivElement && e.target.classList.contains('modal-box')) {
            setIsModalOpen(false);
        }
    }

    const onRemove = () => {
        if (dayOfWeek !== undefined) {
            removeSchedule(dayOfWeek);
            setIsModalOpen(false);
        }
    }

    return (
        <ModalBox onClick={closeModal}>
            <div className="input-modal">
                <span className="modal-title">Remover horário</span>
                <p>Tem certeza que deseja remover o horário?</p>
                <div className="btn-area-error">
                    <FilledButton
                        title="Cancelar"
                        className="cancel-btn"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <FilledButton
                        title="Remover"
                        className="confirm-btn"
                        onClick={onRemove}
                    />
                </div>
            </div>
        </ModalBox>
    );
};

export default RemoveScheduleModal;