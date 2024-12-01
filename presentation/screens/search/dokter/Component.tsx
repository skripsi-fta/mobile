import type { DoctorModel } from '@/infrastructure/models/doctor/doctor';
import { CustomText } from '@/presentation/components/CustomText';
import { useLocalSearchParams } from 'expo-router';

const DokterPageComponent = () => {
    const { data } = useLocalSearchParams() as unknown as {
        data: string;
    };

    const doctorData = data
        ? (JSON.parse(data) as DoctorModel.Response.Data)
        : {};

    console.log(doctorData);

    return (
        <>
            <CustomText>tes</CustomText>
        </>
    );
};

export default DokterPageComponent;
