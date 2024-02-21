export const objectTypeData = [
    {value:'Phone'},
    {value:'Book'},
    {value:'Furneture'},
    {value:'PC'}
  ]

export const ProfileInfoData = [
  {
    title:'Profile',
    data:[{name:'userName', header:'User name', rules: {required:'Name is required'}}]
  },
  {
    title:'Address',
    data: [
      {name:'country', header:'Country', rules: {required:'Name is required'}},
      {name:'city', header:'City', rules: {required:'Name is required'}},
      {name:'street', header:'Street', rules: {required:'Name is required'}, placeholder:'Mystreet 4'}
    ]
  }
]

export const ratingData = [
  'Needs a serious overhaul',
  "Got major defects, that affect performance",
  'Needs a small repair ',
  "Got major defects, that don't affect performance" ,
  'Usable',
  'Got minor visible deffects ',
  'Got minor barely visible defects', 
  'Was used only once', 
  'Was never used!' 
]