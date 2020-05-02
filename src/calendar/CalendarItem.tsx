import * as React from "react";

import "./CalendarItem.css";

export interface Item {
    id: number;
    start: string;
    finish: string;
    name: string;
    color: string;
  }

interface CalendarItemProps {
  color: string;
  title: string;
}

const CalendarItem: React.FC<CalendarItemProps> = ({ color, title }) => {
  return (
    <div className="Calendar-item" style={{ backgroundColor: color }}>
        {title}
    </div>
  );
};

export default CalendarItem;
