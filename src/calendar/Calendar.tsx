import * as React from "react";
import { useState, useEffect } from "react";

import "./Calendar.css";
import { getStartWeekDayOfMonth, isLeapYear, isDateInDayRange } from "./utils";
import { Item } from "./CalendarItem";
import Day from "./Day";

// local used ItemFilter type
interface ItemFilter {
  [key: string]: {
    id: number;
    value: string;
    enabled: boolean;
  };
}

// calendar constants
const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_OF_THE_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = ({
  items,
  initialDate,
}: {
  items: Item[];
  initialDate: Date;
}) => {
  // states
  const [date, setDate] = useState(initialDate);
  const [itemFilters, setItemFilters] = useState<ItemFilter>({});

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const startWeekDay = getStartWeekDayOfMonth(date);

  useEffect(() => {
    // set initial filters
    const loadItemFilters = () => {
      const filters = { ...itemFilters };
      items.forEach((item: Item) => {
        if (!(item.name in itemFilters)) {
          filters[item.name] = {
            id: item.id,
            value: item.name,
            enabled: true,
          };
        }
      });
      setItemFilters(filters);
    };

    if (Object.keys(itemFilters).length === 0) {
      loadItemFilters();
    }
  }, [date, items, itemFilters]);

  const filteredItems = items.filter(
    (item: Item) => item.name in itemFilters && itemFilters[item.name].enabled
  );

  const changeFilter = (filter: string) => {
    const filters = { ...itemFilters };
    filters[filter].enabled = !filters[filter].enabled;
    setItemFilters(filters);
  };

  // prepare items for each day, check if day is in time range of rented item
  const setDayItems = (d: number) => {
    const day = new Date(date.getFullYear(), date.getMonth(), d, 12);
    return filteredItems.filter((item) =>
      isDateInDayRange(day, new Date(item.start), new Date(item.finish))
    );
  };

  const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;

  return (
    <div className="Calendar">
      <div className="Calendar-header">
        <button
          id="prev"
          className="Calendar-header-menu-item Calendar-header-menu-item-button"
          onClick={() => setDate(new Date(year, month - 1, 1))}
        >
          Prev
        </button>
        <div className="Calendar-header-menu-item">
          {MONTHS[month]} {year}
        </div>
        <button
          id="next"
          className="Calendar-header-menu-item Calendar-header-menu-item-button"
          onClick={() => setDate(new Date(year, month + 1, 1))}
        >
          Next
        </button>
        <div className="Calendar-header-filter-box">
          Filters:
          {itemFilters &&
            Object.keys(itemFilters).map((filter) => {
              return (
                <button
                  key={filter}
                  id={`filter-${itemFilters[filter].id}`}
                  className="Calendar-item-filter"
                  style={{
                    color: itemFilters[filter].enabled ? "#000" : "#eee",
                  }}
                  onClick={() => changeFilter(filter)}
                >
                  {filter}
                </button>
              );
            })}
        </div>
      </div>
      <div className="Calendar-body">
        {DAYS_OF_THE_WEEK.map((d) => (
          <Day dayId={`${d}`} key={d} isSmall>
            <strong>{d}</strong>
          </Day>
        ))}
        {Array(days[month] + startWeekDay)
          .fill(null)
          .map((_, index) => {
            const d = index - (startWeekDay - 1);
            return (
              <Day
                key={`${month}-${index}`}
                dayId={`${month}-${index}`}
                isSelected={d === day}
                onClick={() => {
                  if (d > 0) {
                    setDate(new Date(year, month, d));
                  }
                }}
                items={d > 0 ? setDayItems(d) : []}
              >
                <span>{d > 0 ? d : ""}</span>
              </Day>
            );
          })}
      </div>
    </div>
  );
};

export default Calendar;
