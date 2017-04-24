import React from 'react';
import { Modal } from 'semantic-ui-react';

const ResultModal = ({ resultModalOpen, resultModalClose, result }) => {
    return (
        <Modal
            open={resultModalOpen}
            basic
            size='small'
            onClose={resultModalClose}>
            <Modal.Content>
                <h2>{result}</h2>
            </Modal.Content>
        </Modal>
    );
};

export default ResultModal;