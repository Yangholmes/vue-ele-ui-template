/**
 * @file 接口模拟
 * @author Yangholmes 2021-03-31
 */

import Mock from 'mockjs';

Mock.mock(/\/userapi\/api\/getUserInfo/, {
    code: 0,
    data: {
        token: 123456,
        access: [
            {
                name: 'home',
                path: '/',
                component: 'Home'
            },
            {
                name: 'home',
                path: '/home',
                component: 'Home',
                children: [{
                    name: 'page1',
                    path: '/home/page1',
                    component: 'Page1',
                }]
            }
        ]
    },
    msg: 'success'
});

// Mock 模拟延时
Mock.setup({
    timeout: Math.random() * 5e3
});

export default Mock;