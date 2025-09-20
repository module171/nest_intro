import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from './dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { extend } from 'joi';
import { Request } from 'express';
import {REQUEST} from '@nestjs/core';
import { Paginated } from './interfaces/paginated.interface';
@Injectable()
export class PaginationProvider {
    constructor(
        @Inject(REQUEST)
        private readonly request: Request,
    ){}
    public async pagenateQuery<T extends ObjectLiteral>(query: PaginationQueryDto,repository: Repository<T>) : Promise<Paginated<T>> {
        const { page = 1, limit = 10 } = query;
        let results =   await repository.find({
            skip: (page - 1) * limit,
            take: limit,
          
        });
        const baseUrl = this.request.protocol + '://' + this.request.headers.host + '/';
        const newUrl = new URL(this.request.url,baseUrl);
     
        const totalItems = await repository.count();
        const totalPages = Math.ceil(totalItems / limit);
        const nextPage = page === totalPages ? page : page + 1;
        const previousPage = page === 1 ? page : page - 1;
        const meta = {
            limit,
           total: totalItems,
            page,
            totalPages,
         
        } 

        const links = {
            first: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=1`,
            last: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${totalPages}`,
            current: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${page}`,
            next: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${nextPage}`,
            previous: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${previousPage}`,
        }
        const finalResponse : Paginated<T> = {
            data: results,
            meta,
            links,
        }
       
        return finalResponse;
    }
}
