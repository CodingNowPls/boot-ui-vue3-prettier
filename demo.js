function findFirstVisibleChild(nodes) {
  let path = ''
  let menu
  function find(nodes) {
    for (let node of nodes) {
      if (!node.hidden) {
        if (node.children && node.children.length > 0) {
          flag = true
          path += '/' + node.path
          menu = node
          let visibleChild = find(node.children)
          if (visibleChild) {
            return visibleChild
          }
        } else {
          path += '/' + node.path
          return node
        }
      } else {
        if (menu) {
          return menu
        }
      }
    }
  }
  const firstMenu = find(nodes)

  return { firstMenu, path }
}

let demo = {
  children: [
    {
      path: 'user',
      hidden: false,
      children: [
        {
          path: 'menu',
          hidden: true,
          children: [
            {
              path: 'info',
              hidden: true,
              name: 'lll',
            },
          ],
        },
      ],
    },
    {
      path: 'role',
      hidden: false,
    },
  ],
}

let parsedData = findFirstVisibleChild(demo.children)
console.log(parsedData)
