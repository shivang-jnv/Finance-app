"use client";

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreateTableselect from "react-select/creatable";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

 
type Props = {
  onChange: (value?: string) => void;
  onCreate?: (value: string) => void;
  options?: { label: string; value: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
};

export const Select = ({
  value,
  onChange,
  disabled,
  onCreate,
  options = [],
  placeholder
}: Props) => {
  const onSelect = (
    option: SingleValue<{ label: string, value: string }>
  ) => {
    onChange(option?.value)
  };

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <CreateTableselect
      placeholder={placeholder}
      className="text-sm h-10"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#e2e8f0",
          ":hover": {
            borderColor: "#e2e8f0",
          }
        })
      }}
      value={formattedValue}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
      components={{
        MenuList: (props) => (
          <>
            {props.children}
            <div className="p-2 border-t">
              <Button
                type="button"
                variant="ghost"
                className="w-full justify-center font-normal"
                onClick={() => onCreate?.("")}
                disabled={disabled}
                onMouseDown={(e) => e.preventDefault()} // Prevent losing focus
              >
                <Plus className="size-4 mr-2" />
                Create new
              </Button>
            </div>
          </>
        )
      }}
    />
  );
};

