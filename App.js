import React from 'react';
import { Provider } from 'react-redux';
import { useAssets } from 'expo-asset';

import Navigator from './src/navigation';
import store from './src/redux/store';
import images from './src/images';

export default function App() {
  const [assets] = useAssets(Object.values(images));

  if (!assets) return null;

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
