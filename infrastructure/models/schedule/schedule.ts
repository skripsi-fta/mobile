export namespace ScheduleModel {
    export namespace Request {
        export interface List {
            startDate: string;
            endDate?: string;
            pageSize: number;
            pageNumber: number;
        }
    }

    export namespace Response {
        export interface Data {
            id: number;
            date: string;
            capacity: number;
            status: string;
            startTime: string;
            endTime: string;
            type: string;
            totalPasien: number;
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
            data: Data[];
        }
    }
}
