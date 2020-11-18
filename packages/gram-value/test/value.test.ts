import {
  valueOfBoolean,
  valueOfString,
  valueOfTaggedLiteral,
  iso8601Year,
  iso8601YearMonth,
  iso8601YearMonthDay,
  iso8601OrdinalDate,
  iso8601WeekOfYear,
  iso8601WeekDate,
  iso8601Time,
  iso8601LocalTime,
  iso8601Duration,
  iso8601Repeat,
  valueOfDate,
  valueOfInteger,
  valueOfMeasurement,
  valueOfDecimal,
  valueOfHexadecimal,
  valueOfOctal,
  valueOfTime,
  valueOfDuration,
} from '../src';
import { builder } from '@gram-data/gram-builder';
import { StringLiteral } from '@gram-data/gram-ast';

describe('boolean value', () => {
  it('converts {type:"boolean", value:"true"} to a primitive boolean true', () => {
    const expectedValue = true;
    const booleanLiteral = builder.boolean(expectedValue);
    expect(valueOfBoolean(booleanLiteral)).toBe(expectedValue);
  });
  it('converts {type:"boolean", value:"false"} to a primitive boolean false', () => {
    const expectedValue = false;
    const booleanLiteral = builder.boolean(expectedValue);
    expect(valueOfBoolean(booleanLiteral)).toBe(expectedValue);
  });
});

describe('string literal values', () => {
  it('converts {type:"string", value:"anything"} to a plain string', () => {
    const expectedValue = 'anything';
    const stringLiteral = builder.string(expectedValue);
    expect(valueOfString(stringLiteral)).toBe(expectedValue);
  });
  it('throws an exception if the value is missing', () => {
    expect(() => {
      valueOfString({ type: 'string' } as StringLiteral);
    }).toThrow();
  });
});

describe('tagged string literal values', () => {
  it('converts {type:"tagged", tag:"ignore", value:"text of a particular sort"} to a plain string', () => {
    const expectedValue = 'text of a particular sort';
    const templateLiteral = builder.tagged('ignore', expectedValue);
    expect(valueOfTaggedLiteral(templateLiteral)).toBe(expectedValue);
  });
});

describe('iso8601 dates with just year', () => {
  it('captures regular years of the form YYYY', () => {
    const year = '2020';
    const formatted = `${year}`;
    const capturedDate = iso8601Year.exec(formatted);
    if (capturedDate) expect(capturedDate[1]).toBe(year);
  });
  it('captures extended years of the form +YYYY', () => {
    const year = '2020';
    const formatted = `+${year}`;
    const capturedDate = iso8601Year.exec(formatted);
    if (capturedDate) expect(capturedDate[1]).toBe(formatted);
  });
  it('captures extended years of the form -YYYY', () => {
    const year = '2020';
    const formatted = `-${year}`;
    const capturedDate = iso8601Year.exec(formatted);
    if (capturedDate) expect(capturedDate[1]).toBe(formatted);
  });
  it('captures extended years of the form -YYYYYY', () => {
    const year = '000002';
    const formatted = `-${year}`;
    const capturedDate = iso8601Year.exec(formatted);
    if (capturedDate) expect(capturedDate[1]).toBe(formatted);
  });
});

describe('iso8601 dates with year and month', () => {
  it('captures dates of the form YYYY-MM', () => {
    const year = '2020';
    const month = '07';
    const formatted = `${year}-${month}`;
    const capturedDate = iso8601YearMonth.exec(formatted);
    if (capturedDate && capturedDate.length > 1) {
      expect(capturedDate[1]).toBe(year);
      expect(capturedDate[2]).toBe(month);
    } else fail(`Failed to match ${formatted}`);
  });
});

