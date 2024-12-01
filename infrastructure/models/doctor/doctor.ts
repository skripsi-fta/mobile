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
    }
}
