export interface MenuItem {
  path: string;
  title: string;
}

export interface DesktopNavProps {
  menuItems: MenuItem[];
  onNavigate: (path: string) => void;
}

export interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  menuItems: MenuItem[];
}