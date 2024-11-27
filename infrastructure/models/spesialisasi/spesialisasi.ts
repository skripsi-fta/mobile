export namespace SpesialisasiModel {
    export namespace Request {
        export interface Recommendation {
            total?: number;
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
    }
}
