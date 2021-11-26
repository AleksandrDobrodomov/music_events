import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import MusicEvent from "./MusicEvent";
import { Provider } from "react-redux";
import { store } from "../../../app/store";

describe("Test music event", () => {
  test("Make sure the Music Event detials comp is showed when eventId and selectedId equal", async () => {
    // Render the MusicEvents
    const { getByTestId } = render(
      <Provider store={store}>
        <MusicEvent
          eventId={"Z698xZ8KZ17Geuy"}
          imgUrl={"test"}
          name={"test"}
          selectedDetailsId={"Z698xZ8KZ17Geuy"}
        />
      </Provider>
    );
    window.HTMLElement.prototype.scrollIntoView = function () {};
    const book1 = await waitFor(() => getByTestId("event-box-child"));
    expect(book1).toBeInTheDocument();
  });
});
