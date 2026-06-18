import Navbar from './components/Navbar';
import Home from './pages/Home';
import Result from './pages/Result';
import Generator from './pages/Generator';
import SoftBackdrop from './components/SoftBackdrop';
import Footer from './components/Footer';
import LenisScroll from './components/lenis';
import { Routes, Route } from 'react-router-dom';
import MyGenerations from './pages/MyGenerations';
import Community from './pages/Community';
import { Plane } from 'lucide-react';
import Plans from './pages/Plans';
import Loading from './pages/Loading';

function App() {
	return (
		<>
			<SoftBackdrop />
			<LenisScroll />
			<Navbar />
			<Routes>
				
				<Route path='/' element={<Home />}/>
				<Route path='/generate' element={<Generator />}/>
				<Route path='/result/:projectID' element={<Result />}/>
				<Route path='/my-generations' element={<MyGenerations />}/>
				<Route path='/community' element={<Community />}/>
				<Route path='/plans' element={<Plans />}/>
				<Route path='/loading' element={<Loading />}/>






			</Routes>
			
 
			<Footer />
		</>
	);
}
export default App;