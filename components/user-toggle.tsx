import { UserCircleIcon } from "@heroicons/react/16/solid";
import { Button } from "@/components/ui/button";

export function UserToggle() {
  return (
    <Button
      className="flex group items-center bg-transparent border-0 shadow-none hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent p-0 w-14 h-9"
      variant="default"
    >
      <UserCircleIcon className="h-8 w-8 fill-gray-800 dark:fill-gray-100 group-hover:fill-[#3c9daeff]" />
    </Button>
  );
}