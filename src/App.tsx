import { Route, Routes } from 'react-router';
import { Suspense, lazy } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';

const Grid = lazy(() => import('./pages/Grid'));
const DetailedView = lazy(() => import('./pages/DetailedView'));

function App() {
  return (
    <Wrapper>
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Grid />} />
          <Route path="/:id" element={<DetailedView />} />
        </Routes>
      </Suspense>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  text-align: center;
  min-height: 100vh;
  background-color: #282c34;
`;
