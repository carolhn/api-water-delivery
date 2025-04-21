import { Query } from 'mongoose';
import { IPaginationResult } from '../types/product';

export const paginate = async (
  query: Query<any[], any>,
  page: number,
  limit: number,
): Promise<IPaginationResult> => {
  const startIndex = (page - 1) * limit;
  const total = await query.model.countDocuments(query.getFilter());

  const pagination: any = {};
  if (startIndex + limit < total) {
    pagination.next = { page: page + 1, limit };
  }
  if (startIndex > 0) {
    pagination.prev = { page: page - 1, limit };
  }

  const paginatedQuery = query.skip(startIndex).limit(limit);

  return { pagination, query: paginatedQuery };
};
