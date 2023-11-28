# 若依前后端分离版本

## 致谢

非常感谢[BuildAdmin](https://doc.buildadmin.com/)提供的ui界面

## 前端运行

```bash
# 克隆项目
git clone https://gitee.com/codelm/ruoyi-vue3-lmw.git

# 进入项目目录
cd ruoyi-vue3-lmw

# 安装依赖
pnpm install

# 启动服务
pnpm dev

```

## 常见问题

#### 1. 为什么页面进入之后会刷新两次？

答：因为element-plus采用的不是全局引入，而是自动按需引入，所有检测到页面有加载element-plus组件时vite会热更新进行从而进行页面刷新，请放心，项目打包部署后是不会出现这种问题的。

## 演示图

<table>
    <tr>
      <td>
        <img src="https://picdl.sunbangyan.cn/2023/11/20/1daade7fca59e2a93e834396ed86f788.webp" />
        <img src="https://picss.sunbangyan.cn/2023/11/27/f380c21d100a373d61f23c60a9a951c8.jpeg" />
      </td>
    </tr>
    <tr>
        <td>
          <img src="https://picst.sunbangyan.cn/2023/11/27/cddf36cea8f84b075e8c0807791b130e.jpeg" />
          <img src="https://picst.sunbangyan.cn/2023/11/27/8252a88157b6c06e208019cb67b91a31.jpeg" />
        </td>
    </tr>
    <tr>
      <td>
        <img src="https://picst.sunbangyan.cn/2023/11/27/c72e73e32c82b171f7cd8f1a2564179a.jpeg"/>
        <img src="https://picdm.sunbangyan.cn/2023/11/27/10f6c8b3848c4dd9a39b2c5d8844f2d5.jpeg"/>
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://picst.sunbangyan.cn/2023/11/27/3b862fbaeea8c49c9cdd8d20fa71835b.jpeg"/>
        <img src="https://picdl.sunbangyan.cn/2023/11/27/511bd4506a95ffc93f4d866889cb8993.jpeg"/>
      </td>
    </tr>
</table>

## 联系本人

本人微信：lmwcoder
