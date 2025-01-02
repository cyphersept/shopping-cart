import { Form, useSubmit } from "react-router";
import { Accordion } from "./Accordion";
import { useRef, useState } from "react";
import { SearchBar } from "./Searchbar";
import { SlideButton } from "./Button";

const c = "mr-2";
const fsStyle = "flex flex-col gap-2";

export function SearchFilters() {
  const post = useSubmit();
  const formRef = useRef<HTMLFormElement | null>(null);

  // Prevent submitting empty form fields by disabling then re-enabling them
  const submit = (form: HTMLFormElement | null) => {
    if (!form) return;
    disableEmptyInputs(form);
    post(form, { replace: true });
    enableEmptyInputs(form);
  };
  const disableEmptyInputs = (form: HTMLFormElement) => {
    for (let i = 0; i < form.elements.length; i++) {
      if (form.elements[i] instanceof HTMLInputElement) {
        const input = form.elements[i] as HTMLInputElement;
        input.disabled = input.value == "";
      }
    }
  };
  const enableEmptyInputs = (form: HTMLFormElement) => {
    for (let i = 0; i < form.elements.length; i++) {
      if (form.elements[i] instanceof HTMLInputElement) {
        const input = form.elements[i] as HTMLInputElement;
        input.disabled = false;
      }
    }
  };
  return (
    <Form
      className="w-64 p-4 bg-violet-900/20 shadow-xl bg-gradient-to-t from-heather-100/60 via-heather-400/30 to-heather-600/40 dark:from-heather-400/60 dark:to-heather-800/20 dark:text-heather-100 dark:shadow-heather-600/30"
      onChange={(event) => submit(event.currentTarget)}
      ref={formRef}
    >
      <legend className="text-2xl font-semibold py-3 p-2">Filters</legend>
      <Accordion title="Price" inner={<Price />} />
      <Accordion title="Type" inner={<Type />} />
      <Accordion title="Amount" inner={<Amount />} />
      <Accordion title="Sort By" inner={<SortBy />} />
      <Accordion title="Search" inner={<SearchBar />} open={true} />
      <div className="p-1 pb-2">
        <SlideButton
          classes="w-full !p-[0.5em] !text-lg"
          onClick={() => {
            formRef.current?.reset();
            submit(formRef.current);
          }}
        >
          <span>Reset</span>
        </SlideButton>
      </div>
    </Form>
  );
}

function Price() {
  const [limit, setLimit] = useState("100");
  const max = "100";
  return (
    <fieldset>
      <label htmlFor="max">Price Limit: </label>
      <input
        type="range"
        name="max"
        id="max"
        max={max}
        step="5"
        onChange={(e) => setLimit(e.target.value)}
        defaultValue={max}
        className="w-full"
      />

      <div className="text-center text-heather-800 dark:text-slate-300">
        $0 — {limit == max ? "Unlimited" : "$" + limit}
      </div>
    </fieldset>
  );
}

function Type() {
  return (
    <fieldset className={fsStyle}>
      <label>
        <input type="radio" className={c} name="type" value="green" />
        Green Teas
      </label>
      <label>
        <input type="radio" className={c} name="type" value="white" />
        White Teas
      </label>
      <label>
        <input type="radio" className={c} name="type" value="black" />
        Black Teas
      </label>
      <label>
        <input type="radio" className={c} name="type" value="rooibos" />
        Rooibos Teas
      </label>
      <label>
        <input type="radio" className={c} name="type" value="oolong" />
        Oolong Teas
      </label>
      <label>
        <input type="radio" className={c} name="type" value="tisane" />
        Tisanes
      </label>
    </fieldset>
  );
}

function Amount() {
  return (
    <fieldset className={fsStyle}>
      <label>
        <input type="checkbox" className={c} name="sm" />1 oz / 1.5 oz
      </label>
      <label>
        <input type="checkbox" className={c} name="md" />2 oz / 3 oz
      </label>
      <label>
        <input type="checkbox" className={c} name="lg" />4 oz
      </label>
      <label>
        <input type="checkbox" className={c} name="xl" />8 oz
      </label>
    </fieldset>
  );
}

function SortBy() {
  return (
    <fieldset className={fsStyle}>
      <label>
        <input type="radio" className={c} name="sort" value="new" />
        New
      </label>
      <label>
        <input type="radio" className={c} name="sort" value="best" />
        Bestselling
      </label>
      <label>
        <input type="radio" className={c} name="sort" value="desc" />
        Price Descending
      </label>
      <label>
        <input type="radio" className={c} name="sort" value="asc" />
        Price Ascending
      </label>
      <label>
        <input type="radio" className={c} name="sort" value="az" />
        Alphabetical
      </label>
    </fieldset>
  );
}