describe('iso8601 dates with year, month and day', () => {
  it('captures dates of the form YYYY-MM-DD', () => {
    const year = '2020';
    const month = '07';
    const day = '14';
    const formatted = `${year}-${month}-${day}`;
    const capturedDate = iso8601YearMonthDay.exec(formatted);
    if (capturedDate && capturedDate.length > 1) {
      expect(capturedDate[1]).toBe(year);
      expect(capturedDate[3]).toBe(month);
      expect(capturedDate[4]).toBe(day);
    } else fail(`Failed to match ${formatted}`);
  });
  it('captures dates of the form YYYYMMDD', () => {
    const year = '2020';
    const month = '07';
    const day = '14';
    const formatted = `${year}${month}${day}`;
    const capturedDate = iso8601YearMonthDay.exec(formatted);
    if (capturedDate && capturedDate.length > 1) {
      expect(capturedDate[1]).toBe(year);
      expect(capturedDate[3]).toBe(month);
      expect(capturedDate[4]).toBe(day);
    } else fail(`Failed to match ${formatted}`);
  });
});

describe('iso8601 ordinal dates with year and day of year', () => {
  it('captures dates of the form YYYY-DDD', () => {
    const year = '2020';
    const day = '014';
    const formatted = `${year}-${day}`;
    const capturedDate = iso8601OrdinalDate.exec(formatted);
    if (capturedDate && capturedDate.length > 1) {
      expect(capturedDate[1]).toBe(year);
      expect(capturedDate[2]).toBe(day);
    } else fail(`Failed to match ${formatted}`);
  });
  it('captures dates of the form YYYYDDD', () => {
    const year = '2020';
    const day = '014';
    const formatted = `${year}${day}`;
    const capturedDate = iso8601OrdinalDate.exec(formatted);
    if (capturedDate && capturedDate.length > 1) {
      expect(capturedDate[1]).toBe(year);
      expect(capturedDate[2]).toBe(day);
    } else fail(`Failed to match ${formatted}`);
  });
});

describe('iso8601 week of year', () => {
  it('captures dates of the form YYYY-Www', () => {
    const year = '2020';
    const week = '35';
    const formatted = `${year}-W${week}`;
    const capturedDate = iso8601WeekOfYear.exec(formatted);
    if (capturedDate && capturedDate.length > 1) {
      expect(capturedDate[1]).toBe(year);
      expect(capturedDate[2]).toBe(week);
    } else fail(`Failed to match ${formatted}`);
  });

  it('captures dates of the form YYYYWww', () => {
    const year = '2020';
    const week = '35';
    const formatted = `${year}W${week}`;
    const capturedDate = iso8601WeekOfYear.exec(formatted);
    if (capturedDate && capturedDate.length > 1) {
      expect(capturedDate[1]).toBe(year);
      expect(capturedDate[2]).toBe(week);
    } else fail(`Failed to match ${formatted}`);
  });
});

describe('iso8601 week date', () => {
  it('captures dates of the form YYYY-Www-D', () => {
    const year = '2020';
    const week = '35';
    const day = '5';
    const formatted = `${year}-W${week}-${day}`;
    const capturedDate = iso8601WeekDate.exec(formatted);
    if (capturedDate && capturedDate.length > 1) {
      expect(capturedDate[1]).toBe(year);
      expect(capturedDate[2]).toBe(week);
      expect(capturedDate[3]).toBe(day);
    } else fail(`Failed to match ${formatted}`);
  });

  it('captures dates of the form YYYYWwwD', () => {
    const year = '2020';
    const week = '35';
    const day = '5';
    const formatted = `${year}W${week}${day}`;
    const capturedDate = iso8601WeekDate.exec(formatted);
    if (capturedDate && capturedDate.length > 1) {
      expect(capturedDate[1]).toBe(year);
      expect(capturedDate[2]).toBe(week);
      expect(capturedDate[3]).toBe(day);
    } else fail(`Failed to match ${formatted}`);
  });
});

