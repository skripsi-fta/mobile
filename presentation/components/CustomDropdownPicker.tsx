import { useEffect, useState } from 'react';
import type { FieldError } from 'react-hook-form';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import DropDownPicker, {
    type ListModeType
} from 'react-native-dropdown-picker';
import { CustomText } from './CustomText';

interface CustomDropdownPickerProps {
    items: {
        label: string;
        value: string;
    }[];
    value: string;
    placeHolder: string;
    callbackOnChange: (val: string) => void;
    loading?: boolean;
    listMode?: ListModeType;
    zIndex?: number;
    zIndexReverse?: number;
    style?: StyleProp<ViewStyle>;
    error?: FieldError | undefined;
}

const CustomDropdownPicker = ({
    items,
    value,
    callbackOnChange,
    placeHolder,
    loading,
    listMode = 'SCROLLVIEW',
    zIndex,
    zIndexReverse,
    style,
    error
}: CustomDropdownPickerProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const [valueState, setValueState] = useState(value);

    const [itemsState, setItemsState] = useState(items);

    useEffect(() => {
        if (valueState !== value) {
            callbackOnChange(valueState);
        }
    }, [valueState, value]);

    return (
        <>
            <View>
                <DropDownPicker
                    open={open}
                    value={valueState}
                    items={itemsState}
                    setOpen={setOpen}
                    setValue={setValueState}
                    setItems={setItemsState}
                    placeholder={placeHolder}
                    loading={loading}
                    listMode={listMode}
                    zIndex={zIndex}
                    zIndexInverse={zIndexReverse}
                    style={style}
                    disabled={loading}
                />
                {!!error?.message && (
                    <CustomText
                        style={{
                            color: '#ef4444',
                            marginTop: 4,
                            marginLeft: 4
                        }}
                        type='verysmall'
                    >
                        {error.message}
                    </CustomText>
                )}
            </View>
        </>
    );
};

export default CustomDropdownPicker;
