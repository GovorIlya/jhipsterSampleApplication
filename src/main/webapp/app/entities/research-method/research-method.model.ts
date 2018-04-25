import { BaseEntity } from './../../shared';

export class ResearchMethod implements BaseEntity {
    constructor(
        public id?: number,
        public researchMethod?: any,
        public unit?: BaseEntity,
    ) {
    }
}
