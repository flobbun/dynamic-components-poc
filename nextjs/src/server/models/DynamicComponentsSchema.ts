import { DynamicComponentsData } from 'app/types';
import { Model, model, models, Schema } from 'mongoose';

const DynamicComponentsSchema = new Schema<DynamicComponentsData>({
    components: {
        type: Object,
        required: true,
    }
});
const DynamicComponents = (models.DynamicComponents || model('DynamicComponents', DynamicComponentsSchema)) as Model<typeof DynamicComponentsSchema & {
    components: DynamicComponentsData['components']
}>;
export default DynamicComponents;