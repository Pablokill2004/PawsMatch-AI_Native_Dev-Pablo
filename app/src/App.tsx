import * as React from 'react';
import { mount, unmount } from 'svelte';
import AppSvelte from './App.svelte';

export function App() {
  const hostRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const target = hostRef.current;
    if (!target) return;

    const app = mount(AppSvelte, { target });

    return () => {
      void unmount(app);
    };
  }, []);

  return React.createElement('div', { ref: hostRef });
}

export default App;
export const Home = App;
export const Page = App;