describe('iso8601 local time', () => {
  it('captures time of the form hh:mm', () => {
    const hour = '17';
    const minutes = '35';
    const formatted = `${hour}:${minutes}`;
    const capturedTime = iso8601LocalTime.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[1]).toBe(hour);
      expect(capturedTime[2]).toBe(minutes);
    } else fail(`Failed to match ${formatted}`);
  });
  it('captures time of the form hh:mm:ss', () => {
    const hour = '17';
    const minutes = '35';
    const seconds = '42';
    const formatted = `${hour}:${minutes}:${seconds}`;
    const capturedTime = iso8601LocalTime.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[1]).toBe(hour);
      expect(capturedTime[2]).toBe(minutes);
      expect(capturedTime[4]).toBe(seconds);
    } else fail(`Failed to match ${formatted}`);
  });
  it('captures time of the form hh:mm:ss.sss', () => {
    const hour = '17';
    const minutes = '35';
    const seconds = '42.123';
    const formatted = `${hour}:${minutes}:${seconds}`;
    const capturedTime = iso8601LocalTime.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[1]).toBe(hour);
      expect(capturedTime[2]).toBe(minutes);
      expect(capturedTime[4]).toBe(seconds);
    } else fail(`Failed to match ${formatted}`);
  });
});

describe('iso8601 time with timezone', () => {
  it('captures time of the form hh:mm:ssZ', () => {
    const hour = '17';
    const minutes = '35';
    const seconds = '42';
    const timezone = 'Z';
    const formatted = `${hour}:${minutes}:${seconds}${timezone}`;
    const capturedTime = iso8601Time.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[1]).toBe(hour);
      expect(capturedTime[2]).toBe(minutes);
      expect(capturedTime[3]).toBe(seconds);
      expect(capturedTime[5]).toBe(timezone);
    } else fail(`Failed to match ${formatted}`);
  });
  it('captures time of the form hh:mm:ss.sssZ', () => {
    const hour = '17';
    const minutes = '35';
    const seconds = '42.123';
    const timezone = 'Z';
    const formatted = `${hour}:${minutes}:${seconds}${timezone}`;
    const capturedTime = iso8601Time.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[1]).toBe(hour);
      expect(capturedTime[2]).toBe(minutes);
      expect(capturedTime[3]).toBe(seconds);
      expect(capturedTime[5]).toBe(timezone);
    } else fail(`Failed to match ${formatted}`);
  });

  it('captures time of the form hh:mm:ss−hh', () => {
    const hour = '17';
    const minutes = '35';
    const seconds = '42';
    const timezone = '+01';
    const formatted = `${hour}:${minutes}:${seconds}${timezone}`;
    const capturedTime = iso8601Time.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[1]).toBe(hour);
      expect(capturedTime[2]).toBe(minutes);
      expect(capturedTime[3]).toBe(seconds);
      expect(capturedTime[5]).toBe(timezone);
    } else fail(`Failed to match ${formatted}`);
  });
  it('captures time of the form hh:mm:ss.sss−hh', () => {
    const hour = '17';
    const minutes = '35';
    const seconds = '42.123';
    const timezone = '+01';
    const formatted = `${hour}:${minutes}:${seconds}${timezone}`;
    const capturedTime = iso8601Time.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[1]).toBe(hour);
      expect(capturedTime[2]).toBe(minutes);
      expect(capturedTime[3]).toBe(seconds);
      expect(capturedTime[5]).toBe(timezone);
    } else fail(`Failed to match ${formatted}`);
  });

  it('captures time of the form hh:mm:ss−hh:mm', () => {
    const hour = '17';
    const minutes = '35';
    const seconds = '42';
    const timezone = '-08:00';
    const formatted = `${hour}:${minutes}:${seconds}${timezone}`;
    const capturedTime = iso8601Time.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[1]).toBe(hour);
      expect(capturedTime[2]).toBe(minutes);
      expect(capturedTime[3]).toBe(seconds);
      expect(capturedTime[5]).toBe(timezone);
    } else fail(`Failed to match ${formatted}`);
  });
  it('captures time of the form hh:mm:ss.sss−hh:mm', () => {
    const hour = '17';
    const minutes = '35';
    const seconds = '42.123';
    const timezone = '-08:00';
    const formatted = `${hour}:${minutes}:${seconds}${timezone}`;
    const capturedTime = iso8601Time.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[1]).toBe(hour);
      expect(capturedTime[2]).toBe(minutes);
      expect(capturedTime[3]).toBe(seconds);
      expect(capturedTime[5]).toBe(timezone);
    } else fail(`Failed to match ${formatted}`);
  });

  it('captures time of the form hh:mm:ss+hh:mm', () => {
    const hour = '17';
    const minutes = '35';
    const seconds = '42';
    const timezone = '+05:30';
    const formatted = `${hour}:${minutes}:${seconds}${timezone}`;
    const capturedTime = iso8601Time.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[1]).toBe(hour);
      expect(capturedTime[2]).toBe(minutes);
      expect(capturedTime[3]).toBe(seconds);
      expect(capturedTime[5]).toBe(timezone);
    } else fail(`Failed to match ${formatted}`);
  });
  it('captures time of the form hh:mm:ss.sss+hh:mm', () => {
    const hour = '17';
    const minutes = '35';
    const seconds = '42.123';
    const timezone = '+05:30';
    const formatted = `${hour}:${minutes}:${seconds}${timezone}`;
    const capturedTime = iso8601Time.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[1]).toBe(hour);
      expect(capturedTime[2]).toBe(minutes);
      expect(capturedTime[3]).toBe(seconds);
      expect(capturedTime[5]).toBe(timezone);
    } else fail(`Failed to match ${formatted}`);
  });
});

