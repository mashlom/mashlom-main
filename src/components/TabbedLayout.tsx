import { FC, useState, useMemo } from 'react';
import AppLayout, { NavigationItem } from './AppLayout';

export interface FooterItemRenderProps {
  item: NavigationItem;
  isActive: boolean;
  onClick: () => void;
}

interface TabbedLayoutProps {
  items: NavigationItem[];
  defaultTabId?: string;
  onTabChange?: (tabId: string | undefined) => void;
  className?: string;
}

export const TabbedLayout: FC<TabbedLayoutProps> = ({
  items,
  defaultTabId = items[0]?.id,
  onTabChange,
  className,
}) => {
  const [currentTabId, setCurrentTabId] = useState<string | undefined>(
    defaultTabId
  );

  const handleTabChange = (newTabId: string) => {
    const nextTabId = newTabId === currentTabId ? undefined : newTabId;
    setCurrentTabId(nextTabId);
    onTabChange?.(nextTabId);
  };

  const CurrentComponent = useMemo(() => {
    const item = items.find((item) => item.id === currentTabId) ?? items[0];
    return item.component;
  }, [currentTabId, items]);

  return (
    <AppLayout>
      <div className={className}>
        <CurrentComponent />
      </div>
      <AppLayout.Footer>
        {items.map((item) => (
          <AppLayout.FooterItem
            key={item.id}
            icon={item.icon}
            onClick={() => handleTabChange(item.id)}
            isActive={currentTabId === item.id}
            label={item.label}
          />
        ))}
      </AppLayout.Footer>
    </AppLayout>
  );
};
