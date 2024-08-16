
export interface DataSet {
    label?: string;
    data: any[];
    backgroundColor?: string[];
    hoverBackgroundColor?: string[];
}

export interface ChartDto {
    labels: string[];
    datasets: DataSet[];
}