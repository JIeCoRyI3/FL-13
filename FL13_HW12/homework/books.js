const dataArray = [
	{
		id: 0,
		title: 'Grand',
		img: 'https://picsum.photos/id/1/400',
		author: 'Fendrik Welbert',
		plot: `Lorem ipsum dolor sit amet,
		consectetur adipiscing elit. Maecenas 
		condimentum diam eget facilisis tempus. 
		Aliquam sed nunc vitae dui ultrices vehicula. 
		Donec volutpat justo at iaculis rutrum. Nulla facilisi. 
		Cras varius lectus magna, id accumsan nunc sagittis sit amet. 
		Proin porttitor, nunc ac venenatis laoreet, magna ex pretium felis, 
		vel luctus dolor dui a orci. Proin pulvinar eros sapien, 
		quis interdum nisl tincidunt ut. Curabitur id nunc blandit, 
		commodo eros at, suscipit sapien. Vivamus auctor sit amet urna a viverra. 
		Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
		cubilia curae; Vivamus tempus hendrerit iaculis. Sed quis arcu ut metus 
		elementum dictum sit amet sed risus.`
	},

	{
		id: 1,
		title: 'Gert',
		img: 'https://picsum.photos/id/2/400',
		author: 'Bert Govanni',
		plot: `Nam ultrices bibendum ligula ac molestie. 
		Integer faucibus eu nisl rutrum dignissim. 
		Maecenas sed eleifend leo. Fusce tempor nulla ut velit consectetur, 
		nec egestas elit elementum. Pellentesque in dapibus erat. 
		Etiam accumsan facilisis aliquet. Sed non vestibulum purus. 
		Etiam eget nulla vehicula, consequat ligula fringilla, vestibulum magna. 
		Sed eget euismod orci, vitae tincidunt lorem. In dui urna, 
		egestas sed auctor eget, euismod quis arcu. In non neque hendrerit, 
		posuere nisi sit amet, malesuada ex. Fusce elementum ex sed odio suscipit, 
		sit amet congue sem fringilla. Nam auctor mi non velit tincidunt auctor. 
		Mauris maximus, est ac elementum dictum, sem arcu pharetra nulla, 
		sit amet tempus arcu lectus vestibulum risus. Integer vulputate convallis eleifend.`
	},

	{
		id: 2,
		title: 'World',
		img: 'https://picsum.photos/id/3/400', 
		author: 'Bert Govanni',
		plot: `Integer lectus ligula, ullamcorper et posuere sit amet, 
		hendrerit ut ex. Fusce at bibendum mi, in euismod elit. 
		Quisque bibendum, tellus nec bibendum ultricies, 
		ligula lectus accumsan neque, eu eleifend magna ex id ipsum. 
		Aliquam vitae consectetur purus. Integer pulvinar massa id convallis dapibus. 
		Suspendisse in nisl augue. Nunc dapibus vestibulum arcu, 
		et suscipit dui placerat ac. Phasellus viverra metus odio, 
		a pharetra lorem malesuada a. 
		Curabitur dapibus mauris feugiat sapien dapibus fringilla. 
		Pellentesque eget purus eget orci consequat dictum dignissim id magna. 
		Etiam iaculis, augue nec fringilla varius, dolor dui lobortis nisi, 
		in convallis eros nunc id tellus. Praesent gravida maximus malesuada.
		Morbi efficitur neque dui, vitae varius dolor accumsan et.`
	}
];

JSON.parse(localStorage.getItem('data'))? null : localStorage.setItem('data', JSON.stringify(dataArray));