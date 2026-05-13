"use client";

import { useId, useState } from "react";

import { DesignSystemCtaButtons } from "@/components/design-system-cta-buttons";
import { DesignSystemHeaderFooter } from "@/components/design-system-header-footer";
import { DesignSystemInput } from "@/components/design-system-input";
import { DesignSystemColors } from "@/components/design-system-colors";
import { DesignSystemSizing } from "@/components/design-system-sizing";
import { DesignSystemTypography } from "@/components/design-system-typography";

type TabId = "colors" | "sizing" | "typography" | "components";

type ComponentSubtabId = "cta" | "input" | "header-footer";

const TABS: { id: TabId; label: string }[] = [
  { id: "colors", label: "Colors" },
  { id: "sizing", label: "Sizing" },
  { id: "typography", label: "Typography" },
  { id: "components", label: "Components" },
];

const COMPONENT_SUBTABS: { id: ComponentSubtabId; label: string }[] = [
  { id: "cta", label: "CTA" },
  { id: "input", label: "Input" },
  { id: "header-footer", label: "Header and Footer" },
];

type ComponentsPanelProps = {
  baseId: string;
  activeSubtab: ComponentSubtabId;
  onSubtabChange: (id: ComponentSubtabId) => void;
};

function ComponentsPanel({
  baseId,
  activeSubtab,
  onSubtabChange,
}: ComponentsPanelProps) {
  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Component categories"
        className="flex gap-1 border-b border-zinc-200"
      >
        {COMPONENT_SUBTABS.map((sub) => {
          const selected = activeSubtab === sub.id;
          const subTabId = `${baseId}-components-${sub.id}-tab`;
          const subPanelId = `${baseId}-components-${sub.id}-panel`;
          return (
            <button
              key={sub.id}
              id={subTabId}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={subPanelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => onSubtabChange(sub.id)}
              className={
                selected
                  ? "-mb-px border-b-2 border-zinc-900 px-4 py-3 text-sm font-medium text-zinc-900"
                  : "border-b-2 border-transparent px-4 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-800"
              }
            >
              {sub.label}
            </button>
          );
        })}
      </div>

      {COMPONENT_SUBTABS.map((sub) => {
        const selected = activeSubtab === sub.id;
        const subTabId = `${baseId}-components-${sub.id}-tab`;
        const subPanelId = `${baseId}-components-${sub.id}-panel`;
        return (
          <div
            key={sub.id}
            id={subPanelId}
            role="tabpanel"
            aria-labelledby={subTabId}
            hidden={!selected}
            className={selected ? "pt-8" : "hidden"}
          >
            {sub.id === "cta" ? (
              <DesignSystemCtaButtons />
            ) : sub.id === "input" ? (
              <DesignSystemInput />
            ) : sub.id === "header-footer" ? (
              <DesignSystemHeaderFooter />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function DesignSystemTabs() {
  const [active, setActive] = useState<TabId>("colors");
  const [activeComponentSubtab, setActiveComponentSubtab] =
    useState<ComponentSubtabId>("cta");
  const baseId = useId();

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Design system sections"
        className="flex gap-1 border-b border-zinc-200"
      >
        {TABS.map((tab) => {
          const selected = active === tab.id;
          const tabId = `${baseId}-${tab.id}-tab`;
          const panelId = `${baseId}-${tab.id}-panel`;
          return (
            <button
              key={tab.id}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className={
                selected
                  ? "-mb-px border-b-2 border-zinc-900 px-4 py-3 text-sm font-medium text-zinc-900"
                  : "border-b-2 border-transparent px-4 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-800"
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {TABS.map((tab) => {
        const selected = active === tab.id;
        const tabId = `${baseId}-${tab.id}-tab`;
        const panelId = `${baseId}-${tab.id}-panel`;
        return (
          <div
            key={tab.id}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            hidden={!selected}
            className={selected ? "pt-8" : "hidden"}
          >
            {tab.id === "colors" ? (
              <DesignSystemColors />
            ) : tab.id === "sizing" ? (
              <DesignSystemSizing />
            ) : tab.id === "typography" ? (
              <DesignSystemTypography />
            ) : tab.id === "components" ? (
              <ComponentsPanel
                baseId={baseId}
                activeSubtab={activeComponentSubtab}
                onSubtabChange={setActiveComponentSubtab}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
