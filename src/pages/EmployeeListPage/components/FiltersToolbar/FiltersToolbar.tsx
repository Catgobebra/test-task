import { observer } from 'mobx-react-lite';
import {FilterStore} from '../../../../modules/Select';
import Badge from '../../../../ui/Badge';
import Button from '../../../../ui/Button';

interface FiltersToolbarProps {
  onApply: () => void;
}

const FiltersToolbar = observer(({ onApply }: FiltersToolbarProps) => {
  return (
    <div className="mt-[28px] py-2 md:py-0 bg-[#f2f2f2] dark:bg-[#3e3e3e] min-h-[138px] md:min-h-[71px] flex items-center">
      <div className="container h-full mx-auto px-9 flex flex-col gap-1 md:gap-0 md:flex-row items-center justify-between flex-wrap">
        <div className="flex flex-wrap gap-[16px] md:gap-[40px] items-center">
          <p className="text-[14px] md:text-[20px]">Выбранные фильтры:</p>
          <div className="flex gap-[16px] md:gap-[24px] flex-wrap">
            {FilterStore.AllFilter.map((element, index) => (
              <Badge
                key={index}
                onDelete={() => FilterStore.removeFilter(element)}
                badgeText={element.label}
              />
            ))}
          </div>
        </div>

        <Button buttonText="Найти" onFunc={onApply} />
      </div>
    </div>
  );
});

export default FiltersToolbar;