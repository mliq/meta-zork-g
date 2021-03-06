import React, { useState, useEffect } from 'react';
import HList from '../common/HList';
import Textarea from '../common/Textarea';
import Modal from '../common/Modal';
import VList from '../common/VList';
import Button from '../common/Button';

type Props = {
    isOpen: boolean,
    onClose: () => void,
    onWrite: (contents: string) => void,
};

const WriteNoteModal: React.FunctionComponent<Props> = (props) => {
    const { isOpen, onClose, onWrite } = props;
    const [contents, setContents] = useState('');

    useEffect(
        () => setContents(''),
        [isOpen],
    );

    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onClose();
        onWrite(contents);
    };

    const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContents(e.target.value);
    };

    return (
        <Modal title="Write a Lovely Note" isOpen={isOpen} onClose={onClose}>
            <VList>
                <label>
                    <div>Please enter the text for your lovely note.</div>
                </label>
                <Textarea cols={50} rows={5} value={contents} onChange={onTextChange} />
                <HList>
                    <Button type="button" theme="link" onClick={onClose}>Cancel</Button>
                    <Button type="button" onClick={onClick}>Write it!</Button>
                </HList>
            </VList>
        </Modal>
    );
};

export default WriteNoteModal;
