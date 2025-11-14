interface form {
  type: // 用户
  | 'user_id'
    // 模型订单
    | 'order_model_id'
    | 'order_model_item_id'
    // 打印订单
    | 'order_print_id'
    | 'order_print_item_id'
    // 商品
    | 'product_id'
}

export function util_id(form: form) {
  const timestamp = Date.now() //时间戳13位
  const str3 = random_str3() //3位随机字符

  let prefix = '' //前缀标识符3位
  if (form.type === 'user_id') prefix = 'ua_'
  else if (form.type === 'order_model_id') prefix = 'om1_'
  else if (form.type === 'order_model_item_id') prefix = 'om2_'
  else if (form.type === 'order_print_id') prefix = 'op1_'
  else if (form.type === 'order_print_item_id') prefix = 'op2_'
  else if (form.type === 'product_id') prefix = 'pa_'
  return prefix + str3 + timestamp
}

export function random_str3() {
  return 'xxx_'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
