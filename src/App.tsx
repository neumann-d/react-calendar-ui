import React, { useEffect, useState } from "react";

import Calendar from "./calendar/Calendar";
import { Item } from "./calendar/CalendarItem";

function createRandomItemColor() {
  return (
    "rgb(" +
    (Math.floor(Math.random() * 175) + 80) +
    ", " +
    (Math.floor(Math.random() * 175) + 80) +
    ", " +
    (Math.floor(Math.random() * 175) + 80) +
    ")"
  );
}

const App = () => {
  const [items, setItems] = useState<Item[]>([]);
  const today = new Date();

  useEffect(() => {
    // load item data from api (here from local json)
    const loadItems = async () => {
      const data: any = await fetch("/data.json");
      const dataJson = data && (await data.json());
      if (dataJson && dataJson.items) {
        dataJson.items.forEach((item: any) => {
          item.color = createRandomItemColor();
        });
        setItems(dataJson.items);
      }
    };
    if (items.length === 0) {
      loadItems();
    }
  }, [items]);

  return <Calendar items={items} initialDate={today} />;
};

export default App;