describe('iso8601 durations', () => {
  it('captures duration of the form PnYnMnDTnHnMnS', () => {
    const years = '1';
    const months = '2';
    const days = '3';
    const hours = '4';
    const minutes = '5';
    const seconds = '6';
    const formatted = `P${years}Y${months}M${days}DT${hours}H${minutes}M${seconds}S`;
    const capturedTime = iso8601Duration.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[2]).toBe(years);
      expect(capturedTime[4]).toBe(months);
      expect(capturedTime[6]).toBe(days);
      expect(capturedTime[9]).toBe(hours);
      expect(capturedTime[11]).toBe(minutes);
      expect(capturedTime[13]).toBe(seconds);
    } else fail(`Failed to match ${formatted}`);
  });
  it('captures duration of the form PnY', () => {
    const years = '1';
    const formatted = `P${years}Y`;
    const capturedTime = iso8601Duration.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[2]).toBe(years);
    } else fail(`Failed to match ${formatted}`);
  });
  it('captures duration of the form PnM', () => {
    const months = '2';
    const formatted = `P${months}M`;
    const capturedTime = iso8601Duration.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[4]).toBe(months);
    } else fail(`Failed to match ${formatted}`);
  });
  it('captures duration of the form PnD', () => {
    const days = '3';
    const formatted = `P${days}D`;
    const capturedTime = iso8601Duration.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[6]).toBe(days);
    } else fail(`Failed to match ${formatted}`);
  });
  it('captures duration of the form PTnHnMnS', () => {
    const hours = '4';
    const minutes = '5';
    const seconds = '6';
    const formatted = `PT${hours}H${minutes}M${seconds}S`;
    const capturedTime = iso8601Duration.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[9]).toBe(hours);
      expect(capturedTime[11]).toBe(minutes);
      expect(capturedTime[13]).toBe(seconds);
    } else fail(`Failed to match ${formatted}`);
  });
  it('captures duration of the form PTnH', () => {
    const hours = '4';
    const formatted = `PT${hours}H`;
    const capturedTime = iso8601Duration.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[9]).toBe(hours);
    } else fail(`Failed to match ${formatted}`);
  });
  it('captures duration of the form PTnM', () => {
    const minutes = '5';
    const formatted = `PT${minutes}M`;
    const capturedTime = iso8601Duration.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[11]).toBe(minutes);
    } else fail('Failed to match RegEx');
  });
  it('captures duration of the form PTnS', () => {
    const seconds = '6';
    const formatted = `PT${seconds}S`;
    const capturedTime = iso8601Duration.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[13]).toBe(seconds);
    } else fail(`Failed to match ${formatted}`);
  });
  it('captures duration of the form PnDTnH', () => {
    const days = '3';
    const hours = '4';
    const formatted = `P${days}DT${hours}H`;
    const capturedTime = iso8601Duration.exec(formatted);
    if (capturedTime && capturedTime.length > 1) {
      expect(capturedTime[6]).toBe(days);
      expect(capturedTime[9]).toBe(hours);
    } else fail(`Failed to match ${formatted}`);
  });
});

