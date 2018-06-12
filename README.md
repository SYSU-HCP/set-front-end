# set-front-end
深度学习实训展示平台前端

# 开发指南
`npm install` 不多说了吧

- `npm start` 尻发模式
- `npm run build` 打包编译
- `npm run test` 单元测试，根本不可能通过的
- `npm run eject` 切勿作死

### 如何添加一个页面

假设有一个大佬 TA 名叫 `van`，他想展示他小组的作品—— `Do you like van 游戏？`

##### 第一步：添加组件
在 `src/pages` 下添加文件夹 `DoYouLinkVanYouXi`
在新建的文件夹下新增文件 `index.tsx`
编辑 `index.tsx`

给一个 `example`:

```typescript
import * as React from 'react';

const initialState = {};
type IState = Readonly<typeof initialState>

export default class DoYouLikeVanYouXi extends React.Component<{}, IState> {
  public readonly state = initialState;
  public render() {
    return <div />
  }
}
```

##### 第二步：添加路由
在 `src/routes.ts` 里面的 routes 数组中添加一项
```json
{
  component: , // 你肛肛创建的组件
  meta: {
    TA: 'van', // TA名字
    members: ['比利', '木吉'], // 成员们的名字
    name: 'Do you like van 游戏', // 页面的标题
    title: 'Oh Yes Sir' // 导航栏的label
  },
  path: '/do-you-like-van-youxi', // 路由路径
}
```

现在你可以尝试使用 `npm start` 查看效果

##### 第四步：和 react van 游戏(编写你创建的页面组件)
你需要和 react 进行摔跤，你可能会用到：`antd`.
页面单独用到的组件放在 `src/pages/DoYouLikeVanYouXi/components` 下
各页面公用的组件放在 `src/components` 下
