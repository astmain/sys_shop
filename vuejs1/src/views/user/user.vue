<template>


  <nav style="" class="uno_card">
    <el-tree class="user_tree_left" ref="ref_tree_depart" style="width: 250px; height: auto; overflow: auto"
      :data="tree_depart.data" :props="{ label: 'name' }" node-key="id" :current-node-key="tree_depart.currentNodeKey"
      :expand-on-click-node="false" highlight-current default-expand-all @node-click="tree_left_click"
      @node-contextmenu="tree_ritht_click">
    </el-tree>
  </nav>


  <el-table :data="user_list" style="width: 100%; height: 100%" show-overflow-tooltip stripe
    :header-cell-style="{ background: '#f4f4f5', color: '#606266' }">


  </el-table>
</template>

<script setup lang="tsx">
import { onMounted, ref } from "vue"
import { ElMessage } from "element-plus"
import { api_v1 } from "@/api_v1"
const ref_tree_depart = ref()
const curr_depart_node = ref()
const user_list = ref([] as any[])
const tree_depart = ref({
  data: [] as any[],
  currentNodeKey: undefined,
})

async function find_depart_by_user_id() {
  const res: any = await api_v1.auth.find_depart_by_user_id()
  console.log(`111---res:`, res)
  tree_depart.value.data = res.result.depart_tree
}




async function tree_left_click(data: any) {
  curr_depart_node.value = data
  console.log(`111---curr_depart_node.value:`, curr_depart_node.value)
  const res: any = await api_v1.auth.find_list_user({ depart_id: curr_depart_node.value.id })
  console.log(`111---res:`, res)
  // user_list.value = res.result.user_list
}


function tree_ritht_click(event: Event, data: any, node: any, nodeInstance: any) {

}



onMounted(async () => {
  await find_depart_by_user_id()
})
</script>
