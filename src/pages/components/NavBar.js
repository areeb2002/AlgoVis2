import React from "react";
import Logo from "./Logo";
import "../../css/NavBar.css";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
	// console.log("path of ->" + logo);
	return (
		<nav style={{ zIndex: "99" }}>
			<Logo heightInPixel={47} style={{ cursor: "pointer" }} to="/" />

			<div className="Link-Container">
				<Link to="/bubblesort">Bubble Sort</Link>

				<Link to="/quicksort">Quick Sort</Link>

				<NavLink to="/singlylinklist">Singly Linked List</NavLink>

				<NavLink to="/dfs">DFS</NavLink>

				<Link to="/dijkstra">Dijkstra Algo</Link>
				<NavLink to="/codefeedback">Code Feedback</NavLink>
				
			</div>
		</nav>
	);
}

export default NavBar;
