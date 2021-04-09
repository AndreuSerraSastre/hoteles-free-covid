import React from 'react';
import './../css/loading.scss';
import Modal from 'antd/lib/modal/Modal';
import { WaveLoading } from 'react-loadingg';

const Loading = ({ loading }) => {

    return (
        <Modal
            className="modal-loading-main"
            centered
            visible={loading}
            footer={null}
        >
            <WaveLoading className="icono-loading" size={'large'} />
        </Modal>
    );
};

export default Loading;