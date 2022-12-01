export interface MOEXResponse {
    marketdata: Marketdata;
}

interface Marketdata {
    metadata: Metadata;
    columns: string[];
    data: Array<Array<number | null | string>>;
}

interface Metadata {
    SECID: Secid;
    LAST: Issuecapitalization;
    ISSUECAPITALIZATION: Issuecapitalization;
}

interface Issuecapitalization {
    type: string;
}

interface Secid {
    type: string;
    bytes: number;
    max_size: number;
}
