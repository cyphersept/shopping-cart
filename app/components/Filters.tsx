import { Form, useSubmit } from "react-router";
import { Accordion } from "./Accordion";
import { useState } from "react";
import { SearchBar } from "./Searchbar";

const c = "mr-2";
const fsStyle = "flex flex-col gap-2";

export function SearchFilters() {
  const submit = useSubmit();
  return (
    <Form
      className="w-64 p-4 bg-violet-900/20 shadow-xl bg-gradient-to-t from-heather-100/60 via-heather-400/30 to-heather-600/40 dark:from-heather-400/60 dark:to-heather-800/20 dark:text-heather-200 dark:shadow-heather-600/30"
      onChange={(event) => submit(event.currentTarget)}
    >
      <legend className="text-2xl font-semibold py-3 p-2">Filters</legend>
      <Accordion title="Price" inner={<Price />} />
      <Accordion title="Type" inner={<Type />} />
      <Accordion title="Amount" inner={<Amount />} />
      <Accordion title="Sort By" inner={<SortBy />} />
      <Accordion title="Search" inner={<SearchBar />} defaultOpen={true} />
    </Form>
  );
}

function Price() {
  const [limit, setLimit] = useState("65");
  const max = "65";
  return (
    <fieldset>
      <label htmlFor="max-price">Price Limit: </label>
      <input
        type="range"
        name="max-price"
        id="max-price"
        max={max}
        step="5"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
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
        <input type="checkbox" className={c} name="green" />
        Green Tea
      </label>
      <label>
        <input type="checkbox" className={c} name="white" />
        White Tea
      </label>
      <label>
        <input type="checkbox" className={c} name="caffeine" />
        Caffeinated
      </label>
      <label>
        <input type="checkbox" className={c} name="no-caffeine" />
        Non-Caffeinated
      </label>
    </fieldset>
  );
}

function Amount() {
  return (
    <fieldset className={fsStyle}>
      <label>
        <input type="checkbox" className={c} name="small" />8 oz
      </label>
      <label>
        <input type="checkbox" className={c} name="medium" />
        16 oz
      </label>
      <label>
        <input type="checkbox" className={c} name="large" />
        32 oz
      </label>
      <label>
        <input type="checkbox" className={c} name="xl" />
        48 oz+
      </label>
    </fieldset>
  );
}

function SortBy() {
  return (
    <fieldset className={fsStyle}>
      <label>
        <input type="radio" className={c} name="sort-by" value="new" />
        New
      </label>
      <label>
        <input type="radio" className={c} name="sort-by" value="best" />
        Bestselling
      </label>
      <label>
        <input type="radio" className={c} name="sort-by" value="price-desc" />
        Price Descending
      </label>
      <label>
        <input type="radio" className={c} name="sort-by" value="price-asc" />
        Price Ascending
      </label>
      <label>
        <input type="radio" className={c} name="sort-by" value="a-z" />
        Alphabetical
      </label>
    </fieldset>
  );
}
