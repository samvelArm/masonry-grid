import { Route, Routes } from 'react-router';
import Grid from './pages/Grid';
import DetailedView from './pages/DetailedView';
import Header from './components/Header';
import styled from 'styled-components';

function App() {
  return (
    <Wrapper>
      <Header />
      <Routes>
        <Route path="/" element={<Grid />} />
        <Route path="/:id" element={<DetailedView />} />
      </Routes>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
`;

export default App;
