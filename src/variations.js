const variations = [
    {
        name: 'default',
        title: 'Default',
        innerBlocks: [["core/paragraph"]],
        templateLock: 'all',
        attributes: {
            align: 'left',
            class: 'default',
        }
    },
    {
        name: 'simple',
        title: 'Simple',
        innerBlocks: [["core/paragraph"], ["core/paragraph"]],
        templateLock: 'all',
        attributes: {
            align: 'top',
            class: 'simple',
        }
    },
];

export default variations;