import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './pages/Landing';
import CategorySelect from './pages/CategorySelect';
import Quiz from './pages/Quiz';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/categories" element={<CategorySelect />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;