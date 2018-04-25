import { BaseEntity } from './../../shared';

export class Unit implements BaseEntity {
    constructor(
        public id?: number,
        public unitName?: string,
        public unitCity?: string,
        public unitStreet?: string,
        public unitHouse?: string,
        public unitDescription?: BaseEntity,
        public image?: BaseEntity,
        public researchMethod?: BaseEntity,
        public typesProblems?: BaseEntity,
        public ratingMethod?: BaseEntity,
    ) {
    }
}
