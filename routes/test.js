const orders =[
  {
    name: 'michel',
    phone_number: '5558715462',
    id: 1,
    quantity: 2,
    item: 'cheese burger',
    total_price: 20
  },
  {
    name: 'michel',
    phone_number: '5558715462',
    id: 1,
    quantity: 2,
    item: 'double cheese burger',
    total_price: 20
  },
  {
    name: 'michel',
    phone_number: '5558715462',
    id: 1,
    quantity: 2,
    item: 'triple cheese burger',
    total_price: 20
  },
  {
    name: 'michel',
    phone_number: '5558715462',
    id: 2,
    quantity: 1,
    item: 'cheese burger',
    total_price: 10
  },
  {
    name: 'michel',
    phone_number: '5558715462',
    id: 2,
    quantity: 2,
    item: 'double cheese burger',
    total_price: 20
  },
  {
    name: 'michel',
    phone_number: '5558715462',
    id: 3,
    quantity: 4,
    item: 'cheese burger',
    total_price: 40
  }
]

const orderObject = {};
for (const order of orders) {
  orderObject[order.id] = {
    id: order.id,
    name: order.name,
    phone_number : order.phone_number,
    quantity: order.quantity,
    items:[],
    total_price: order.total_price
  }
} for (const order of orders){
  orderObject[order.id].items.push(order.item)
}
console.log(Object.values(orderObject))
