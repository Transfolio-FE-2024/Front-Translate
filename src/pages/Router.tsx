import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import Home from './Home/Home';

export default function Router() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Layout>
  );
}
