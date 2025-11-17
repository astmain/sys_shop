<template>


  <nav style="" class="uno_card">
    <el-tree class="user_tree_left" ref="ElTreeRef" style="width: 250px; height: auto; overflow: auto"
      :data="tree_depart.data" :props="{ label: 'name' }" node-key="id" :current-node-key="tree_depart.currentNodeKey"
      :expand-on-click-node="false" highlight-current default-expand-all @node-click="tree_left_click"
      @node-contextmenu="tree_ritht_click">
    </el-tree>
  </nav>
</template>

<script setup lang="tsx">
import { onMounted, ref } from "vue"
import { ElMessage } from "element-plus"
import { api_v1 } from "@/api_v1"

const tree_depart = ref({
  data: [] as any[],
  currentNodeKey: undefined,
})

async function find_depart_by_user_id() {
  const res: any = await api_v1.auth.find_depart_by_user_id()
  console.log(`111---res:`, res)
  tree_depart.value.data = res.result.depart_tree
}


onMounted(async () => {
  await find_depart_by_user_id()
})


async function tree_left_click() { }
function tree_ritht_click(evt: Event, data: any, node: any, nodeInstance: any) { }
</script>
