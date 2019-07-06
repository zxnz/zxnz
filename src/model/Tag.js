module.exports = zn.Model({
    properties: {
        zn_tags: {
            value: null,
            type: ['varchar', 500],
            ignore: true,
            default: ','
        },
        zn_tags_ids: {
            value: null,
            type: ['varchar', 250],
            ignore: true,
            default: ','
        }
    }
});