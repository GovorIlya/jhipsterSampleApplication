import { BaseEntity } from './../../shared';

export class TypesProblems implements BaseEntity {
    constructor(
        public id?: number,
        public typesMethod?: any,
        public unit?: BaseEntity,
    ) {
    }
}
