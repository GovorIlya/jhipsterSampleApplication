import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationUnitModule } from './unit/unit.module';
import { JhipsterSampleApplicationUnitDescriptionModule } from './unit-description/unit-description.module';
import { JhipsterSampleApplicationImageModule } from './image/image.module';
import { JhipsterSampleApplicationResearchMethodModule } from './research-method/research-method.module';
import { JhipsterSampleApplicationTypesProblemsModule } from './types-problems/types-problems.module';
import { JhipsterSampleApplicationRatingMethodModule } from './rating-method/rating-method.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterSampleApplicationUnitModule,
        JhipsterSampleApplicationUnitDescriptionModule,
        JhipsterSampleApplicationImageModule,
        JhipsterSampleApplicationResearchMethodModule,
        JhipsterSampleApplicationTypesProblemsModule,
        JhipsterSampleApplicationRatingMethodModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
