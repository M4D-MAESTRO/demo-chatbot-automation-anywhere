declare namespace echarts {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface EChartsOption {
      exportXLSX?: ()=>void;
      exportCSV?: ()=>void;
      exportPDF?: ()=>void;

    }
  }