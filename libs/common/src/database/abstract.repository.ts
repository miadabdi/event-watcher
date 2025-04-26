import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Pagination, PaginationOptions, PaginationResult } from './pagination';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = await this.model.create(document);

    return createdDocument.toJSON() as TDocument;
  }

  async createMany(
    documents: Array<Omit<TDocument, '_id'>>,
  ): Promise<TDocument[]> {
    const createdDocuments = await this.model.create(documents);

    return createdDocuments.map((doc) => {
      return doc.toJSON() as TDocument;
    });
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne<TDocument>(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateQuery: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, updateQuery, { new: true })
      .lean<TDocument>(true);

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    const documents = await this.model
      .find(filterQuery)
      .lean<TDocument[]>(true);

    return documents;
  }

  async findPaginate(
    options: PaginationOptions<TDocument>,
  ): Promise<PaginationResult<TDocument>> {
    const documents = await Pagination.paginate<TDocument>(this.model, options);

    return documents;
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    return this.model.find(filterQuery).lean<TDocument>(true);
  }
}
