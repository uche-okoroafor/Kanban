export default [
  {
    _id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2021, 11, 0),
    end: new Date(2021, 11, 1),
    tagColor: 'green',
  },
  {
    _id: 1,
    title: 'Long Event',
    start: new Date(2021, 11, 7),
    end: new Date(2021, 11, 7),
    tagColor: 'blue',
  },

  {
    _id: 2,
    title: 'DTS STARTS',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
    tagColor: 'pink',
  },

  {
    _id: 3,
    title: 'DTS ENDS',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
    tagColor: 'orange',
  },

  {
    _id: 4,
    title: 'Some Event',
    start: new Date(2021, 11, 9, 0, 0, 0),
    end: new Date(2021, 11, 9, 0, 0, 0),
    tagColor: 'brown',
  },
  {
    _id: 5,
    title: 'Conference',
    start: new Date(2021, 11, 13),
    end: new Date(2021, 11, 13),
    desc: 'Big conference for important people',
    tagColor: 'yellow',
  },
  {
    _id: 6,
    title: 'Meeting',
    start: new Date(2021, 11, 12, 10, 30, 0, 0),
    end: new Date(2021, 11, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
    tagColor: 'red',
  },
  {
    _id: 7,
    title: 'Lunch',
    start: new Date(2021, 11, 12, 12, 0, 0, 0),
    end: new Date(2021, 11, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
    tagColor: 'purple',
  },
  {
    _id: 8,
    title: 'Meeting',
    start: new Date(2021, 11, 12, 14, 0, 0, 0),
    end: new Date(2021, 11, 12, 15, 0, 0, 0),
    tagColor: 'volet',
  },
  {
    _id: 9,
    title: 'Happy Hour',
    start: new Date(2021, 11, 12, 17, 0, 0, 0),
    end: new Date(2021, 11, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
    tagColor: 'green',
  },
  {
    _id: 10,
    title: 'Dinner',
    start: new Date(2021, 11, 12, 20, 0, 0, 0),
    end: new Date(2021, 11, 12, 21, 0, 0, 0),
    tagColor: 'blue',
  },
  {
    _id: 11,
    title: 'Birthday Party',
    start: new Date(2021, 11, 13, 7, 0, 0),
    end: new Date(2021, 11, 13, 10, 30, 0),
    tagColor: 'orange',
  },

  {
    _id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
    tagColor: 'green',
  },
];
