// 构建菜单树的递归函数



export function db_build_tree(menus: any, parent_id: string | null = null) {
    const filtered_menus = menus.filter((menu) => {
      const menu_parent_id = menu.parent_id || null
      return menu_parent_id === parent_id
    })
  
    return filtered_menus.map((menu) => ({
      ...menu,
      children: db_build_tree(menus, menu.id),
    }))
  }