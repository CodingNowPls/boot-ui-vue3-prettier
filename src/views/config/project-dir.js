export const projectDir = `
├── App.vue
├── api
│   ├── business
│   │   ├── config
│   │   │   └── index.js
│   │   ├── interceptors
│   │   │   └── index.js
│   │   ├── main
│   │   │   └── index.js
│   │   └── upload
│   │       └── index.js
│   ├── config
│   │   └── base.js
│   ├── login.js
│   ├── menu.js
│   ├── monitor
│   │   ├── cache.js
│   │   ├── job.js
│   │   ├── jobLog.js
│   │   ├── logininfor.js
│   │   ├── online.js
│   │   ├── operlog.js
│   │   └── server.js
│   ├── system
│   │   ├── config.js
│   │   ├── dept.js
│   │   ├── dict
│   │   │   ├── data.js
│   │   │   └── type.js
│   │   ├── menu.js
│   │   ├── notice.js
│   │   ├── post.js
│   │   ├── role.js
│   │   └── user.js
│   └── tool
│       └── gen.js
├── assets
│   ├── 401_images
│   │   └── 401.gif
│   ├── 404_images
│   │   ├── 404.png
│   │   └── 404_cloud.png
│   ├── css
│   │   ├── app.scss
│   │   ├── dark.scss
│   │   ├── element.scss
│   │   ├── index.scss
│   │   ├── loading.scss
│   │   ├── mixins.scss
│   │   └── var.scss
│   ├── icons
│   │   └── svg
│   │       ├── 404.svg
│   │       ├── bug.svg
│   │       ├── build.svg
│   │       ├── button.svg
│   │       ├── caret-square-right.svg
│   │       ├── cascader.svg
│   │       ├── chart.svg
│   │       ├── checkbox.svg
│   │       ├── clipboard.svg
│   │       ├── clock.svg
│   │       ├── code.svg
│   │       ├── cogs.svg
│   │       ├── color.svg
│   │       ├── component.svg
│   │       ├── dark.svg
│   │       ├── dashboard.svg
│   │       ├── date-range.svg
│   │       ├── date.svg
│   │       ├── dedent.svg
│   │       ├── dict.svg
│   │       ├── documentation.svg
│   │       ├── download.svg
│   │       ├── drag.svg
│   │       ├── druid.svg
│   │       ├── edit.svg
│   │       ├── education.svg
│   │       ├── email.svg
│   │       ├── example.svg
│   │       ├── excel.svg
│   │       ├── exit-fullscreen.svg
│   │       ├── eye-open.svg
│   │       ├── eye.svg
│   │       ├── file-alt.svg
│   │       ├── form.svg
│   │       ├── fullScreenCancel.svg
│   │       ├── fullscreen.svg
│   │       ├── github.svg
│   │       ├── guide.svg
│   │       ├── icon.svg
│   │       ├── indent.svg
│   │       ├── input.svg
│   │       ├── international.svg
│   │       ├── job.svg
│   │       ├── key.svg
│   │       ├── language.svg
│   │       ├── light.svg
│   │       ├── link.svg
│   │       ├── list.svg
│   │       ├── lock-open.svg
│   │       ├── lock.svg
│   │       ├── log.svg
│   │       ├── logininfor.svg
│   │       ├── logo.svg
│   │       ├── message.svg
│   │       ├── minus.svg
│   │       ├── money.svg
│   │       ├── monitor.svg
│   │       ├── nested.svg
│   │       ├── number.svg
│   │       ├── online.svg
│   │       ├── password.svg
│   │       ├── pdf.svg
│   │       ├── pencil.svg
│   │       ├── people.svg
│   │       ├── peoples.svg
│   │       ├── phone.svg
│   │       ├── plus.svg
│   │       ├── post.svg
│   │       ├── qq.svg
│   │       ├── question.svg
│   │       ├── radio.svg
│   │       ├── random.svg
│   │       ├── rate.svg
│   │       ├── redis-list.svg
│   │       ├── redis.svg
│   │       ├── refresh.svg
│   │       ├── row.svg
│   │       ├── search.svg
│   │       ├── select.svg
│   │       ├── server.svg
│   │       ├── shopping.svg
│   │       ├── sign-out-alt.svg
│   │       ├── size.svg
│   │       ├── skill.svg
│   │       ├── slider.svg
│   │       ├── star.svg
│   │       ├── stop.svg
│   │       ├── swagger.svg
│   │       ├── switch.svg
│   │       ├── sync.svg
│   │       ├── system.svg
│   │       ├── tab.svg
│   │       ├── table.svg
│   │       ├── terminal.svg
│   │       ├── textarea.svg
│   │       ├── theme.svg
│   │       ├── time-range.svg
│   │       ├── time.svg
│   │       ├── times.svg
│   │       ├── tool.svg
│   │       ├── toolbox.svg
│   │       ├── trash.svg
│   │       ├── tree-table.svg
│   │       ├── tree.svg
│   │       ├── upload.svg
│   │       ├── user.svg
│   │       ├── validCode.svg
│   │       ├── vite.svg
│   │       ├── wechat.svg
│   │       └── zip.svg
│   └── images
│       ├── avatar.png
│       ├── header-1.svg
│       ├── login-background.jpg
│       ├── logo.png
│       └── pay.png
├── base-component
│   ├── BaseForm
│   │   ├── index.js
│   │   └── src
│   │       ├── Form.vue
│   │       └── cpn
│   │           └── inputDropdown
│   │               └── inputDropdown.vue
│   ├── BaseTable
│   │   ├── index.js
│   │   └── src
│   │       └── Table.vue
│   ├── Code
│   │   ├── index.js
│   │   └── src
│   │       └── Code.vue
│   ├── TextLink
│   │   ├── index.js
│   │   └── src
│   │       └── TextLink.vue
│   └── echart
│       ├── index.js
│       └── src
│           ├── echart.vue
│           └── hook
│               └── useEchart.js
├── components
│   ├── Crontab
│   │   ├── day.vue
│   │   ├── hour.vue
│   │   ├── index.vue
│   │   ├── min.vue
│   │   ├── month.vue
│   │   ├── result.vue
│   │   ├── second.vue
│   │   ├── week.vue
│   │   └── year.vue
│   ├── DictTag
│   │   └── index.vue
│   ├── Editor
│   │   └── index.vue
│   ├── HsjComponent
│   │   ├── delDialog
│   │   │   ├── index.js
│   │   │   └── src
│   │   │       └── DelDialog.vue
│   │   ├── importDialog
│   │   │   ├── index.js
│   │   │   └── src
│   │   │       └── ImportDialog.vue
│   │   ├── pageContent
│   │   │   ├── index.js
│   │   │   └── src
│   │   │       ├── PageContent.vue
│   │   │       └── dictCpn.vue
│   │   ├── pageDialog
│   │   │   ├── index.js
│   │   │   └── src
│   │   │       └── PageDialog.vue
│   │   └── pageSearch
│   │       ├── index.js
│   │       └── src
│   │           └── PageSearch.vue
│   ├── IconSelector
│   │   └── IconSelector.vue
│   ├── ParentView
│   │   └── index.vue
│   ├── SvgIcon
│   │   ├── index.vue
│   │   ├── svgicon.js
│   │   └── useSvg.vue
│   ├── TreeSelect
│   │   └── index.vue
│   └── iFrame
│       └── index.vue
├── directive
│   ├── common
│   │   └── copyText.js
│   ├── index.js
│   └── permission
│       ├── hasPermi.js
│       └── hasRole.js
├── hooks
│   ├── getPageConfig.js
│   └── useDialog.js
├── layout
│   ├── components
│   │   ├── Aside.vue
│   │   ├── Config
│   │   │   └── index.vue
│   │   ├── ContextMenu
│   │   │   └── index.vue
│   │   ├── DarkSwitch
│   │   │   └── index.vue
│   │   ├── Header.vue
│   │   ├── InnerLink
│   │   │   └── index.vue
│   │   ├── Logo.vue
│   │   └── Main.vue
│   ├── container
│   │   ├── Classic.vue
│   │   ├── Default.vue
│   │   ├── Double.vue
│   │   └── Streamline.vue
│   ├── index.vue
│   ├── menus
│   │   ├── Link.vue
│   │   ├── MenuHorizontal.vue
│   │   ├── MenuTree.vue
│   │   ├── MenuVertical.vue
│   │   └── helper.js
│   └── navBar
│       ├── Classic.vue
│       ├── Default.vue
│       ├── Double.vue
│       ├── NavMenus.vue
│       └── Tabs.vue
├── main.js
├── plugins
│   ├── auth.js
│   ├── download.js
│   ├── index.js
│   ├── modal.js
│   └── tab.js
├── router
│   ├── index.js
│   └── routerInterceptor.js
├── store
│   ├── business
│   │   └── businessStore.js
│   ├── constant
│   │   └── cacheKey.js
│   ├── index.js
│   └── modules
│       ├── dict.js
│       ├── layout.js
│       ├── permission.js
│       ├── tagsView.js
│       └── user.js
├── utils
│   ├── auth.js
│   ├── dict.js
│   ├── errorCode.js
│   ├── hsj
│   │   ├── bus.js
│   │   ├── service
│   │   │   ├── index.js
│   │   │   └── request
│   │   │       ├── config.js
│   │   │       └── index.js
│   │   ├── timeFormat.js
│   │   ├── useSession.js
│   │   ├── useStorage.js
│   │   └── utils.js
│   ├── iconfont.js
│   ├── jsencrypt.js
│   ├── loading.js
│   ├── pageShade.js
│   ├── random.js
│   ├── ruoyi.js
│   ├── to.js
│   ├── useDark.js
│   └── validate.js
└── views
    ├── config
    │   ├── dependencies.js
    │   ├── index.js
    │   ├── project-dir.js
    │   └── technology-stacks.js
    ├── error
    │   ├── 401.vue
    │   └── 404.vue
    ├── index\ copy.vue
    ├── index.vue
    ├── login
    │   ├── config
    │   │   └── formConfig.js
    │   └── login.vue
    ├── monitor
    │   ├── cache
    │   │   ├── index.vue
    │   │   └── list.vue
    │   ├── druid
    │   │   └── index.vue
    │   ├── job
    │   │   ├── config
    │   │   │   ├── contentConfig.js
    │   │   │   ├── dialogConfig.js
    │   │   │   ├── logContent.js
    │   │   │   ├── logSearch.js
    │   │   │   ├── logViewConfig.js
    │   │   │   ├── searchConfig.js
    │   │   │   └── viewDialogConfig.js
    │   │   ├── cpns
    │   │   │   ├── LogView.vue
    │   │   │   └── Review.vue
    │   │   ├── index.vue
    │   │   └── log.vue
    │   ├── logininfor
    │   │   ├── config
    │   │   │   ├── contentConfig.js
    │   │   │   ├── dialogConfig.js
    │   │   │   └── searchConfig.js
    │   │   └── index.vue
    │   ├── online
    │   │   ├── config
    │   │   │   ├── contentConfig.js
    │   │   │   └── searchConfig.js
    │   │   └── index.vue
    │   ├── operlog
    │   │   ├── config
    │   │   │   ├── contentConfig.js
    │   │   │   ├── dialogConfig.js
    │   │   │   └── searchConfig.js
    │   │   └── index.vue
    │   └── server
    │       └── index.vue
    ├── redirect
    │   └── index.vue
    ├── system
    │   ├── config
    │   │   ├── config
    │   │   │   ├── contentConfig.js
    │   │   │   ├── dialogConfig.js
    │   │   │   └── searchConfig.js
    │   │   └── index.vue
    │   ├── config.js
    │   ├── dept
    │   │   ├── config
    │   │   │   ├── contentConfig.js
    │   │   │   ├── dialogConfig.js
    │   │   │   └── searchConfig.js
    │   │   └── index.vue
    │   ├── dict
    │   │   ├── config
    │   │   │   ├── contentConfig.js
    │   │   │   ├── dataContentConfig.js
    │   │   │   ├── dataDialogConfig.js
    │   │   │   ├── dataSearchConfig.js
    │   │   │   ├── dialogConfig.js
    │   │   │   └── searchConfig.js
    │   │   ├── data.vue
    │   │   └── index.vue
    │   ├── menu
    │   │   ├── config
    │   │   │   ├── contentConfig.js
    │   │   │   ├── dialogConfig.js
    │   │   │   └── searchConfig.js
    │   │   └── index.vue
    │   ├── notice
    │   │   ├── config
    │   │   │   ├── contentConfig.js
    │   │   │   ├── dialogConfig.js
    │   │   │   └── searchConfig.js
    │   │   └── index.vue
    │   ├── post
    │   │   ├── config
    │   │   │   ├── contentConfig.js
    │   │   │   ├── dialogConfig.js
    │   │   │   └── searchConfig.js
    │   │   └── index.vue
    │   ├── role
    │   │   ├── authUser.vue
    │   │   ├── components
    │   │   │   ├── AssignDialog.vue
    │   │   │   └── AuthUserDialog.vue
    │   │   ├── config
    │   │   │   ├── assignConfig.js
    │   │   │   ├── authContent.js
    │   │   │   ├── authDialogSearch.js
    │   │   │   ├── authSearch.js
    │   │   │   ├── contentConfig.js
    │   │   │   ├── dialogConfig.js
    │   │   │   └── searchConfig.js
    │   │   └── index.vue
    │   └── user
    │       ├── authRole.vue
    │       ├── config
    │       │   ├── contentConfig.js
    │       │   ├── dialogConfig.js
    │       │   └── searchConfig.js
    │       ├── index.vue
    │       └── profile
    │           ├── index.vue
    │           └── userInfo.vue
    └── tool
        ├── build
        │   └── index.vue
        ├── gen
        │   ├── basicInfoForm.vue
        │   ├── config
        │   │   ├── contentConfig.js
        │   │   └── searchConfig.js
        │   ├── editTable.vue
        │   ├── genInfoForm.vue
        │   ├── importTable.vue
        │   └── index.vue
        └── swagger
            └── index.vue
`
