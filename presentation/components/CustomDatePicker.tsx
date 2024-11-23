import { useState } from 'react';
import { TouchableOpacity, type StyleProp, type ViewStyle } from 'react-native';
import { CustomText } from './CustomText';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';

interface CustomDatePickerProps {
    date?: Date;
    onChange: (val: string) => void;
    style?: StyleProp<ViewStyle>;
}

const CustomDatePicker = ({
    onChange,
    date = new Date(),
    style
}: CustomDatePickerProps) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <TouchableOpacity
                style={{
                    padding: 8,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'black',
                    height: 45,
                    backgroundColor: 'white',
                    justifyContent: 'center'
                }}
                onPress={() => setOpen(() => true)}
            >
                <CustomText
                    style={{
                        fontSize: 14
                    }}
                >
                    {dayjs(date).format('DD-MM-YYYY')}
                </CustomText>

                <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false);
                        onChange(dayjs(date).format('YYYY-MM-DD'));
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                    mode='date'
                />
            </TouchableOpacity>
        </>
    );
};

export default CustomDatePicker;
