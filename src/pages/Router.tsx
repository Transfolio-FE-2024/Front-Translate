import { Routes, Route } from 'react-router-dom';
import Complete from './sign-up/pages/complete/Complete';
import Interests from './sign-up/pages/interests/Interests';
import RegForm from './sign-up/pages/reg-from/RegForm';
import Home from './Home/Home';
import Portfolio from './Portfolio/Portfolio';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup/regform' element={<RegForm />} />
      <Route path='/signup/interests' element={<Interests />} />
      <Route path='/signup/complete' element={<Complete />} />
      <Route path='/mypage/portfolio' element={<Portfolio />} />
    </Routes>
  );
}
