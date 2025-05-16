import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "./scroll-area"
import { Badge } from "./badge"

interface MultiSelectProps<T> {
  items: T[]
  selected: T[]
  onChange: (items: T[]) => void
  placeholder?: string
  itemToString: (item: T) => string
  itemToId: (item: T) => string
}

export function MultiSelect<T>({
  items,
  selected,
  onChange,
  placeholder = "Seleccionar items...",
  itemToString,
  itemToId,
}: MultiSelectProps<T>) {
  const handleSelect = (item: T) => {
    const isSelected = selected.some(
      (selectedItem) => itemToId(selectedItem) === itemToId(item)
    )
    
    if (isSelected) {
      onChange(selected.filter((selectedItem) => itemToId(selectedItem) !== itemToId(item)))
    } else {
      onChange([...selected, item])
    }
  }

  return (
    <div className="relative w-full">
      <div className="flex min-h-[36px] w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
        <div className="flex flex-wrap gap-1">
          {selected.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}
          {selected.map((item) => (
            <Badge variant="secondary" key={itemToId(item)}>
              {itemToString(item)}
            </Badge>
          ))}
        </div>
      </div>
      <ScrollArea className="h-[200px] w-full rounded-md border border-input bg-background mt-1">
        <div className="p-2 space-y-1">
          {items.map((item) => {
            const isSelected = selected.some(
              (selectedItem) => itemToId(selectedItem) === itemToId(item)
            )
            return (
              <Button
                key={itemToId(item)}
                type="button"
                variant="ghost"
                onClick={() => handleSelect(item)}
                className={cn(
                  "w-full justify-start gap-2 font-normal",
                  isSelected && "bg-accent text-accent-foreground"
                )}
              >
                <Check
                  className={cn(
                    "h-4 w-4 flex-shrink-0",
                    isSelected ? "opacity-100" : "opacity-0"
                  )}
                />
                {itemToString(item)}
              </Button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
