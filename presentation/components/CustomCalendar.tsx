import {
    Calendar,
    LocaleConfig,
    type CalendarProps
} from 'react-native-calendars';

type CustomCalendarProps = CalendarProps & {};

LocaleConfig.locales['id'] = {
    monthNames: [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
    ],
    monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Mei',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Okt',
        'Nov',
        'Des'
    ],
    dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    dayNamesShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
    today: 'Hari Ini'
};
LocaleConfig.defaultLocale = 'id';

const CustomCalendar = ({ theme, ...props }: CustomCalendarProps) => {
    return (
        <>
            <Calendar
                theme={{
                    textMonthFontFamily: 'Poppins-SemiBold',
                    todayTextColor: 'black',
                    dayTextColor: 'black',
                    arrowColor: 'black',
                    ...theme
                }}
                {...props}
            />
        </>
    );
};

export default CustomCalendar;
