<template>
  <nav class="flex gap-4">
    <nav class="uno_card1 w-250px">
      <el-tree class="user_tree_left" ref="ref_tree_depart" style="width: 250px; height: auto; overflow: auto"
        :data="tree_depart.data" :props="{ label: 'name' }" node-key="id" :current-node-key="tree_depart.currentNodeKey"
        :expand-on-click-node="false" highlight-current default-expand-all @node-click="tree_left_click"
        @node-contextmenu="tree_ritht_click">
      </el-tree>
    </nav>


    <nav class="uno_card1 flex-1">
      <el-table :data="list_user" style="width: 100%; height: 100%" show-overflow-tooltip stripe
        :header-cell-style="{ background: '#f4f4f5', color: '#606266' }">
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="phone" label="手机号" width="200" />
        <el-table-column prop="gender" label="性别" width="100" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <!-- <el-button type="primary" link @click="user_drawer_ref.open(scope.row.id)">修改</el-button> -->
            <el-button link @click="remove_ids_user([scope.row.user_id])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </nav>
  </nav>




</template>

<script setup lang="tsx">
import { onMounted, ref } from "vue"
import { ElMessage } from "element-plus"
import { api_v1 } from "@/api_v1"
const ref_tree_depart = ref()
const curr_depart_node = ref()
const list_user = ref([] as any[])
const tree_depart = ref({
  data: [] as any[],
  currentNodeKey: undefined,
})

async function find_depart_by_user_id() {
  const res: any = await api_v1.auth.find_depart_by_user_id()
  console.log(`111---res:`, res)
  tree_depart.value.data = res.result.depart_tree
}


async function remove_ids_user(ids: string[]) {
  const res: any = await api_v1.user.remove_ids_user({ ids: ids })
  if (res.code === 200) {
    ElMessage.success(res.msg)
    await find_depart_by_user_id()
    await tree_left_click(curr_depart_node.value)
  } else {
    ElMessage.error(res.msg)
  }

  
}




async function tree_left_click(data: any) {
  curr_depart_node.value = data
  console.log(`111---curr_depart_node.value:`, curr_depart_node.value)
  const res: any = await api_v1.auth.find_list_user({ depart_id: curr_depart_node.value.id })
  console.log(`111---res:`, res)
  list_user.value = res.result.list_user

}


function tree_ritht_click(event: Event, data: any, node: any, nodeInstance: any) {

}



onMounted(async () => {
  await find_depart_by_user_id()
})
</script>
