
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import {BrowserRouter, Routes, Route} from "react-router";
import {store} from "../store/store.ts";
import {Provider} from "react-redux";
import ToastProvider from './providers/ToastProvider.tsx';
import FocusPage from './focus/page.tsx';
import NewFocus from './focus/new/page.tsx';
import Memories from './memories/page.tsx';
import FocusEditPage from './focus/edit/page.tsx';
import Goals from './goals/page.tsx';
import Plans from './plans/page.tsx';
import NewPlan from './plans/new/page.tsx';
import PlanEditPage from './plans/edit/page.tsx';
import Gratitudes from './gratitudes/page.tsx';
import LearningEdit from './learnings/edit/page.tsx';
import LearningNew from './learnings/new/page.tsx';
import Learnings from './learnings/page.tsx';
import GratitudeNew from './gratitudes/new/page.tsx';
import GratitudeEdit from './gratitudes/edit/page.tsx';
import Philosophies from './philosophies/page.tsx';
import PhilosophyNew from './philosophies/new/page.tsx';
import PhilosophyEdit from './philosophies/edit/page.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
            <Provider store={store}>
              <ToastProvider />
            <BrowserRouter>
               <Routes>
                   <Route path='/' element={<App />}></Route>
                   <Route path='/focus' element={<FocusPage />}></Route>
                   <Route path='/focus/new' element={<NewFocus />}></Route>
                   <Route path='/focus/edit/:id' element={<FocusEditPage />}></Route>
                   <Route path='/memories' element={<Memories />}></Route>
                   <Route path='/learnings' element={<Learnings />}></Route>
                   <Route path='/learnings/new' element={<LearningNew />}></Route>
                   <Route path='/learnings/edit/:id' element={<LearningEdit />}></Route>
                   <Route path='/philosophies' element={<Philosophies />}></Route>
                   <Route path='/philosophies/new' element={<PhilosophyNew />}></Route>
                   <Route path='/philosophies/edit/:id' element={<PhilosophyEdit />}></Route>
                   <Route path='/gratitudes' element={<Gratitudes />}></Route>
                   <Route path='/gratitudes/new' element={<GratitudeNew />}></Route>
                   <Route path='/gratitudes/edit/:id' element={<GratitudeEdit />}></Route>
                   <Route path='/goals' element={<Goals />}></Route>
                   <Route path='/plans' element={<Plans />}></Route>
                   <Route path='/plans/new' element={<NewPlan />}></Route>
                   <Route path='/plans/edit/:id' element={<PlanEditPage />}></Route>
               </Routes>
           </BrowserRouter>
            </Provider>
  // </StrictMode>,
)
