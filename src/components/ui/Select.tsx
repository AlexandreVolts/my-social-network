import { motion } from "framer-motion";
import {
  MouseEvent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { TextInput } from "./TextInput";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { Overlay } from "./Overlay";

interface SelectOption extends SelectOptionProps {
  id: string;
}

interface SelectContextProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  onUpdate: (option: SelectOption) => void;
}

const SelectContext = createContext<SelectContextProps>({
  options: [],
  value: "",
  onChange: () => {},
  onUpdate: () => {},
});

interface SelectProps {
  children: ReactNode;
  label: string;
  placeholder?: string;
  value: string;
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

interface SelectOptionProps {
  value: string;
  label?: string;
  children: ReactNode;
}

function Select(props: SelectProps) {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === props.value);
  const cursor = props.disabled ? "cursor-default" : "cursor-pointer";
  const position = isOpened ? "relative z-10" : "";

  const onUpdate = (option: SelectOption) => {
    setOptions((options) =>
      options.filter((elem) => elem.id !== option.id).concat([option])
    );
  };

  const onParentClick = (e: MouseEvent) => {
    //@ts-ignore
    if (e.target.tagName === "LABEL") {
      return;
    }
    if (!props.disabled) {
      setIsOpened(!isOpened);
    }
  };

  return (
    <SelectContext.Provider
      value={{
        options,
        value: props.value,
        onChange: props.onChange,
        onUpdate,
      }}
    >
      <motion.div ref={rootRef} onClick={onParentClick} className={`${position} ${cursor} flex grow`}>
        <TextInput
          value={""}
          label={props.label}
          placeholder={props.placeholder ?? ""}
          error={props.error}
          disabled={props.disabled}
          onChange={() => {}}
          readOnly
          type="button"
          withIcon={selected?.children}
          withRightIcon={!isOpened ? <IconChevronDown /> : <IconChevronUp />}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpened ? 1 : 0, scale: isOpened ? 1 : 0 }}
          transition={{
            opacity: { delay: isOpened ? 0.2 : 0 },
            scale: { type: "tween", delay: isOpened ? 0 : 0.2 },
          }}
          className="absolute max-h-64 overflow-y-scroll"
          style={{ width: rootRef.current?.clientWidth }}
        >
          {props.children}
        </motion.div>
        <select id={id} className="hidden">
          {options.map((option) => {
            return (
              <option key={option.id} value={option.value}>
                {option.value}
              </option>
            );
          })}
        </select>
      </motion.div>
      <Overlay opened={isOpened} onClick={() => setIsOpened(false)} />
    </SelectContext.Provider>
  );
}

function SelectOption(props: SelectOptionProps) {
  const context = useContext(SelectContext);
  const id = useId();

  useEffect(() => {
    context.onUpdate({ ...props, id });
  }, [props, id]);

  return (
    <div
      onClick={() => context.onChange(props.value)}
      className="p-2 bg-white cursor-pointer hover:bg-gray-200"
    >
      {props.children}
    </div>
  );
}

Select.Option = SelectOption;

export { Select };
