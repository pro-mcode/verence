"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  getArrayParam,
  removeParams,
  toggleArrayParam,
} from "@/lib/utils/query";

const GENDERS = ["men", "women", "unisex"] as const;
const SIZES = ["XS", "S", "M", "L", "XL"] as const;
const COLORS = ["black", "white", "red", "green", "blue", "grey"] as const;
const PRICES = [
  { id: "0-50", label: "$0 - $50" },
  { id: "50-100", label: "$50 - $100" },
  { id: "100-150", label: "$100 - $150" },
  { id: "150-", label: "Over $150" },
] as const;

type GroupKey = "gender" | "size" | "color" | "price";

/* ------------------------ Group Component ------------------------ */
interface GroupProps {
  title: string;
  k: GroupKey;
  expanded: boolean;
  onToggle: (key: GroupKey) => void;
  children: React.ReactNode;
}

function Group({ title, k, expanded, onToggle, children }: GroupProps) {
  return (
    <div className="border-b border-light-300 py-4">
      <button
        className="flex w-full items-center justify-between text-body-medium text-dark-900"
        onClick={() => onToggle(k)}
        aria-expanded={expanded}
        aria-controls={`${k}-section`}
      >
        <span>{title}</span>
        <span className="text-caption text-dark-700">
          {expanded ? "−" : "+"}
        </span>
      </button>
      <div id={`${k}-section`} className={expanded ? "mt-3 block" : "hidden"}>
        {children}
      </div>
    </div>
  );
}

/* ------------------------ Filters ------------------------ */
export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = useMemo(() => `?${searchParams.toString()}`, [searchParams]);

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<GroupKey, boolean>>({
    gender: true,
    size: true,
    color: true,
    price: true,
  });

  const activeCounts = {
    gender: getArrayParam(search, "gender").length,
    size: getArrayParam(search, "size").length,
    color: getArrayParam(search, "color").length,
    price: getArrayParam(search, "price").length,
  };

  /* Close mobile drawer when filters change */
  //   useEffect(() => {
  //     setOpen(false);
  //   }, [search]);

  const toggleExpanded = (key: GroupKey) => {
    setExpanded((s) => ({ ...s, [key]: !s[key] }));
  };

  const onToggle = (key: GroupKey, value: string) => {
    const url = toggleArrayParam(pathname, search, key, value);
    router.push(url, { scroll: false });
    setOpen(false);
  };

  const clearAll = () => {
    const url = removeParams(pathname, search, [
      "gender",
      "size",
      "color",
      "price",
      "page",
    ]);
    router.push(url, { scroll: false });
  };

  /* ------------------------ Checkbox Renderer ------------------------ */
  const renderCheckboxList = (key: GroupKey, options: readonly string[]) => {
    const isTwoColumn = key === "size" || key === "color";

    if (isTwoColumn) {
      // Max 3 items per column
      const columns: string[][] = [];
      for (let i = 0; i < options.length; i += 3) {
        columns.push(options.slice(i, i + 3));
      }

      return (
        <div className="grid grid-cols-2 gap-3">
          {columns.map((col, i) => (
            <ul key={i} className="space-y-2">
              {col.map((opt) => {
                const checked = getArrayParam(search, key).includes(opt);

                return (
                  <li key={opt} className="flex items-center gap-2">
                    <input
                      id={`${key}-${opt}`}
                      type="checkbox"
                      className="h-4 w-4 accent-dark-900"
                      checked={checked}
                      onChange={() => onToggle(key, opt)}
                    />
                    <label
                      htmlFor={`${key}-${opt}`}
                      className={`text-body ${
                        key === "color" ? "capitalize" : ""
                      }`}
                    >
                      {opt}
                    </label>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      );
    }

    // Default rendering (gender, price, etc.)
    return (
      <ul className="space-y-2">
        {options.map((opt) => {
          const checked = getArrayParam(search, key).includes(opt);

          return (
            <li key={opt} className="flex items-center gap-2">
              <input
                id={`${key}-${opt}`}
                type="checkbox"
                className="h-4 w-4 accent-dark-900"
                checked={checked}
                onChange={() => onToggle(key, opt)}
              />
              <label htmlFor={`${key}-${opt}`} className="text-body">
                {key === "gender" ? opt[0].toUpperCase() + opt.slice(1) : opt}
              </label>
            </li>
          );
        })}
      </ul>
    );
  };

  /* ------------------------ Render ------------------------ */
  return (
    <div>
      {/* Mobile Header */}
      <div className="mb-4 flex items-center justify-between md:hidden">
        <button
          className="rounded-md border border-light-300 px-3 py-2 text-body-medium"
          onClick={() => setOpen((v) => !v)}
        >
          Filters
        </button>
        <button
          className="text-caption text-dark-700 underline"
          onClick={clearAll}
        >
          Clear all
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="sticky min-w-60 top-20  h-fit rounded-lg border border-light-300 bg-light-100 p-4 hidden md:block">
        {" "}
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-body-medium">Filters</h3>
          <button
            className="text-caption text-dark-700 underline"
            onClick={clearAll}
          >
            Clear all
          </button>
        </div>
        <Group
          title={`Gender ${
            activeCounts.gender ? `(${activeCounts.gender})` : ""
          }`}
          k="gender"
          expanded={expanded.gender}
          onToggle={toggleExpanded}
        >
          {renderCheckboxList("gender", GENDERS)}
        </Group>
        <Group
          title={`Size ${activeCounts.size ? `(${activeCounts.size})` : ""}`}
          k="size"
          expanded={expanded.size}
          onToggle={toggleExpanded}
        >
          {renderCheckboxList("size", SIZES)}
        </Group>
        <Group
          title={`Color ${activeCounts.color ? `(${activeCounts.color})` : ""}`}
          k="color"
          expanded={expanded.color}
          onToggle={toggleExpanded}
        >
          {renderCheckboxList("color", COLORS)}
        </Group>
        <Group
          title={`Price ${activeCounts.price ? `(${activeCounts.price})` : ""}`}
          k="price"
          expanded={expanded.price}
          onToggle={toggleExpanded}
        >
          <ul className="space-y-2">
            {PRICES.map((p) => (
              <li key={p.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-dark-900"
                  checked={getArrayParam(search, "price").includes(p.id)}
                  onChange={() => onToggle("price", p.id)}
                />
                <span className="text-body">{p.label}</span>
              </li>
            ))}
          </ul>
        </Group>
      </aside>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="bg-light-100 p-4 shadow-xl overflow-auto">
            <Group
              title="Gender"
              k="gender"
              expanded={expanded.gender}
              onToggle={toggleExpanded}
            >
              {renderCheckboxList("gender", GENDERS)}
            </Group>

            <Group
              title="Size"
              k="size"
              expanded={expanded.size}
              onToggle={toggleExpanded}
            >
              {renderCheckboxList("size", SIZES)}
            </Group>

            <Group
              title="Color"
              k="color"
              expanded={expanded.color}
              onToggle={toggleExpanded}
            >
              {renderCheckboxList("color", COLORS)}
            </Group>

            <Group
              title="Price"
              k="price"
              expanded={expanded.price}
              onToggle={toggleExpanded}
            >
              <ul className="space-y-2">
                {PRICES.map((p) => (
                  <li key={p.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-dark-900"
                      checked={getArrayParam(search, "price").includes(p.id)}
                      onChange={() => onToggle("price", p.id)}
                    />
                    <span className="text-body">{p.label}</span>
                  </li>
                ))}
              </ul>
            </Group>
          </div>
        </div>
      )}
    </div>
  );
}
