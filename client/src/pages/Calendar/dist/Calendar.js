'use strict';
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
    return r;
  };
exports.__esModule = true;
var core_1 = require('@material-ui/core');
var event_1 = require('./event');
var react_1 = require('react');
var react_big_calendar_1 = require('react-big-calendar');
var dragAndDrop_1 = require('react-big-calendar/lib/addons/dragAndDrop');
var format_1 = require('date-fns/format');
var parse_1 = require('date-fns/parse');
var startOfWeek_1 = require('date-fns/startOfWeek');
var getDay_1 = require('date-fns/getDay');
var en_US_1 = require('date-fns/locale/en-US');
var addHours_1 = require('date-fns/addHours');
var startOfHour_1 = require('date-fns/startOfHour');
require('./styles.css');
require('react-big-calendar/lib/addons/dragAndDrop/styles.css');
require('react-big-calendar/lib/css/react-big-calendar.css');
var CalendarPage = function () {
  var _a = react_1.useState(event_1['default']),
    events = _a[0],
    setEvents = _a[1];
  var spanCard = document.createElement('span');
  var divCard = document.createElement('div');
  // const cardContentContainer = document.createElement('div');
  var eventElement = document.getElementsByClassName('rbc-event');
  var text = document.createTextNode('uche okoroafor');
  spanCard.appendChild(text);
  // element.classList.add('class-1')
  // eventElement[0].appendChild(spanCard);
  // if (eventElement) {
  //   for (const index in eventElement) {
  //     eventElement[index].appendChild(spanCard);
  //     eventElement[index].appendChild(divCard);
  //   }
  // }
  react_1.useEffect(
    function () {
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [event_1['default']],
  );
  // const span = document.createElement('span');
  // const text = document.createTextNode('new text');
  // span.appendChild(text);
  // document.querySelectorAll('.rbc-event')[0].appendChild(span);
  // eventContainer.forEach((element) => element.appendChild(span));
  // console.log(document.querySelectorAll('.rbc-addons-dnd-resize-ew-anchor div'));
  // document.querySelector('rbc-event div')
  // document.querySelectorAll('.rbc-event').push(span);
  // const eventContainer =
  var onEventDrop = function (data) {
    var start = data.start,
      end = data.end;
    var draggedEvent = data.event;
    draggedEvent.start = new Date(start);
    draggedEvent.end = new Date(end);
    var filteredEvents = events.filter(function (event) {
      return event.id !== draggedEvent.id;
    });
    setEvents(__spreadArrays(filteredEvents, [draggedEvent]));
    // for (const index in eventElement) {
    //   eventElement[index].appendChild(spanCard);
    //   eventElement[index].appendChild(divCard);
    // }
    document.getElementsByClassName('rbc-event')[0].appendChild(spanCard);
    document.getElementsByClassName('rbc-event')[1].appendChild(spanCard);
    document.getElementsByClassName('rbc-event')[2].appendChild(spanCard);
    document.getElementsByClassName('rbc-event')[3].appendChild(spanCard);
    document.getElementsByClassName('rbc-event')[4].appendChild(spanCard);
    document.getElementsByClassName('rbc-event')[5].appendChild(spanCard);
    // document.getElementsByClassName('rbc-event')[6].appendChild(divCard);
    // document.getElementsByClassName('rbc-event')[7].appendChild(divCard);
    // document.getElementsByClassName('rbc-event')[0].appendChild(divCard);
    // document.getElementsByClassName('rbc-event')[0].appendChild(divCard);
    // updateCardItem("cardDealine",cardId,boardId,columnId,userId,value)
  };
  return React.createElement(
    core_1.Container,
    { style: { backgroundColor: 'white' } },
    React.createElement(DnDCalendar, {
      defaultView: 'month',
      events: events,
      localizer: localizer,
      onEventDrop: onEventDrop,
      defaultDate: new Date(2015, 3, 12),
      style: {
        height: '100vh',
      },
    }),
  );
};
var locales = {
  'en-US': en_US_1['default'],
};
var endOfHour = function (date) {
  return addHours_1['default'](startOfHour_1['default'](date), 1);
};
var now = new Date();
var start = endOfHour(now);
var end = addHours_1['default'](start, 2);
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
var localizer = react_big_calendar_1.dateFnsLocalizer({
  format: format_1['default'],
  parse: parse_1['default'],
  startOfWeek: startOfWeek_1['default'],
  getDay: getDay_1['default'],
  locales: locales,
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
var DnDCalendar = dragAndDrop_1['default'](react_big_calendar_1.Calendar);
exports['default'] = CalendarPage;
// '({ id: number; title: string; allDay: boolean; start: Date; end: Date; desc?: undefined; } | { id: number; title: string; start: Date; end: Date; allDay?: undefined; desc?: undefined; } | { ...; })[]'
