import { motion } from "framer-motion";
import { Select } from "./Select";

interface DatePickerProps {
    date: Date;
    label: string;
    disabled?: boolean;
    error?: string;
    nbYears?: number;
    onChange: (newDate: Date) => void;
}

export function DatePicker(props: DatePickerProps) {
    const currentDate = new Date();
    const selectedDate = { day: props.date.getDate(), month: props.date.getMonth(), year: props.date.getFullYear() }
    const error = props.error ? "border-2 border-red-600 p-2" : "";

    const getDayNb = () => {
        return new Date(selectedDate.year, selectedDate.month + 1, 0).getDate();
    }

    const getMonthFromNb = (month: number) => {
        return new Date(selectedDate.year, month).toLocaleString('en-US', { month: "short" })
    }

    return (
        <motion.div>
            <p>{props.label}</p>
            <div className="flex space-x-2" >
                <Select
                    value={selectedDate.day + ""}
                    label=""
                    disabled={props.disabled}
                    error={props.error ? " " : ""}
                    onChange={(newDay) => props.onChange(new Date(`${selectedDate.month}/${newDay}/${selectedDate.year}`))}
                >
                    {Array.from({ length: getDayNb() }).map((_, index) => {
                        return (
                            <Select.Option
                                key={index}
                                value={index + 1 + ""}
                                label={(index + 1 + "").padStart(2, "0")}
                            />
                        )
                    })}
                </Select>
                <Select
                    value={selectedDate.month + ""}
                    label=""
                    disabled={props.disabled}
                    error={props.error ? " " : ""}
                    onChange={(newMonth) => props.onChange(new Date(`${newMonth}/${selectedDate.day}/${selectedDate.year}`))}
                >
                    {Array.from({ length: 12 }).map((_, index) => {
                        return (
                            <Select.Option
                                key={index}
                                value={index + ""}
                                label={getMonthFromNb(index)}
                            />
                        )
                    })}
                </Select>
                <Select
                    value={selectedDate.year + ""}
                    label=""
                    disabled={props.disabled}
                    error={props.error ? " " : ""}
                    onChange={(newYear) => props.onChange(new Date(`${selectedDate.month}/${selectedDate.day}/${newYear}`))}
                >
                    {Array.from({ length: props.nbYears ?? 100 }).map((_, index) => {
                        const year = currentDate.getFullYear() - index + "";
                        return (
                            <Select.Option
                                key={index}
                                value={year}
                                label={year}
                            />
                        )
                    })}
                </Select>
            </div>
            {props.error ? <p className="text-red-600">{props.error}</p> : <></>}
        </motion.div>
    )
}