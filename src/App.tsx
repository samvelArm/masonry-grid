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
      <Suspense fallback={<Loader><LoadingSpinner /></Loader>}>
        <Routes>
          <Route path="/" element={<Grid />} />
          <Route path="/:id" element={<DetailedView />} />
        </Routes>
      </Suspense>
    </Wrapper>
  );
}

export default App;

const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  text-align: center;
  min-height: 100vh;
  background-color: #282c34;
`;
