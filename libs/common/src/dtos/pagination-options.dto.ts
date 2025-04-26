import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FilterQuery } from 'mongoose';
import { AbstractDocument } from '../database';

export class PaginationOptionsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    if (!value) return undefined;
    if (typeof value == 'object') return value;

    // Accept "value:1,name:-1" format
    return Object.fromEntries(
      value.split(',').map((pair) => {
        const [k, v] = pair.split(':');
        return [k, Number(v)];
      }),
    );
  })
  sort?: Record<string, 1 | -1>;

  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    if (!value) return undefined;
    if (typeof value === 'object') return value;

    // Accept "field:value,field2:value2" and "field:operator:value" format
    return Object.fromEntries(
      value.split(',').map((pair) => {
        const parts = pair.split(':');

        if (parts.length === 3) {
          // e.g., value:gt:31 -> { value: { $gt: 31 } }
          const [field, op, val] = parts;

          const mongoOp = `$${op}`;
          let parsedVal: any = val;

          if (val === 'true') parsedVal = true;
          else if (val === 'false') parsedVal = false;
          else {
            const num = Number(val);
            parsedVal = isNaN(num) ? val : num;
          }

          return [field, { [mongoOp]: parsedVal }];
        } else if (parts.length === 2) {
          const [k, v] = parts;

          if (v === 'true') return [k, true];
          if (v === 'false') return [k, false];
          const num = Number(v);

          return [k, isNaN(num) ? v : num];
        }

        // fallback: ignore invalid
        return [parts[0], undefined];
      }),
    );
  })
  filter?: FilterQuery<AbstractDocument>;
}
