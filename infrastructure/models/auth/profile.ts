export namespace Profile {
    export interface PatientData {
        id: number;
        name: string;
        address: string;
        dateOfBirth: string;
        gender: string;
        idType: string;
        idNumber: string;
    }

    export interface UserData {
        id: number;
        name: string;
        email: string;
        phoneNumber: string;
        username: string;
        patientData: PatientData;
    }

    export interface Response {
        user: UserData;
        token: string;
        refreshToken: string;
    }
}
