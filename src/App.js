// routes
import { Router } from './Router';
// theme
import ThemeProvider from './theme';

function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
