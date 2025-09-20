export interface Paginated<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    links: {
        first: string;
        last: string;
        current: string;
        next: string;
        previous: string;
    };
}