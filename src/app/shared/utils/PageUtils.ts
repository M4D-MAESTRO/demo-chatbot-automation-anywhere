import { HttpParams } from "@angular/common/http";
import { PageOptionsDto } from "../interfaces/others/pageable.dto";

export class PageUtils {
    static getPageOptionsParams({order, page, take}: PageOptionsDto) {
        const params = new HttpParams()
            .set('order', order)
            .set('page', page)
            .set('take', take);
            
            return params;
    }
}