describe('iso8601 repeat interval', () => {
  it('captures unbounded repetition with the form R', () => {
    const formatted = `R`;
    const capturedRepetition = iso8601Repeat.exec(formatted);
    if (capturedRepetition) {
      expect(capturedRepetition[1]).toBe('');
    } else fail(`Failed to match ${formatted}`);
  });
  it('captures bounded repetition with the form Rn', () => {
    const repetions = 12;
    const formatted = `R${repetions}`;
    const capturedRepetition = iso8601Repeat.exec(formatted);
    if (capturedRepetition) {
      expect(capturedRepetition[1]).toBe(`${repetions}`);
    } else fail(`Failed to match ${formatted}`);
  });
});

describe('tagged date literal values', () => {
  it('converts {type:"tagged", tag:"date", value:"2020-07-04"} to a Date', () => {
    const expectedValue = {
      year: '2020',
      month: '07',
      date: '04',
    };
    const dateLiteral = builder.date(
      `${expectedValue.year}-${expectedValue.month}-${expectedValue.date}`
    );
    const receivedValue = valueOfDate(dateLiteral);
    expect(receivedValue.getFullYear()).toBe(
      Number.parseInt(expectedValue.year)
    );
    expect(receivedValue.getMonth()).toBe(Number.parseInt(expectedValue.month));
    expect(receivedValue.getDate()).toBe(Number.parseInt(expectedValue.date));
  });
  it('converts {type:"tagged", tag:"date", value:"2020"} to a Date', () => {
    const expectedValue = {
      year: '2020',
    };
    const dateLiteral = builder.year(`${expectedValue.year}`);
    const receivedValue = valueOfDate(dateLiteral);
    expect(receivedValue.getFullYear()).toBe(
      Number.parseInt(expectedValue.year)
    );
  });
  it('converts {type:"tagged", tag:"date", value:"2020-07"} to a Date', () => {
    const expectedValue = {
      year: '2020',
      month: '07',
    };
    const dateLiteral = builder.date(
      `${expectedValue.year}-${expectedValue.month}`
    );
    const receivedValue = valueOfDate(dateLiteral);
    expect(receivedValue.getFullYear()).toBe(
      Number.parseInt(expectedValue.year)
    );
    expect(receivedValue.getMonth()).toBe(Number.parseInt(expectedValue.month));
  });
  it('fails to convert an ordinal date of {type:"tagged", tag:"date", value:"2020-014"} to a Date', () => {
    const expectedValue = {
      year: '2020',
      day: '014',
    };
    const dateLiteral = builder.date(
      `${expectedValue.year}-${expectedValue.day}`
    );
    expect(() => {
      valueOfDate(dateLiteral);
    }).toThrow();
  });
  it('fails to convert a week-of-year date of {type:"tagged", tag:"date", value:"2020-W35"} to a Date', () => {
    const expectedValue = {
      year: '2020',
      week: '35',
    };
    const dateLiteral = builder.date(
      `${expectedValue.year}-W${expectedValue.week}`
    );
    expect(() => {
      valueOfDate(dateLiteral);
    }).toThrow();
  });
  it('fails to convert a week date of {type:"tagged", tag:"date", value:"2020-W35-4"} to a Date', () => {
    const expectedValue = {
      year: '2020',
      week: '35',
      dayOfWeek: '5',
    };
    const dateLiteral = builder.date(
      `${expectedValue.year}-W${expectedValue.week}-${expectedValue.dayOfWeek}`
    );
    expect(() => {
      valueOfDate(dateLiteral);
    }).toThrow();
  });
});

