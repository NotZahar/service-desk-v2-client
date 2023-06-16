export interface IRequestStats {
    all: number;
    success: { all: number; percentage: number };
    failed: { all: number; percentage: number };
    atWork: { all: number; percentage: number };
    averageTime: string;
    successPercentage: number[];
    failedPercentage: number[];
    atWorkPercentage: number[];
    days: Date[];
};