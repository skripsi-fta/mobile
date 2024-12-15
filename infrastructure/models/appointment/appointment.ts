export namespace AppointmentModel {
    export namespace Request {
        export interface Create {
            scheduleId: number;
        }

        export interface List {
            pageSize: number;
            pageNumber: number;
            type: string;
        }

        export interface Detail {
            appointmentId: number;
        }

        export interface Queue {
            appointmentId: number;
        }

        export interface Rating {
            appointmentId: number;
            rating: number;
        }
    }

    export namespace Response {
        export interface Rating {
            message: string;
        }

        export interface DetailData {
            id: number;
            scheduleId: number;
            date: string;
            capacity: number;
            status: string;
            startTime: string;
            endTime: string;
            type: string;
            doctorId: number;
            doctorName: string;
            rating: number;
            totalRating: number;
            consulePrice: number;
            photoPathDoctor: string;
            spesialisasiName: string;
        }

        export interface List {
            currentPage: number;
            totalPages: number;
            totalRows: number;
            data: DetailData[];
        }

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

        export interface QueueData {
            queueNumber: number;
            patientName: string;
        }

        export interface Detail {
            appointmentId: number;
            scheduleId: number;
            bookingCode: string;
            status: string;
            checkedIn: boolean;
            checkInTime: string;
            finishTime: string;
            consultationFee: number;
            pharmacyFee: number;
            notesDoctor: string;
            rating: number;
            doctorName: string;
            spesialisasiName: string;
            scheduleDate: string;
            startTime: string;
            endTime: string;
            roomName: string;
            diagnosisDoctor: string;
            prescription: string[];
            notesMedicalRecord: string;
            globalQueueNumber: number;
            cashierQueueNumber: number;
            pharmacyQueueNumber: number;
            doctorQueueNumber: number;
            scheduleMoveId: number;
        }

        export interface Queue {
            globalQueue: QueueData;
            doctorQueue: QueueData;
            pharmacyQueue: QueueData;
            cashierQueue: QueueData;
            detailAppointment: Detail;
        }
    }
}
