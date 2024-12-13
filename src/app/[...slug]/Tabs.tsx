"use client";

import { useState } from "react";

type TabProps = {
  initialTabs: string[];
};

export function DynamicTabs({ initialTabs }: TabProps) {
  const [tabs, setTabs] = useState<string[]>(initialTabs);
  const [selectedTab, setSelectedTab] = useState(initialTabs[0]);

  const handleAddTab = () => {
    const newTab = `Tab ${tabs.length + 1}`;
    setTabs([...tabs, newTab]);
    setSelectedTab(newTab);
  };

  const handleRemoveTab = (tabToRemove: string) => {
    if (tabs.length === 1) return; // Prevent removal if there's only one tab

    const filteredTabs = tabs.filter((tab) => tab !== tabToRemove);
    setTabs(filteredTabs);
    if (tabToRemove === selectedTab && filteredTabs.length > 0) {
      setSelectedTab(filteredTabs[0]);
    } else if (filteredTabs.length === 0) {
      setSelectedTab("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center border-b">
        {tabs.map((tab) => (
          <div key={tab} className="flex items-center">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                tab === selectedTab
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
            {tabs.length > 1 && (
              <button
                className="ml-1 text-gray-400 hover:text-red-500"
                onClick={() => handleRemoveTab(tab)}
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          className="ml-4 px-2 py-1 text-sm font-medium text-blue-500 border border-blue-500 rounded hover:bg-blue-100"
          onClick={handleAddTab}
        >
          +
        </button>
      </div>
      <div className="p-4 border rounded">
        {selectedTab ? (
          <p>Content for <b>{selectedTab}</b></p>
        ) : (
          <p className="text-gray-500">No tabs available. Add a new tab!</p>
        )}
      </div>
    </div>
  );
}
