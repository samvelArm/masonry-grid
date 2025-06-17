import { Route, Routes } from 'react-router';
import Grid from './pages/Grid';
import DetailedView from './pages/DetailedView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Grid />} />
      <Route path="/:id" element={<DetailedView />} />
    </Routes>
  );
}

export default App;
