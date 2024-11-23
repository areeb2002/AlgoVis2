/**
 *   Copyright (c) 2021 Wasim Akram Biswas
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
//Components
import NavBar from "./pages/components/NavBar";
//Pages
import Home from "./pages/Home"
import Dijkstra from "./pages/Dijkstra";
import BubbleSort from "./pages/BubbleSort";
import QuickSort from "./pages/QuickSort";
import SinglyLinkList  from "./pages/SinglyLinkLIst";
import Dfs from "./pages/Dfs";

import { SnackbarProvider } from "notistack";
import CodeFeedback from "./pages/CodeFeedback";

function App() {
	return (
		<SnackbarProvider>
			<div className="App">
				<NavBar />
				<Switch>
					<Route path="/bubblesort" exact component={BubbleSort} />
					<Route path="/dijkstra" exact component={Dijkstra} />
					<Route path="/quicksort" exact component={QuickSort} />
					<Route path="/singlylinklist" exact component={SinglyLinkList} />
					<Route path="/dfs" exact component={Dfs} />
					<Route path="/CodeFeedback" exact component={CodeFeedback} />
					{/* <Route path="" exact component={Dfs} /> */}
					<Route path="/" exact component={Home} />
					
				</Switch>
			</div>
		</SnackbarProvider>
	);
}

export default App;