describe('tagged time literal values', () => {
  it('converts {type:"tagged", tag:"time", value:"12:00:00"} to milliseconds', () => {
    const expectedValue = {
      hours: '12',
      minutes: '00',
      seconds: '00',
      asMillis: 43200000,
    };
    const timeLiteral = builder.time(
      `${expectedValue.hours}:${expectedValue.minutes}:${expectedValue.seconds}`
    );
    const receivedValue = valueOfTime(timeLiteral);
    expect(receivedValue.getTime()).toBe(expectedValue.asMillis);
  });
  it('converts {type:"tagged", tag:"time", value:"12:42:09"} to milliseconds', () => {
    const expectedValue = {
      hours: '12',
      minutes: '42',
      seconds: '09',
      asMillis: 45729000,
    };
    const timeLiteral = builder.time(
      `${expectedValue.hours}:${expectedValue.minutes}:${expectedValue.seconds}`
    );
    const receivedValue = valueOfTime(timeLiteral);
    expect(receivedValue.getTime()).toBe(expectedValue.asMillis);
  });
  it('converts {type:"tagged", tag:"time", value:"12:42"} to milliseconds', () => {
    const expectedValue = {
      hours: '12',
      minutes: '42',
      asMillis: 45720000,
    };
    const timeLiteral = builder.time(
      `${expectedValue.hours}:${expectedValue.minutes}`
    );
    const receivedValue = valueOfTime(timeLiteral);
    expect(receivedValue.getTime()).toBe(expectedValue.asMillis);
  });
  it('converts {type:"tagged", tag:"time", value:"12:42:09.123"} to milliseconds', () => {
    const expectedValue = {
      hours: '12',
      minutes: '42',
      seconds: '09.123',
      asMillis: 45729123,
    };
    const timeLiteral = builder.time(
      `${expectedValue.hours}:${expectedValue.minutes}:${expectedValue.seconds}`
    );
    const receivedValue = valueOfTime(timeLiteral);
    expect(receivedValue.getTime()).toBe(expectedValue.asMillis);
  });
  it('converts {type:"tagged", tag:"time", value:"13:42:09Z"} to milliseconds', () => {
    const expectedValue = {
      hours: '13',
      minutes: '42',
      seconds: '09',
      tz: 'Z',
      asMillis: 49329000,
    };
    const timeLiteral = builder.time(
      `${expectedValue.hours}:${expectedValue.minutes}:${expectedValue.seconds}${expectedValue.tz}`
    );
    const receivedValue = valueOfTime(timeLiteral);
    expect(receivedValue.getTime()).toBe(expectedValue.asMillis);
  });
  it('converts {type:"tagged", tag:"time", value:"14:42:09+01:00"} to milliseconds', () => {
    const expectedValue = {
      hours: '14',
      minutes: '42',
      seconds: '09',
      tz: '+01:00',
      asMillis: 49329000,
    };
    const timeLiteral = builder.time(
      `${expectedValue.hours}:${expectedValue.minutes}:${expectedValue.seconds}${expectedValue.tz}`
    );
    const receivedValue = valueOfTime(timeLiteral);
    expect(receivedValue.getTime()).toBe(expectedValue.asMillis);
  });
  it('converts {type:"tagged", tag:"time", value:"20:12:09+05:30"} to milliseconds', () => {
    const expectedValue = {
      hours: '19',
      minutes: '12',
      seconds: '09',
      tz: '+05:30',
      asMillis: 49329000,
    };
    const timeLiteral = builder.time(
      `${expectedValue.hours}:${expectedValue.minutes}:${expectedValue.seconds}${expectedValue.tz}`
    );
    const receivedValue = valueOfTime(timeLiteral);
    expect(receivedValue.getTime()).toBe(expectedValue.asMillis);
  });
  it('converts {type:"tagged", tag:"time", value:"12:12:09-01:30"} to milliseconds', () => {
    const expectedValue = {
      hours: '12',
      minutes: '12',
      seconds: '09',
      tz: '-01:30',
      asMillis: 49329000,
    };
    const timeLiteral = builder.time(
      `${expectedValue.hours}:${expectedValue.minutes}:${expectedValue.seconds}${expectedValue.tz}`
    );
    const receivedValue = valueOfTime(timeLiteral);
    expect(receivedValue.getTime()).toBe(expectedValue.asMillis);
  });
});
describe('tagged duration literal values', () => {
  it('value of duration PnYnMnDTnHnMnS', () => {
    const years = '1';
    const months = '2';
    const days = '3';
    const hours = '4';
    const minutes = '5';
    const seconds = '6';
    const expectedMillis = 36993906000;
    const durationLiteral = builder.duration(
      `P${years}Y${months}M${days}DT${hours}H${minutes}M${seconds}S`
    );
    const receivedValue = valueOfDuration(durationLiteral);
    expect(receivedValue.getTime()).toBe(expectedMillis);
  });
  it('value of duration PTnS', () => {
    const seconds = '12';
    const expectedMillis = 12000;
    const durationLiteral = builder.duration(`PT${seconds}S`);
    const receivedValue = valueOfDuration(durationLiteral);
    expect(receivedValue.getTime()).toBe(expectedMillis);
  });
  it('value of duration PTnM', () => {
    const minutes = '5';
    const expectedMillis = 300000;
    const durationLiteral = builder.duration(`PT${minutes}M`);
    const receivedValue = valueOfDuration(durationLiteral);
    expect(receivedValue.getTime()).toBe(expectedMillis);
  });
});

