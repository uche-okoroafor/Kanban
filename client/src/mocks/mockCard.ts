const boards = [
  {
    _id: '1',
    boardTitle: 'firstBoard',
    columns: [
      {
        _id: '1',
        columnTitle: 'start',
        cards: [
          {
            _id: '1',
            cardTitle: 'first card',
            tagColor: 'blue',
            description: 'this is first card',
            comment: 'comment section',
            deadline: '2019-01-08T20:23',
            checklist: [{ item: 'Eat', isChecked: true, _id: '1' }],
            attachment: {
              imageName: 'image1',
              imageSource:
                'https://media-exp1.licdn.com/dms/image/C4D03AQEVYXv67l-1TA/profile-displayphoto-shrink_400_400/0/1599999564029?e=1642636800&v=beta&t=uV64EM58yJRZfnv7lAxQysobzhdLDwgl37UezXaGmxg',
              _id: '1',
            },
          },
        ],
      },
      {
        _id: '2',
        columnTitle: 'review',
        cards: [
          {
            _id: '2',
            cardTitle: 'second card',
            tagColor: 'green',
            description: 'this is second card',
            comment: 'comment section',
            deadline: '2019-01-08T20:23',
            checklist: [{ item: 'Eat', isChecked: true, _id: '2' }],
            attachment: {
              imageName: 'image2',
              imageSource:
                'https://media-exp1.licdn.com/dms/image/C4D03AQEVYXv67l-1TA/profile-displayphoto-shrink_400_400/0/1599999564029?e=1642636800&v=beta&t=uV64EM58yJRZfnv7lAxQysobzhdLDwgl37UezXaGmxg',
              _id: '2',
            },
          },
        ],
      },
      {
        _id: '3',
        columnTitle: 'In progress',
        cards: [
          {
            _id: '3',
            cardTitle: 'third card',
            tagColor: 'pink',
            description: 'this is third card',
            comment: 'comment section',
            deadline: '2019-01-08T20:23',
            checklist: [{ item: 'Eat', isChecked: true, _id: '3' }],
            attachment: {
              imageName: 'image3',
              imageSource:
                'https://media-exp1.licdn.com/dms/image/C4D03AQEVYXv67l-1TA/profile-displayphoto-shrink_400_400/0/1599999564029?e=1642636800&v=beta&t=uV64EM58yJRZfnv7lAxQysobzhdLDwgl37UezXaGmxg',
              _id: '3',
            },
          },
        ],
      },
      {
        _id: '4',
        columnTitle: 'finish',
        cards: [
          {
            _id: '4',
            cardTitle: 'fourth card',
            tagColor: 'red',
            description: 'this is fourth card',
            comment: 'comment section',
            deadline: '2019-01-08T20:23',
            checklist: [{ item: 'Eat', isChecked: true, _id: '4' }],
            attachment: {
              imageName: 'image4',
              imageSource:
                'https://media-exp1.licdn.com/dms/image/C4D03AQEVYXv67l-1TA/profile-displayphoto-shrink_400_400/0/1599999564029?e=1642636800&v=beta&t=uV64EM58yJRZfnv7lAxQysobzhdLDwgl37UezXaGmxg',
              _id: '4',
            },
          },
        ],
      },
    ],
  },
];

// const card = [
//   {
//     _id: "1",
//     cardTitle: 'first card',
//     tagColor: 'blue',
//     description: 'this is first card',
//     comment: 'comment section',
//     deadline: '2019-01-08T20:23',
//     checklist: [{ item: 'Eat', isChecked: true, _id: "1" }],
//     attachment: {
//       imageName: 'image1',
//       imageSource:
//         'https://media-exp1.licdn.com/dms/image/C4D03AQEVYXv67l-1TA/profile-displayphoto-shrink_400_400/0/1599999564029?e=1642636800&v=beta&t=uV64EM58yJRZfnv7lAxQysobzhdLDwgl37UezXaGmxg',
//       _id: "1",
//     },
//   },
//   {
//     _id: "2",
//     cardTitle: 'second card',
//     tagColor: 'green',
//     description: 'this is second card',
//     comment: 'comment section',
//     deadline: '2019-01-08T20:23',
//     checklist: [{ item: 'Eat', isChecked: true, _id: "2" }],
//     attachment: {
//       imageName: 'image2',
//       imageSource:
//         'https://media-exp1.licdn.com/dms/image/C4D03AQEVYXv67l-1TA/profile-displayphoto-shrink_400_400/0/1599999564029?e=1642636800&v=beta&t=uV64EM58yJRZfnv7lAxQysobzhdLDwgl37UezXaGmxg',
//       _id: "2",
//     },
//   },
//   {
//     _id: "3",
//     cardTitle: 'third card',
//     tagColor: 'pink',
//     description: 'this is third card',
//     comment: 'comment section',
//     deadline: '2019-01-08T20:23',
//     checklist: [{ item: 'Eat', isChecked: true, _id: "3" }],
//     attachment: {
//       imageName: 'image3',
//       imageSource:
//         'https://media-exp1.licdn.com/dms/image/C4D03AQEVYXv67l-1TA/profile-displayphoto-shrink_400_400/0/1599999564029?e=1642636800&v=beta&t=uV64EM58yJRZfnv7lAxQysobzhdLDwgl37UezXaGmxg',
//       _id: "3",
//     },
//   },
//   {
//     _id: "4",
//     cardTitle: 'fourth card',
//     tagColor: 'red',
//     description: 'this is fourth card',
//     comment: 'comment section',
//     deadline: '2019-01-08T20:23',
//     checklist: [{ item: 'Eat', isChecked: true, _id: "4" }],
//     attachment: {
//       imageName: 'image4',
//       imageSource:
//         'https://media-exp1.licdn.com/dms/image/C4D03AQEVYXv67l-1TA/profile-displayphoto-shrink_400_400/0/1599999564029?e=1642636800&v=beta&t=uV64EM58yJRZfnv7lAxQysobzhdLDwgl37UezXaGmxg',
//       _id: "4",
//     },
//   },
// ];

export default boards;
