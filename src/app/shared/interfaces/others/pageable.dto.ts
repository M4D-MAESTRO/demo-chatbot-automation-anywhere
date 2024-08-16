import { PageOrder } from "../../constants/page.constant";

export interface PageableDto<T> {
  data: T[];
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }
}

export class PageOptionsDto {
  order: PageOrder = PageOrder.ASC;
  page: number = 1;
  take: number = 10;
}