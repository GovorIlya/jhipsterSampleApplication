import { BaseEntity } from './../../shared';

export class RatingMethod implements BaseEntity {
    constructor(
        public id?: number,
        public ratingMethod?: any,
        public unit?: BaseEntity,
    ) {
    }
}
