"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var DateTime = (function () {
    function DateTime() {
        this.months = [
            { fullName: 'January', shortName: 'Jan' },
            { fullName: 'February', shortName: 'Feb' },
            { fullName: 'March', shortName: 'Mar' },
            { fullName: 'April', shortName: 'Apr' },
            { fullName: 'May', shortName: 'May' },
            { fullName: 'June', shortName: 'Jun' },
            { fullName: 'July', shortName: 'Jul' },
            { fullName: 'August', shortName: 'Aug' },
            { fullName: 'September', shortName: 'Sep' },
            { fullName: 'October', shortName: 'Oct' },
            { fullName: 'November', shortName: 'Nov' },
            { fullName: 'December', shortName: 'Dec' }
        ];
        this.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        this.daysOfWeek = [
            { fullName: 'Sunday', shortName: 'Su', weekend: true },
            { fullName: 'Monday', shortName: 'Mo' },
            { fullName: 'Tuesday', shortName: 'Tu' },
            { fullName: 'Wednesday', shortName: 'We' },
            { fullName: 'Thursday', shortName: 'Th' },
            { fullName: 'Friday', shortName: 'Fr' },
            { fullName: 'Saturday', shortName: 'Sa', weekend: true }
        ];
        this.firstDayOfWeek = 0;
        this.localizedDaysOfWeek = this.daysOfWeek
            .concat(this.daysOfWeek)
            .splice(this.firstDayOfWeek, 7);
    }
    DateTime.prototype.getMonthData = function (year, month) {
        year = month > 11 ? year + 1 :
            month < 0 ? year - 1 :
                year;
        month = (month + 12) % 12;
        var firstDayOfMonth = new Date(year, month, 1);
        var lastDayOfMonth = new Date(year, month + 1, 0);
        var lastDayOfPreviousMonth = new Date(year, month, 0);
        var daysInMonth = lastDayOfMonth.getDate();
        var daysInLastMonth = lastDayOfPreviousMonth.getDate();
        var dayOfWeek = firstDayOfMonth.getDay();
        var leadingDays = (dayOfWeek - this.firstDayOfWeek + 7) % 7 || 7;
        var trailingDays = this.days.slice(0, 6 * 7 - (leadingDays + daysInMonth));
        if (trailingDays.length > 7) {
            trailingDays = trailingDays.slice(0, trailingDays.length - 7);
        }
        var monthData = {
            year: year,
            month: month,
            days: this.days.slice(0, daysInMonth),
            leadingDays: this.days.slice(-leadingDays - (31 - daysInLastMonth), daysInLastMonth),
            trailingDays: trailingDays
        };
        return monthData;
    };
    ;
    DateTime.prototype.fromString = function (dateStr) {
        dateStr = this.removeTimezone(dateStr);
        dateStr = dateStr + this.addDSTOffset(dateStr);
        var tmp = dateStr.split(/[-:\ T]/);
        console.log('dateStr', dateStr);
        return new Date(Number(tmp[0]), Number(tmp[1]) - 1, Number(tmp[2]), Number(tmp[3]) || 0, Number(tmp[4]) || 0, Number(tmp[5]) || 0);
    };
    DateTime.prototype.formatDate = function (d, dateOnly) {
        var pad0 = function (number) {
            return ("0" + number).slice(-2);
        };
        var ret = d.getFullYear() + '-' + pad0(d.getMonth() + 1) + '-' + pad0(d.getDate());
        if (!dateOnly) {
            ret += ' ' + pad0(d.getHours()) + ':' + pad0(d.getMinutes());
        }
        return ret;
    };
    DateTime.prototype.removeTimezone = function (dateStr) {
        var matches = dateStr.match(/[0-9]{2}:/);
        dateStr += matches ? '' : ' 00:00:00';
        return dateStr.replace(/([0-9]{2}-[0-9]{2})-([0-9]{4})/, '$2-$1')
            .replace(/([\/-][0-9]{2,4})\ ([0-9]{2}\:[0-9]{2}\:)/, '$1T$2')
            .replace(/EDT|EST|CDT|CST|MDT|PDT|PST|UT|GMT/g, '')
            .replace(/\s*\(\)\s*/, '')
            .replace(/[\-\+][0-9]{2}:?[0-9]{2}$/, '')
            .replace(/000Z$/, '00');
    };
    DateTime.prototype.addDSTOffset = function (dateStr) {
        var date = new Date(dateStr);
        var jan = new Date(date.getFullYear(), 0, 1);
        var jul = new Date(date.getFullYear(), 6, 1);
        var stdTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
        var isDST = date.getTimezoneOffset() < stdTimezoneOffset;
        var offset = isDST ? stdTimezoneOffset - 60 : stdTimezoneOffset;
        var diff = offset >= 0 ? '-' : '+';
        return diff +
            ('0' + (offset / 60)).slice(-2) + ':' +
            ('0' + (offset % 60)).slice(-2);
    };
    ;
    DateTime = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DateTime);
    return DateTime;
}());
exports.DateTime = DateTime;
//# sourceMappingURL=datetime.js.map