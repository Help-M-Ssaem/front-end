import { Global } from '@emotion/react';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <div>
      <Global styles={GlobalStyle} />
      test
    </div>
  );
}

export default App;
