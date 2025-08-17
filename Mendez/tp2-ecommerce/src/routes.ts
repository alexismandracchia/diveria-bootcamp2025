type PageModule = {
  default: React.ComponentType<Record<string, unknown>>;
  loader?: () => unknown;
  action?: () => unknown;
};

const pages = import.meta.glob<PageModule>('./pages/**/*.{jsx,tsx}', { eager: true });

interface Route {
  path: string;
  Element: React.ComponentType<Record<string, unknown>>;
  loader?: () => unknown;
  action?: () => unknown;
  showInNav: boolean;
}

const routes: Route[] = [];

for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.(jsx|tsx)$/)?.[1];
  if (!fileName) continue;

  const normalizedPathName = fileName.includes('$')
    ? fileName.replace('$', ':')
    : fileName.replace(/\/index$/, '');

  const page = pages[path]; 

  const isNavigable = !fileName.includes('$') && fileName !== 'NotFound';

  routes.push({
    path: fileName === 'Home' ? '/' : `/${normalizedPathName.toLowerCase()}`,
    Element: page.default,
    loader: page.loader,
    action: page.action,
    showInNav: isNavigable,
  });
}

export { routes };
