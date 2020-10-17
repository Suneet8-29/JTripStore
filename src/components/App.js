import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import {AnimatedSwitch} from 'react-router-transition'

import history from '../history'
import Landing from './Landing'
import Pictures from './Pictures'
import Videos from './Videos'
import _360Images from './_360Images'
import About from './About'
 
function App() {

    return (
        <div>
            <Router history={history}>
                <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                >
                    <Switch>
                        <Route path='/' exact component = {Landing} />
                        <Route path='/pictures' exact component = {Pictures} />
                        <Route path='/videos' exact component = {Videos} />
                        <Route path='/360images' exact component = {_360Images} />
                        <Route path='/about' exact component = {About} />
                    </Switch>
                </AnimatedSwitch>
            </Router>
        </div>
    )
}

export default App
