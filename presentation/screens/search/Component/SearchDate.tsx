import { colors } from '@/constants/Colors';
import CustomCalendar from '@/presentation/components/CustomCalendar';
import dayjsUtils from '@/utils/dayjs';
import {
    useCallback,
    type Dispatch,
    type SetStateAction,
    useState
} from 'react';
import { View } from 'react-native';
import { type DateData } from 'react-native-calendars';

interface SearchDateProps {
    dateParam: {
        startDate: string;
        endDate?: string;
    };
    setDateParam: Dispatch<
        SetStateAction<{
            startDate: string;
            endDate?: string;
        }>
    >;
}

const SearchDate = ({ dateParam, setDateParam }: SearchDateProps) => {
    const [selectedDate, setSelectedDate] = useState<string>(
        dateParam.startDate
    );

    const onDayPress = useCallback((day: DateData) => {
        setDateParam((state) => ({ ...state, startDate: day.dateString }));
        setSelectedDate(() => day.dateString);
    }, []);

    return (
        <>
            <View
                style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 12,
                    paddingVertical: 24,
                    display: 'flex',
                    gap: 28
                }}
            >
                <CustomCalendar
                    enableSwipeMonths
                    current={selectedDate}
                    minDate={dayjsUtils().format('YYYY-MM-DD')}
                    onDayPress={onDayPress}
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            selectedColor: '#0C41FF',
                            selectedTextColor: 'white'
                        }
                    }}
                />
            </View>
        </>
    );
};

export default SearchDate;
