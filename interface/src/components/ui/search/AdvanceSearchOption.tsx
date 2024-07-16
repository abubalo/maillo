import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptionsInput from "./OptionsInput";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../button/Button";
import DropdownList from "../Dropdown/DropdownList";
import { useAdvanceSearchStore } from "../../../stores/stateStores";

type Props = {
  showAdvanceOptions: boolean;
};

const AdvanceSearchOption: React.FC<Props> = ({ showAdvanceOptions }) => {
  const {
    from,
    to,
    subject,
    hasWords,
    doesntHave,
    size,
    bytOption,
    dateWithin,
    hasAttachment,
    doesntIncludeChats,
    setFrom,
    setTo,
    setSubject,
    setHasWords,
    setDoesntHave,
    setSize,
    setByteOption,
    setDateWithin,
    setHasAttachment,
    setDoesntIncludeChats,
  } = useAdvanceSearchStore();

  const hasAttachmentOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const sizeOptions = [
    { label: "Larger than", value: "larger" },
    { label: "Smaller than", value: "smaller" },
  ];

  const byteOptions = [
    { label: "MB", value: "megabyte" },
    { label: "KB", value: "kilobyte" },
    { label: "B", value: "byte" },
  ];
  const withinDate = [
    { label: "1 day", value: "megabyte" },
    { label: "KB", value: "kilobyte" },
    { label: "B", value: "byte" },
  ];

  return (
    <AnimatePresence>
      {showAdvanceOptions ? (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className="absolute z-50 w-full px-3 py-6 space-y-4 bg-black border rounded-md"
        >
          <OptionsInput name="From" value={from} onChange={setFrom} />
          <OptionsInput name="To" value={to} onChange={setTo} />

          <OptionsInput name="Subject" value={subject} onChange={setSubject} />
          <OptionsInput
            name="Doesn't have"
            value={doesntHave}
            onChange={setDoesntHave}
          />
          <div className="flex items-center w-full gap-3">
            <label className="text-sm text-nowrap">Size</label>
            <div className="flex items-center justify-between w-full gap-3">
              <Dropdown
                label={size || sizeOptions[0].label}
                className="text-nowrap"
              >
                <DropdownList
                  options={sizeOptions}
                  onSelect={(value) => setSize(value || sizeOptions[0].value)}
                />
              </Dropdown>
              <input
                type="text"
                name="sizeValue"
                id="sizeValue"
                className="w-full pt-1 text-sm border-b-2 border-gray-600 focus:outline-none placeholder:text-gray-400 dark:bg-transparent active dark:border-b-white dark:placeholder:text-gray-500 dark:text-gray-300 focus:border-b-blue-500"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
              <Dropdown label={byteOptions[0].label} className="text-nowrap">
                <DropdownList
                  options={byteOptions}
                  onSelect={(value) =>
                    setByteOption(value || byteOptions[0].value)
                  }
                />
              </Dropdown>
            </div>
          </div>
          <div className="flex items-center w-full gap-3">
            <label className="text-sm text-nowrap">Date within</label>
            <div className="flex items-center justify-between w-full gap-3">
              <Dropdown label={withinDate[0].label} className="text-nowrap">
                <DropdownList
                  options={withinDate}
                  onSelect={(value) =>
                    setDateWithin(value || withinDate[0].value)
                  }
                />
              </Dropdown>
              <input
                type="date"
                name="withinDate"
                id="withinDate"
                className="w-full pt-1 text-sm border-b-2 border-gray-600 focus:outline-none placeholder:text-gray-400 dark:bg-transparent active dark:border-b-white dark:placeholder:text-gray-500 dark:text-gray-300 focus:border-b-blue-500"
                value={dateWithin}
                onChange={(e) => setDateWithin(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full gap-8">
            <span className="flex items-center gap-3">
              <input
                type="checkbox"
                name="has-attachment"
                id="has-attachment"
                className="w-4 h-4"
                checked={hasAttachment === "yes"}
                onChange={(e) =>
                  setHasAttachment(e.target.checked ? "yes" : "no")
                }
              />
              <label className="text-sm text-nowrap" htmlFor="has-attachment">
                Has Attachment
              </label>
            </span>
            <span className="flex items-center gap-3">
              <input
                type="checkbox"
                name="doesnt-include-chats"
                id="doesnt-include-chats"
                className="w-4 h-4"
                checked={doesntHave === "yes"}
                onChange={(e) => setDoesntHave(e.target.checked ? "yes" : "no")}
              />
              <label
                className="text-sm text-nowrap"
                htmlFor="doesnt-include-chats"
              >
                Doesn't include chats
              </label>
            </span>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              className="px-4 py-2 font-medium bg-transparent border rounded-lg w-max"
            >
              Create filter
            </Button>
            <Button className="px-4 py-2 font-medium rounded-lg w-max">
              Search
            </Button>
          </div>
        </motion.form>
      ) : null}
    </AnimatePresence>
  );
};

export default AdvanceSearchOption;
