import { colors } from '@/constants/colors';
import { CustomText } from '@/presentation/components/CustomText';
import dayjsUtils from '@/utils/dayjs';
import { locale } from 'dayjs';
import {
    useCallback,
    type Dispatch,
    type SetStateAction,
    useState
} from 'react';
import { View } from 'react-native';
import { Calendar, type DateData } from 'react-native-calendars';
import id from 'dayjs/locale/id';

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
                <Calendar
                    enableSwipeMonths
                    current={selectedDate}
                    minDate={dayjsUtils().format('YYYY-MM-DD')}
                    onDayPress={onDayPress}
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            selectedColor: colors.primaryBlue,
                            selectedTextColor: 'white'
                        }
                    }}
                    key={locale(id)}
                    theme={{
                        textMonthFontFamily: 'Poppins-SemiBold',
                        todayTextColor: 'black',
                        dayTextColor: 'black'
                    }}
                />
            </View>
        </>
    );
};

export default SearchDate;
