import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Search from "./components/Search";
import User from "./components/User";

export function formatDate(dateString) {
  const date = new Date(dateString);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day.toString().padStart(2, '0')}, ${year}`;
}

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route exact path='/' element={
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Search />
            </motion.div>
          } />
          <Route exact path='/User' element={
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <User />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;