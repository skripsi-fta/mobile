export namespace AppointmentModel {
    export namespace Request {
        export interface Create {
            scheduleId: number;
        }
    }

    export namespace Response {
        export interface Data {
            id: number;
            appointmentStatus: string;
            bookingCode: string;
            bookingQr: string;
            checkInStatus: boolean;
            patientId: number;
            patientName: string;
            doctorName: string;
            roomName: string;
            medicalRecord: {
                id: number;
                height: number;
                weight: number;
                systolic: number;
                diastolic: number;
                temperature: number;
                illness: string;
            };
            scheduleDate: string;
            scheduleId: number;
            date: string;
            globalQueue: number;
            checkInTime: string;
            finishTime: string;
        }

        export interface Create {
            message: string;
            data: Data;
        }
    }
}
