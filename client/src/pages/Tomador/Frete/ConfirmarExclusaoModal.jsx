'use client';

import { Button, Modal } from 'flowbite-react';

export default function ConfirmarExclusaoModal({buttonText, isOpen, setOpen, onAccept, onDecline}) {

    return (
        <>
            <button
                className={'btn bg-red-600 text-white'}
                onClick={() => setOpen('pop-up')}
            >
                {/*Toggle modal*/}
                {buttonText}
            </button>
            <Modal
                dismissible
                show={isOpen}
                onClose={() => setOpen(undefined)}
            >
                <Modal.Header>Confirmar exclusao</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                           Tem certeza que deseja excluir este frete?
                        </p>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        // onClick={() => props.setOpenModal(undefined)}
                        onClick={onAccept}
                    >I accept</button>
                    <button
                        color="gray"
                        onClick={onDecline}
                        // onClick={() => props.setOpenModal(undefined)}
                    >
                        Decline
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


