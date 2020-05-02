import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Calendar from "../calendar/Calendar";
import { Item } from "../calendar/CalendarItem";

test("renders a 'Party' event in Calendar's month view of May 2020", () => {
  const items: Item[] = [
    {
      start: "2020-05-20T00:00:00.000Z",
      finish: "2020-05-30T00:00:00.000Z",
      name: "Party",
      id: 1,
      color: "#aaffdd",
    },
  ];
  const initialDate = new Date("2020-05-25T00:00:00.000Z");

  const { getAllByText } = render(
    <Calendar items={items} initialDate={initialDate} />
  );
  const itemElement = getAllByText("1: Party");
  expect(itemElement[0]).toBeInTheDocument();
});

test("test that 'Party' event is not rendered in Calendar's month view of May 2020, because not in time range", () => {
  const items: Item[] = [
    {
      start: "2020-03-20T00:00:00.000Z",
      finish: "2020-03-30T00:00:00.000Z",
      name: "Party",
      id: 1,
      color: "#aaffdd",
    },
  ];
  const initialDate = new Date("2020-05-25T00:00:00.000Z");

  const { queryByText } = render(
    <Calendar items={items} initialDate={initialDate} />
  );
  const itemElement = queryByText("1: Pary");
  expect(itemElement).toBeNull();
});

test("test that 'Party' event is not rendered in Calendar's month view of May 2020, because event name 'Party' filter is deactivated", () => {
  const items: Item[] = [
    {
      start: "2020-05-20T00:00:00.000Z",
      finish: "2020-05-30T00:00:00.000Z",
      name: "Party",
      id: 1,
      color: "#aaffdd",
    },
  ];
  const initialDate = new Date("2020-05-25T00:00:00.000Z");

  const { queryByText } = render(
    <Calendar items={items} initialDate={initialDate} />
  );

  const submitButton = document.getElementById('filter-1') || document.createElement('button');
  fireEvent.click(submitButton);

  const itemElement = queryByText("1: Party");
  expect(itemElement).toBeNull();
});

test("test that 'Party' event is rendered in Calendar's month view of May 2020, because event name 'Party' filter is deactivated and then activated", () => {
  const items: Item[] = [
    {
      start: "2020-05-20T00:00:00.000Z",
      finish: "2020-05-30T00:00:00.000Z",
      name: "Party",
      id: 1,
      color: "#aaffdd",
    },
  ];
  const initialDate = new Date("2020-05-25T00:00:00.000Z");

  const { getAllByText } = render(
    <Calendar items={items} initialDate={initialDate} />
  );

  const submitButton = document.getElementById('filter-1') || document.createElement('button');
  fireEvent.click(submitButton);
  fireEvent.click(submitButton);

  const itemElement = getAllByText("1: Party");
  expect(itemElement[0]).toBeInTheDocument();
});
