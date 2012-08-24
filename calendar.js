(function() {
  var events = [
    {title: 'Breakfast with Jesica', hour: 8, minute: 15},
    {title: 'Team Standup', hour: 10, minute: 0},
    {title: 'Meeting with Gregg', hour: 10, minute: 30},
    {title: 'Lunch with Sean', hour: 11, minute: 45}
  ];
  var Calendar = function(date) {
    this.date = date;
    this.hours = [];
    var i = 0;

    for (; i < 24; i++) {
      this.hours.push(new Calendar.Hour(i));
    }
  };
  Calendar.prototype.loadEvents = function(events) {
    var e, event, i, length;
    for (i = 0, length = events.length; i < length; i++) {
      e = events[i];
      event = new Calendar.Event(e.title, e.hour, e.minute);
      this.hours[e.hour].events.push(event);
    }
  };
  Calendar.prototype.display = function() {
    this.displayControls();
    this.displayCalendar();
  };
  Calendar.prototype.displayCalendar = function() {
    var calendar, hours, view;
    calendar = getElementById('calendar');
    hours = getElementById('hours');
    view = new Calendar.CalendarView(this.hours);
    calendar.replaceChild(view.render().cloneNode(true), hours);
  };
  Calendar.prototype.displayControls = function() {
    var calendar, controls, view;
    calendar = getElementById('calendar');
    controls = getElementById('controls');
    view = new Calendar.ControlsView(this.date);
    calendar.replaceChild(view.render().cloneNode(true), controls);
  };
  Calendar.init = function() {
    var app = new Calendar(new Date);
    app.loadEvents(events);
    app.display();
    window.app = app
  };
  Calendar.Hour = function(hour) {
    this.hour = hour;
    this.events = [];
    this.asText = function() {
      var h = this.hour.toString();
      if (h.length === 1) { h = "0" + h; }
      return h + "00";
    };
  };
  Calendar.Event = function(title, hour, minute) {
    this.title = title;
    this.hour = hour;
    this.minute = minute;
    this.asText = function() {
      var h, m;
      h = this.hour.toString();
      if (h.length === 1) { h = "0" + h; }
      m = this.minute.toString();
      if (m.length === 1) { m = "0" + m; }
      return [h, m, ' - ', this.title].join('');
    };
  };
  Calendar.ControlsView = function(date) {
    this.date = date;
    this.render = function() {
      var curr, elem, next, prev;
      elem = createElement('div', null, {id: 'controls'});
      prev = createElement('a', decrementDate(this.date).toDateString(), {className: 'prev', href: '#'});
      elem.appendChild(prev);
      next = createElement('a', incrementDate(this.date).toDateString(), {className: 'next', href: '#'});
      elem.appendChild(next);
      curr = createElement('span', this.date.toDateString(), {className: 'current'});
      elem.appendChild(curr);
      return elem;
    }
  };
  Calendar.CalendarView = function(hours) {
    this.hours = hours;
    this.render = function() {
      var elem, i, length;
      elem = createElement('ol', null, {id: 'hours'});
      for (i = 0, length = this.hours.length; i < length; i++) {
        elem.appendChild(new Calendar.HourView(this.hours[i]).render());
      }
      return elem;
    }
  };
  Calendar.HourView = function(hour) {
    this.hour = hour;
    this.render = function() {
      var elem, i, length, ol;
      elem = createElement('li', null, {className: 'hour'});
      elem.appendChild(createElement('span', hour.asText()));
      ol = createElement('ol', null, {className: 'events'});
      for (i = 0, length = this.hour.events.length; i < length; i++) {
        ol.appendChild(new Calendar.EventView(this.hour.events[i]).render());
      }
      elem.appendChild(ol);
      return elem;
    };
  };
  Calendar.EventView = function(event) {
    this.event = event;
    this.render = function() {
      return createElement('li', this.event.asText(), {className: 'event'});
    };
  };
  var createElement = function(type, text, attributes) {
    var elem = document.createElement(type);
    if (text) { elem.appendChild(createTextNode(text)); }
    for (key in attributes) { elem[key] = attributes[key]; }
    return elem;
  };
  var createTextNode = function(text) {
    return document.createTextNode(text);
  };
  var getElementById = function(id) {
    return document.getElementById(id);
  }
  var decrementDate = function(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
  };
  var incrementDate = function(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
  };
  document.addEventListener('DOMContentLoaded', Calendar.init, false);
})();
