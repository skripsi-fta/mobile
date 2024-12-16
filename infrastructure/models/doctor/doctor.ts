export namespace DoctorModel {
    export namespace Request {
        export interface Recommendation {
            total?: number;
        }

        export interface List {
            name?: string;
            spesialisasiId?: string;
            pageSize: number;
            pageNumber: number;
        }

        export interface Detail {
            doctorId: number;
        }

        export interface Schedule {
            doctorId: number;
            monthNumber: number;
            yearNumber: number;
        }
    }

    export namespace Response {
        export interface Data {
            id: number;
            name: string;
            profile: string;
            rating: number;
            totalRating: number;
            consulePrice: number;
            photoPath: string;
            totalPasien: number;
            namaSpesialisasi: string;
        }

        export interface Recommendation {
            message: string;
            data: Data[];
        }

        export interface List {
            currentPage: number;
            totalPages: number;
            totalRows: number;
            data: Data[];
        }

        export interface Detail {
            doctorData: Data;
            scheduleData: {
                [key: string]: {
                    id: number;
                    day: string;
                    startTime: string;
                    endTime: string;
                    capacity: number;
                }[];
            };
        }

        export interface Schedule {
            [key: string]: {
                data: {
                    id: number;
                    date: string;
                    capacity: number;
                    startTime: string;
                    endTime: string;
                    type: string;
                    totalPasien: number;
                    status: string;
                    namaRuangan: string;
                }[];
                dots: {
                    key: string;
                    color: string;
                    selectedDotColor: string;
                }[];
            };
        }
    }
}
