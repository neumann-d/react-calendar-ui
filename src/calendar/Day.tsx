import * as React from "react";

import "./Day.css";
import CalendarItem, { Item } from "./CalendarItem";

interface DayProps {
  dayId: string;
  isSelected?: boolean;
  isSmall?: boolean;
  onClick?: () => void;
  items?: Item[];
}

const Day: React.FC<DayProps> = ({
  dayId,
  isSelected,
  isSmall,
  onClick,
  items,
  children,
}) => {
  const classes = `Calendar-day${isSelected ? " Calendar-day-selected " : ""}${isSmall? " Calendar-day-small": ""}`;

  return (
    <div className={classes} onClick={onClick}>
      {children}
      {items &&
        items.map((item: Item) => (
          <CalendarItem
            key={`${dayId}-${item.id}-details`}
            color={item.color}
            title={`${item.id}: ${item.name}`}
          />
        ))}
      {isSelected && (
        <div className="Calendar-day-details">
          {items &&
            items.map((item: Item) => (
              <div key={`${dayId}-${item.id}`}>
                <CalendarItem
                  color={item.color}
                  title={`${item.id}: ${item.name}`}
                />
                <ul>
                  <li>Start: {item.start}</li>
                  <li>Finish: {item.finish}</li>
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Day;
