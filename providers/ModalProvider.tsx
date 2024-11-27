import { CustomText } from '@/presentation/components/CustomText';
import {
    createContext,
    useState,
    type FC,
    type ReactNode,
    useContext
} from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

interface ModalParamsType {
    disableClickOutside?: boolean;
}

interface ModalContextType {
    openModal: (_content: ReactNode, _params: ModalParamsType) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [content, setContent] = useState<ReactNode | null>(null);

    const [loaded, setLoaded] = useState<boolean>(false);

    const [dialogParams, setDialogParams] = useState<
        ModalParamsType | undefined
    >();

    const openModal = (dialogContent: ReactNode, params: ModalParamsType) => {
        setContent(() => dialogContent);
        setIsOpen(() => true);
        setDialogParams(() => params);
        setLoaded(() => true);
    };

    const closeModal = () => {
        setIsOpen(() => false);
        setContent(() => null);
        setLoaded(() => false);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {isOpen && content && loaded && (
                <View>
                    <Modal
                        isVisible={isOpen}
                        onBackdropPress={() => {
                            if (dialogParams?.disableClickOutside) {
                                closeModal();
                            }
                        }}
                        propagateSwipe
                    >
                        {content}
                    </Modal>
                </View>
            )}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);

    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }

    return context;
};
