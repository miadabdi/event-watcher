import { FilterQuery, Model } from 'mongoose';
import { AbstractDocument } from '..';

export interface PaginationOptions<T> {
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
  filter?: FilterQuery<T>;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class Pagination {
  static async paginate<T extends AbstractDocument>(
    model: Model<T>,
    options: PaginationOptions<T> = {},
  ): Promise<PaginationResult<T>> {
    const page = Math.max(1, options.page || 1);
    const limit = Math.max(1, options.limit || 10);
    const filter = options.filter || {};
    const sort = options.sort || {};

    const [data, total] = await Promise.all([
      model
        .find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean<T>(true)
        .exec(),
      model.countDocuments(filter).exec(),
    ]);

    return {
      data: data as any,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
