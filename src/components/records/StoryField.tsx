'use client';

export const detailLabelClassName =
  'type-button lg:w-1/4 px-3 py-2 bg-main text-white rounded-sm font-medium flex items-center whitespace-normal break-words';

interface StoryFieldProps {
  label: React.ReactNode;
  value: string | null;
  editValue: string;
  isEditing: boolean;
  onChange: (v: string) => void;
  emptyValue: string;
}

export function StoryField({ label, value, editValue, isEditing, onChange, emptyValue }: StoryFieldProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-0">
      <div className={detailLabelClassName}>{label}</div>
      {isEditing ? (
        <div className="lg:w-3/4 px-3">
          <textarea
            className="type-body-sm w-full py-2 px-2 border-2 border-main-tint02 rounded-sm min-h-[80px] resize-y focus:outline-none focus:border-main"
            value={editValue}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      ) : (
        <div className="type-body-sm lg:w-3/4 px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-sm min-h-[40px] flex items-center">
          {value || emptyValue}
        </div>
      )}
    </div>
  );
}
