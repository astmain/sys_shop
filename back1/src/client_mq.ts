const mqtt = require('mqtt')
export function client_mq() {
  const connectUrl = `mqtt://192.168.0.250:1883`
  const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
  const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'emqx',
    password: 'public',
    reconnectPeriod: 1000,
  })

  // const topic = '/nodejs/mqtt'
  const topic = 'testtopic/1'
  client.on('connect', () => {
    console.log('成功:连接到服务端', connectUrl, clientId)
    client.subscribe([topic], () => {
      console.log(`成功:订阅频道`, topic)
    })
    // client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    //   if (error) {
    //     console.error(error)
    //   }
    // })
  })
  client.on('error', (err) => {
    console.error('MQTT 客户端错误:', err)
  })
  client.on('offline', () => {
    console.log('客户端离线')
  })
  client.on('message', (topic, payload) => {
    console.log('收到消息: ' , new Date().toLocaleString(), topic, payload.toString())
  })
}
