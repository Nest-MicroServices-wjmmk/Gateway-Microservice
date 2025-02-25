import { IsEnum, IsOptional } from "class-validator";
import { OrderStatusList } from "../enum/order.enum";
import { PaginationDto } from "src/common";


export class OrderPaginationDto extends PaginationDto {
    
    @IsOptional()
    @IsEnum(
        OrderStatusList,
        { message: `Status must be one of the following values: ${OrderStatusList.join(', ')}` }
    )
    status?: string;

}