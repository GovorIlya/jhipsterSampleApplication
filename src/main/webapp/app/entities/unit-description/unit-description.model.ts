import { BaseEntity } from './../../shared';

export class UnitDescription implements BaseEntity {
    constructor(
        public id?: number,
        public description?: any,
        public unit?: BaseEntity,
    ) {
    }
}
