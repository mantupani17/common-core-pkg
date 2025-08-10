export class ResponseDto {
    success: boolean;
    message: string;
    trackerId?: string;
    chunksAdded?: number;
    skipped?: boolean;
    documentsDeleted?: number;
    data?: any;
    totalRecords?: number;
}