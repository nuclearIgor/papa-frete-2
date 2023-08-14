'use client';

import { Button, Modal } from 'flowbite-react';

export default function ConfirmarCandidaturaModal ({buttonText, isOpen, setOpen, onAccept, onDecline}) {

    return (
        <>
            <button
                onClick={() => setOpen('pop-up')}
                className={'btn btn-primary'}
            >
                {buttonText}
            </button>
            <Modal
                dismissible
                show={isOpen}
                onClose={() => setOpen(undefined)}
            >
                <Modal.Header>Candidatar ao frete</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Por sua conta e risco
                        </p>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className={'btn btn-primary'}
                        // onClick={() => props.setOpenModal(undefined)}
                        onClick={onAccept}
                    >Continuar</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


