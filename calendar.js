(function() {
  var events = [
    {title: 'Breakfast with Jesica', hour: 8, minute: 15},
    {title: 'Team Standup', hour: 10, minute: 0},
    {title: 'Meeting with Gregg', hour: 10, minute: 30},
    {title: 'Lunch with Sean', hour: 11, minute: 45}
  ];
  var Calendar = function() {
    this.hours = [];
    var i = 0;

    for (; i < 24; i++) {
      this.hours.push(new Calendar.Hour(i));
    }
  };
  Calendar.prototype.loadEvents = function(events) {
    var event, e, i;
    var length = events.length;

    for (i = 0; i < length; i++) {
      e = events[i];
      event = new Calendar.Event(e.title, e.hour, e.minute);
      this.hours[e.hour].events.push(event);
    }
  };
  Calendar.prototype.display = function() {
    var view = new Calendar.CalendarView(this);
    document.getElementById('hours').appendChild(view.cloneNode(true));
  };
  Calendar.init = function() {
    var app = new Calendar;
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
  Calendar.CalendarView = function(app) {
    var fragment, i, length;
    fragment = document.createDocumentFragment();
    for (i = 0, length = app.hours.length; i < length; i++) {
      fragment.appendChild(new Calendar.HourView(app.hours[i]).render());
    }
    return fragment;
  };
  Calendar.HourView = function(hour) {
    this.hour = hour;
    this.render = function() {
      var elem, i, length, ol, span;
      elem = document.createElement('li');
      elem.className = 'hour';
      span = document.createElement('span');
      span.appendChild(document.createTextNode(hour.asText()));
      elem.appendChild(span);
      ol = document.createElement('ol');
      ol.className = 'hour-events';
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
      var elem;
      elem = document.createElement('li');
      elem.className = 'event';
      elem.appendChild(document.createTextNode(this.event.asText()));
      return elem;
    };
  };
  document.addEventListener('DOMContentLoaded', Calendar.init, false);
})();
