export const houseType = [
  {
    id: 'number',
    type: 'number',
    min: 1,
    max: 65535,
    title: '套数',
  },
  {
    id: 'price',
    type: 'text',
    title: '单价',
  },
  {
    id: 'totalPrice',
    type: 'text',
    title: '总价',
  },
  {
    id: 'status',
    type: 'select',
    title: '状态',
    values: [
      '待售',
      '已售',
    ],
  },
];
