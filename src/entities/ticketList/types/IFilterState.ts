export interface IFilterState {
    startDate: string | null;
    transplants: number[];
    currency: string;
    currencyRates: {
        [key: string]: number;
    };
}
