export const getObjects = (state) => state.objects;

export const getAllObjects = (state) => {
    return state.entities.objects.allIds.map(id => state.entities.objects.byId[id]);
}