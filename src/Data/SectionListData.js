export const ProfileInfoData = [
    {
      title:'Profile',
      data:[{name:'userName', header:'User name', rules:{required:'Name is required'}}]
    },
    {
      title:'Address',
      data:[
        {name:'country', header:'Country', rules:{required:'Name is required'}},
        {name:'city', header:'City', rules:{required:'Name is required'}},
        {name:'street', header:'Street', rules:{required:'Name is required'}, placeholder:'Mystreet 4'}
      ]
    }
  ]