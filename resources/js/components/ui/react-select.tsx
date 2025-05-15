import clsx from 'clsx'
import { ChevronDown, X } from 'lucide-react'
import Select, {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
  Props
} from 'react-select'

const DropdownIndicator = <T,>(props: DropdownIndicatorProps<T>) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown className="h-4 w-4" />
    </components.DropdownIndicator>
  )
}

const ClearIndicator = <T,>(props: ClearIndicatorProps<T>) => {
  return (
    <components.ClearIndicator {...props}>
      <X className="h-4 w-4" />
    </components.ClearIndicator>
  )
}

const MultiValueRemove = <T,>(props: MultiValueRemoveProps<T>) => {
  return (
    <components.MultiValueRemove {...props}>
      <X className="h-4 w-4" />
    </components.MultiValueRemove>
  )
}
// base: "border rounded-lg bg-white hover:cursor-pointer dark:bg-neutral-800 dark:text-white ",
export const controlStyles = {
  base: 'flex w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 font-normal',
  focus: 'outline-none ring-2 ring-ring ring-offset-2 ',
  nonFocus: ''
}
const placeholderStyles = 'text-neutral-500 dark:text-neutral-400 pl-1 py-0.5'
const selectInputStyles = 'pl-1 py-0.5 dark:border-neutral-700 dark:text-white'
const valueContainerStyles = 'p-1 gap-1 dark:border-neutral-700 dark:text-white'
const singleValueStyles = 'leading-7 ml-1 dark:text-white'
const multiValueStyles =
  'bg-neutral-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white'
const multiValueLabelStyles = 'leading-6 py-0.5 dark:text-white'
const multiValueRemoveStyles =
  'border border-neutral-200 bg-white hover:bg-red-50 hover:text-red-800 text-neutral-500 hover:border-red-300 rounded-md dark:border-neutral-600 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white dark:hover:text-red-800'
const indicatorsContainerStyles = 'p-1 gap-1'
const clearIndicatorStyles =
  'text-neutral-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800 dark:text-white dark:hover:bg-red-800/20 cursor-pointer'
const indicatorSeparatorStyles = 'bg-neutral-300 dark:bg-neutral-600'
const dropdownIndicatorStyles =
  'p-1 hover:bg-neutral-100 text-neutral-500 rounded-md hover:text-black dark:hover:bg-neutral-700 dark:text-white dark:hover:text-black cursor-pointer'
const menuStyles =
  'p-1 mt-2 border border-neutral-200 bg-white rounded-lg dark:bg-neutral-900 dark:border-neutral-700 text-sm scrollbar-visible font-normal'
const groupHeadingStyles =
  'ml-3 mt-2 mb-1 text-neutral-500 text-sm dark:text-white'
const optionStyles = {
  base: 'hover:cursor-pointer px-3 py-2 rounded dark:hover:bg-neutral-700 dark:text-white',
  focus:
    'bg-neutral-100 active:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600',
  selected:
    "after:content-['✔'] after:ml-2 after:text-green-500 text-neutral-500 dark:text-white"
}
const noOptionsMessageStyles =
  'text-neutral-500 p-2 bg-neutral-50 border border-dashed border-neutral-200 rounded-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white'

export default function ReactSelect<T>(props: Props<T>) {
  return (
    <Select
      closeMenuOnSelect={props.isMulti}
      hideSelectedOptions={false}
      unstyled
      styles={{
        input: (base) => ({
          ...base,
          'input:focus': {
            boxShadow: 'none'
          }
        }),
        // On mobile, the label will truncate automatically, so we want to
        // override that behaviour.
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: 'normal',
          overflow: 'visible'
        }),
        control: (base) => ({
          ...base,
          transition: 'none'
        })
      }}
      components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
      classNames={{
        control: ({ isFocused }) =>
          clsx(
            isFocused ? controlStyles.focus : controlStyles.nonFocus,
            controlStyles.base
          ),
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        multiValueRemove: () => multiValueRemoveStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        clearIndicator: () => clearIndicatorStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        groupHeading: () => groupHeadingStyles,
        option: ({ isFocused, isSelected }) =>
          clsx(
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base
          ),
        noOptionsMessage: () => noOptionsMessageStyles
      }}
      {...props}
    />
  )
}