// CustomModal.js
import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";

const CustomModal = ({ isOpen, onClose, backdrop, isLast , placement, radiud }) => {
    return (
        <Modal className="mx-5" backdrop={backdrop} isOpen={isOpen} onClose={onClose} placement={placement}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                        <ModalBody>
                            <p>
                                {isLast
                                    ? "Choose an option to submit your response."
                                    : "Choose an option to answer the next question."}
                            </p>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CustomModal;
