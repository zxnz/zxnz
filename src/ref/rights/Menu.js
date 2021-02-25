module.exports = zxnz.ModelRef('zxnz_menu_', {
    properties: {
        Scope: {
            value: null,
            type: ['bit', 4],
            default: 0  // 0: publish 公共, 1: private 私有
        },
        Disabled: {
            value: null,
            type: ['bit', 4],
            default: 0
        },
        Icon: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Img: {
            value: null,
            type: ['varchar', 200],
            default: ''
        },
        Url: {
            value: null,
            type: ['varchar', 200],
            default: ''
        },
        Path: {
            value: null,
            type: ['varchar', 200],
            default: '',
        }
    }
});