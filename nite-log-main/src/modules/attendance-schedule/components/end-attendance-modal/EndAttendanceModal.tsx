import React, {useState} from "react";

import {useAttendance} from "../../../user-auth/hooks/attendance/useAttendance";
import {UserContextType} from "../../../core/types/User";
import {UserContext} from "../../../core/context/userContext";

import "./EndAttendanceModal.css";

import ModalBox from "../../../core/components/modal/ModalBox";
import FilledButton from "../../../core/components/filled-btn/FilledButton";
import {useAuth} from "../../../user-auth/hooks/auth/useAuth";
import { useLocation } from "wouter";

type EndAttendanceModalProps = {
    setIsModalOpen: (isOpen: boolean) => void;
}

const EndAttendanceModal = ({setIsModalOpen}: EndAttendanceModalProps) => {
    const {globalUser} = React.useContext(UserContext) as UserContextType;
    const {
        logUserOut
    } = useAuth();
    const {
        removeUserFromAttendanceList
    } = useAttendance();

    const [location, navigate] = useLocation();
    const [workDone, setWorkDone] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWorkDone(e.target.value);
    }

    const handleEndAttendance = async () => {
        if (globalUser === null) return;
        let work = workDone === "" ? "Nenhuma atividade" : workDone;
        removeUserFromAttendanceList(globalUser.userId, work)
            .then(async () => {
                await logUserOut();
                navigate("/");
            })
    }

    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLDivElement && e.target.classList.contains('modal-box')) {
            setIsModalOpen(false);
        }
    }

    return (
        <ModalBox onClick={closeModal}>
            <div className="input-modal">
                <span className="modal-title">Assinar saída</span>
                <p>Antes de ir, conta pra gente em quais atividades você trabalhou hoje.</p>
                <textarea
                    placeholder="Atividades realizadas"
                    onChange={onChange}
                />
                <div className="btn-area">
                    <FilledButton
                        title="Cancelar"
                        className="cancel-btn"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <FilledButton
                        title="Assinar saída"
                        className="confirm-btn"
                        onClick={handleEndAttendance}
                    />
                </div>
            </div>
        </ModalBox>
    );
};

export default EndAttendanceModal;