describe('integer values', () => {
  it('converts {type:"integer", value:"42"} to a primitive number', () => {
    const expectedValue = 42;
    const astLiteral = builder.integer(expectedValue);
    expect(valueOfInteger(astLiteral)).toBe(expectedValue);
  });

  it('converts a range of integer literals to primitive js numbers', () => {
    let sum = 0;
    for (
      let x = 0, y = 1;
      sum < Number.MAX_SAFE_INTEGER;
      x = y, y = sum, sum = x + y
    ) {
      const astLiteral = builder.integer(sum);
      expect(valueOfInteger(astLiteral)).toBe(sum);
    }
  });
});

describe('measurement values', () => {
  it('converts {type:"measurement", value:"42px"} to a primitive number', () => {
    const expectedValue = 42;
    const astLiteral = builder.measurement('px', expectedValue);
    expect(valueOfMeasurement(astLiteral)).toBe(expectedValue);
  });

  it('converts a range of measurement literals to primitive js numbers', () => {
    let sum = 0;
    for (
      let x = 0, y = 1;
      sum < Number.MAX_SAFE_INTEGER;
      x = y, y = sum, sum = x + y
    ) {
      const astLiteral = builder.measurement('px', sum);
      expect(valueOfMeasurement(astLiteral)).toBe(sum);
    }
  });
});

describe('decimal values', () => {
  it('converts {type:"decimal", value:"3.1495"} to a primitive number', () => {
    const expectedValue = 3.1495;
    const astLiteral = builder.decimal(expectedValue);
    expect(valueOfDecimal(astLiteral)).toBe(expectedValue);
  });

  it('converts a range of decimal literals to primitive js numbers', () => {
    let product = 1.1;
    for (
      let x = 1.3, y = 5.3;
      product < Number.MAX_SAFE_INTEGER;
      x = y, y = product, product = x * y
    ) {
      const astLiteral = builder.decimal(product);
      expect(valueOfDecimal(astLiteral)).toBe(product);
    }
  });
});

describe('hexadecimal values', () => {
  it('converts {type:"hexadecimal", value:"42"} to a primitive number', () => {
    const expectedValue = 42;
    const astLiteral = builder.hexadecimal(expectedValue);
    expect(valueOfHexadecimal(astLiteral)).toBe(expectedValue);
  });

  it('converts a range of measurement literals to primitive js numbers', () => {
    let sum = 0;
    for (
      let x = 0, y = 1;
      sum < Number.MAX_SAFE_INTEGER;
      x = y, y = sum, sum = x + y
    ) {
      const astLiteral = builder.hexadecimal(sum);
      expect(valueOfHexadecimal(astLiteral)).toBe(sum);
    }
  });
});

describe('octal values', () => {
  it('converts {type:"octal", value:"042"} to a primitive number', () => {
    const expectedValue = 42;
    const astLiteral = builder.octal(expectedValue);
    expect(valueOfOctal(astLiteral)).toBe(expectedValue);
  });

  it('converts a range of octal literals to primitive js numbers', () => {
    let sum = 0;
    for (
      let x = 0, y = 1;
      sum < Number.MAX_SAFE_INTEGER;
      x = y, y = sum, sum = x + y
    ) {
      const astLiteral = builder.octal(sum);
      expect(valueOfOctal(astLiteral)).toBe(sum);
    }
  });
});
