export interface Menu {
  title: string;
  url: string;
  icon?: string;
}

/**
 * Used on Sidebar
 */
export const MenuApp: Menu[] = [
  {
    title: 'Dashboard',
    url: '/',
    icon: 'bi-columns-gap'
  },
  {
    title: 'Posts',
    url: '/posts',
    icon: 'bi-file-text'
  },
  {
    title: 'Albums',
    url: '/albums',
    icon: 'bi-journal-album'
  },
  {
    title: 'Photos',
    url: '/albums',
    icon: 'bi-images'
  },
  {
    title: 'Users',
    url: '/users',
    icon: 'bi-people'
  }
];
