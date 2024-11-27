export namespace DoctorModel {
    export namespace Request {
        export interface Recommendation {
            total?: number;
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
    }
}
