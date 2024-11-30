export namespace SpesialisasiModel {
    export namespace Request {
        export interface Recommendation {
            total?: number;
        }

        export interface List {
            name?: string;
            pageSize: number;
            pageNumber: number;
        }
    }

    export namespace Response {
        export interface Data {
            id: number;
            name: string;
            photoPath: string;
            description: string;
            isActive: boolean;
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
