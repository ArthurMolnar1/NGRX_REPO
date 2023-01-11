import { EntityDataModuleConfig, EntityMetadataMap } from "@ngrx/data";

const entityMetadata: EntityMetadataMap = {
    Post: {
        entityDispatcherOptions: {
            optimisticUpdate: true,
            optimisticDelete: true
        }
    }
};

export const entityConfig: EntityDataModuleConfig = {
    entityMetadata
}
